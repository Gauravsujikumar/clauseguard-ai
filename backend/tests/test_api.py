import io
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_health_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "ClauseGuard AI" in data["service"]

@pytest.mark.asyncio
async def test_auth_registration_and_relogin():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # 1. Register new user
        reg_payload = {
            "email": "sarah.connor@clauseguard.ai",
            "password": "SecurePassword123!",
            "full_name": "Sarah Connor",
            "org_name": "Cyberdyne Legal Solutions"
        }
        res_reg = await ac.post("/api/v1/auth/register", json=reg_payload)
        assert res_reg.status_code in [200, 400]
        
        # 2. Re-login with case variation
        login_payload = {
            "email": "SARAH.CONNOR@Clauseguard.ai",
            "password": "SecurePassword123!"
        }
        res_login = await ac.post("/api/v1/auth/login", json=login_payload)
        assert res_login.status_code == 200
        data = res_login.json()
        assert "access_token" in data
        assert data["user"]["email"] == "sarah.connor@clauseguard.ai"
        assert data["user"]["full_name"] == "Sarah Connor"
        assert data["user"]["org_name"] == "Cyberdyne Legal Solutions"
        token = data["access_token"]

        # 3. Fetch authenticated user profile
        headers = {"Authorization": f"Bearer {token}"}
        res_me = await ac.get("/api/v1/auth/me", headers=headers)
        assert res_me.status_code == 200
        me_data = res_me.json()
        assert me_data["email"] == "sarah.connor@clauseguard.ai"
        assert me_data["org_name"] == "Cyberdyne Legal Solutions"

        # 4. Upload a document as this user
        dummy_contract_text = b"MASTER SERVICES AGREEMENT\nBetween Cyberdyne and Skynet.\nTerm: 12 months.\nLiability: Capped at $50,000.\nRenewal: 60 days notice required."
        files = {
            "file": ("Vendor_MSA_Contract.txt", dummy_contract_text, "text/plain")
        }
        data = {
            "document_type": "Vendor MSA",
            "folder": "Procurement",
            "tags": "Vendor, Q4"
        }
        res_upload = await ac.post("/api/v1/documents/upload", headers=headers, files=files, data=data)
        assert res_upload.status_code == 200
        uploaded_doc = res_upload.json()
        assert uploaded_doc["title"] == "Vendor_MSA_Contract"
        doc_id = uploaded_doc["id"]

        # 5. Simulate logging out and RELOGGING in in a fresh session!
        res_relogin = await ac.post("/api/v1/auth/login", json=login_payload)
        assert res_relogin.status_code == 200
        new_token = res_relogin.json()["access_token"]
        new_headers = {"Authorization": f"Bearer {new_token}"}

        # 6. Verify previous document is retrieved
        res_docs = await ac.get("/api/v1/documents", headers=new_headers)
        assert res_docs.status_code == 200
        docs_list = res_docs.json()
        doc_ids = [d["id"] for d in docs_list]
        assert doc_id in doc_ids, "Uploaded document must be visible upon re-login!"

        # 7. Verify full analysis of previous document is intact
        res_analysis = await ac.get(f"/api/v1/analysis/{doc_id}", headers=new_headers)
        assert res_analysis.status_code == 200
        analysis_data = res_analysis.json()
        assert analysis_data["document"]["id"] == doc_id
        assert analysis_data["summary"] is not None

        # 8. Verify user-scoped risks and obligations are retrieved
        res_risks = await ac.get("/api/v1/analysis/risks/all", headers=new_headers)
        assert res_risks.status_code == 200
        risks = res_risks.json()
        assert isinstance(risks, list)

        res_obls = await ac.get("/api/v1/analysis/obligations/all", headers=new_headers)
        assert res_obls.status_code == 200
        obls = res_obls.json()
        assert isinstance(obls, list)

        # 9. Verify dashboard stats reflect the user's saved data
        res_stats = await ac.get("/api/v1/orgs/stats", headers=new_headers)
        assert res_stats.status_code == 200
        stats = res_stats.json()
        assert stats["total_documents"] >= 1
        assert stats["analyzed_documents"] >= 1

        # 10. Verify activity log records previous actions
        res_activity = await ac.get("/api/v1/orgs/activity", headers=new_headers)
        assert res_activity.status_code == 200
        activities = res_activity.json()
        assert len(activities) > 0
        actions = [a["action"] for a in activities]
        assert "DOCUMENT_UPLOADED" in actions
        assert "USER_LOGIN" in actions
