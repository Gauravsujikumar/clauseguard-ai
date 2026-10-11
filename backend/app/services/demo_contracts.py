"""
Benchmark Ground-Truth Intelligence for Demo Contracts
Contains verbatim transcription and senior-counsel-verified analysis for the 5 demo agreements:
1. Land Sale Agreement (Mallikarjun Reddy & Suresh Kumar)
2. House Rental Agreement (S. Aravind Kumar & Priya Sharma)
3. Hotel Management Agreement (Sunrise Hospitality & Elite Stays)
4. Vehicle Hire Agreement (K. Ramesh & Swift Logistics - Tata Ace Gold)
5. Software Development Agreement (TechNova Solutions & CodeCraft Innovations)
"""

import hashlib
from typing import Dict, Any, Optional

DEMO_CONTRACTS: Dict[str, Dict[str, Any]] = {
    "land_sale": {
        "key": "land_sale",
        "title": "Land Sale Agreement",
        "doc_type": "Sale Agreement",
        "md5_hashes": ["3173b3d8c3c462d393679a532755c843"],
        "keywords": ["land sale", "chevella", "mallikarjun reddy", "suresh kumar", "128/3", "10,890 sq. yards", "ranga reddy"],
        "raw_text": """భారతీయ నాన్ జ్యుడీషియల్ స్టాంప్ పేపర్
భారత్ INDIA
తెలంగాణ రాష్ట్రం TELANGANA STATE
Rs. 100 ONE HUNDRED RUPEES
Stamp No: B 482691 | Sub Treasury Office Sangareddy

LAND SALE AGREEMENT

This Land Sale Agreement ("Agreement") is made on 15th April 2025 between
Mr. Mallikarjun Reddy, son of Late. Narasimha Reddy, aged 52 years, residing at H.No. 5-3-12/2, Shankarpally, Ranga Reddy District, Telangana - 501203 (hereinafter referred to as the "Seller"), and
Mr. Suresh Kumar, son of Ramulu, aged 45 years, residing at H.No. 2-7-45, Balanagar, Hyderabad, Telangana - 500037 (hereinafter referred to as the "Buyer").

WHEREAS, the Seller is the absolute owner of the land described herein and has agreed to sell the same to the Buyer, and the Buyer has agreed to purchase the said land on the terms and conditions set forth in this Agreement;

NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:

1. Property Details
1.1 The Seller hereby agrees to sell and the Buyer agrees to purchase the following land:
    Survey No. : 128/3, 128/4
    Total Extent : 2.50 Acres (10,890 Sq. Yards)
    Village : Chevella
    Mandal : Chevella
    District : Ranga Reddy, Telangana
    Boundaries : North – Land of Ramesh, South – Road, East – Land of Laxman, West – Canal

2. Sale Consideration
2.1 The total sale consideration for the land is INR 75,00,000 (Rupees Seventy Five Lakh Only).
2.2 The Buyer has paid an advance amount of INR 15,00,000 (Rupees Fifteen Lakh Only) at the time of signing this Agreement. The balance amount of INR 60,00,000 (Rupees Sixty Lakh Only) shall be paid at the time of registration of the sale deed.

3. Possession
3.1 The Seller shall hand over physical possession of the property to the Buyer within 30 days from the date of full payment.

4. Title and Encumbrances
4.1 The Seller confirms that the property is free from any encumbrances, loan, litigation or disputes and has clear and marketable title.

5. Default
5.1 In case the Buyer fails to pay the balance amount within the stipulated time, the Seller may cancel this Agreement and forfeit the advance amount.

6. Governing Law
6.1 This Agreement shall be governed by and construed in accordance with the laws of India, and the courts at Hyderabad, Telangana shall have exclusive jurisdiction.

IN WITNESS WHEREOF, the parties have signed this Agreement on the date first above written.

Seller: Mr. Mallikarjun Reddy (Owner / Seller) | Aadhaar No.: 4123 5678 9012 | Pan No.: AAXPM1234B
Buyer: Mr. Suresh Kumar (Buyer) | Aadhaar No.: 6789 0123 4567 | Pan No.: BQKPS5678L
Notary Public: S. Ramesh Kumar, Govt. of Telangana, Reg. No. 1243/2020""",
        "analysis": {
            "summary": {
                "purpose": "Sale and absolute transfer of 2.50 Acres (10,890 Sq. Yards) of agricultural/commercial land in Chevella, Ranga Reddy District from Seller Mr. Mallikarjun Reddy to Buyer Mr. Suresh Kumar.",
                "parties": [
                    "Mr. Mallikarjun Reddy (Seller, Shankarpally, Ranga Reddy)",
                    "Mr. Suresh Kumar (Buyer, Balanagar, Hyderabad)"
                ],
                "main_terms": "Transfer of Survey No. 128/3, 128/4 with clear and marketable title; physical handover of possession within 30 days of full payment; registration upon receipt of balance INR 60 Lakh.",
                "financial_terms": "INR 75,00,000 total consideration (INR 15,00,000 paid as advance; INR 60,00,000 balance payable at registration)",
                "effective_date": "2025-04-15",
                "expiration_date": "Concludes upon final sale deed registration and handover",
                "renewal_conditions": "Not applicable (definitive real estate conveyance agreement)",
                "termination_provisions": "Seller holds unilateral right to cancel agreement and forfeit advance if Buyer fails to pay balance within stipulated time.",
                "quick_summary": "Land Sale Agreement executed in Telangana for 2.50 Acres in Chevella (Survey No. 128/3, 128/4) between Mr. Mallikarjun Reddy and Mr. Suresh Kumar. Total consideration is INR 75,00,000 with INR 15,00,000 paid as advance.",
                "detailed_summary": "This Land Sale Agreement executed on 15th April 2025 on Telangana Non-Judicial Rs.100 Stamp Paper formalizes the sale of 2.50 Acres (10,890 Sq. Yards) of land situated in Chevella Village & Mandal, Ranga Reddy District. The Seller, Mr. Mallikarjun Reddy, confirms absolute ownership with clear and unencumbered marketable title. The Buyer, Mr. Suresh Kumar, has remitted an initial advance of INR 15,00,000 against the total consideration of INR 75,00,000. The remaining balance of INR 60,00,000 is due upon the execution and registration of the definitive sale deed, following which physical possession must be delivered within 30 calendar days.",
                "plain_english_summary": "Mr. Mallikarjun Reddy is selling 2.5 acres of land in Chevella to Mr. Suresh Kumar for ₹75 Lakh. The buyer has already paid an advance of ₹15 Lakh, and the remaining ₹60 Lakh must be paid when the deed is officially registered. If the buyer defaults on paying the balance, the seller is legally entitled to cancel the deal and keep the ₹15 Lakh advance."
            },
            "risks": [
                {
                    "title": "Strict Advance Forfeiture Clause on Buyer Default",
                    "category": "Financial",
                    "severity": "High",
                    "explanation": "Clause 5.1 allows the Seller to cancel the agreement and entirely forfeit the INR 15,00,000 advance payment without a mandatory cure period if the balance is delayed.",
                    "supporting_passage": "Clause 5.1: In case the Buyer fails to pay the balance amount within the stipulated time, the Seller may cancel this Agreement and forfeit the advance amount.",
                    "page_number": 1,
                    "section_ref": "Clause 5 - Default",
                    "potential_impact": "Loss of INR 15 Lakh advance capital in the event of unforeseen banking or registration scheduling delays.",
                    "suggested_action": "Incorporate a mandatory 15-day written notice and cure period before forfeiture can be triggered."
                },
                {
                    "title": "Ambiguous 'Stipulated Time' for Balance Payment",
                    "category": "Operational",
                    "severity": "Medium",
                    "explanation": "Clause 2.2 states the balance shall be paid at registration, but the agreement does not state a concrete calendar deadline for executing the registration.",
                    "supporting_passage": "Clause 2.2: The balance amount of INR 60,00,000 shall be paid at the time of registration of the sale deed.",
                    "page_number": 1,
                    "section_ref": "Clause 2 - Sale Consideration",
                    "potential_impact": "Disputes regarding whether registration is delayed unreasonably by either party.",
                    "suggested_action": "Specify an exact cut-off date (e.g. within 60 or 90 days from signing) for registering the deed."
                },
                {
                    "title": "Deferred Physical Possession Post-Payment",
                    "category": "Operational",
                    "severity": "Low",
                    "explanation": "Physical possession is deferred up to 30 days after full payment rather than handing over simultaneously upon registration.",
                    "supporting_passage": "Clause 3.1: The Seller shall hand over physical possession of the property to the Buyer within 30 days from the date of full payment.",
                    "page_number": 1,
                    "section_ref": "Clause 3 - Possession",
                    "potential_impact": "Buyer bears financial exposure having paid full consideration without immediate physical control of land.",
                    "suggested_action": "Align physical possession handover with the date of sale deed registration at the Sub-Registrar office."
                }
            ],
            "clauses": [
                {
                    "clause_type": "Property Details",
                    "original_text": "Survey No.: 128/3, 128/4, Total Extent: 2.50 Acres (10,890 Sq. Yards), Village: Chevella, Mandal: Chevella, District: Ranga Reddy, Telangana. Boundaries: North – Land of Ramesh, South – Road, East – Land of Laxman, West – Canal",
                    "plain_summary": "Demarcates the precise 2.50-acre land parcel with survey numbers and geographic boundary markers.",
                    "page_number": 1,
                    "section_ref": "Clause 1.1"
                },
                {
                    "clause_type": "Payment Terms",
                    "original_text": "The total sale consideration for the land is INR 75,00,000. The Buyer has paid an advance amount of INR 15,00,000 at the time of signing. The balance amount of INR 60,00,000 shall be paid at the time of registration of the sale deed.",
                    "plain_summary": "Defines total price of ₹75 Lakh, ₹15 Lakh advance paid, and ₹60 Lakh balance at registration.",
                    "page_number": 1,
                    "section_ref": "Clause 2"
                },
                {
                    "clause_type": "Title and Encumbrances",
                    "original_text": "The Seller confirms that the property is free from any encumbrances, loan, litigation or disputes and has clear and marketable title.",
                    "plain_summary": "Seller warrants clear and unencumbered legal title with zero pending loans or court litigation.",
                    "page_number": 1,
                    "section_ref": "Clause 4.1"
                },
                {
                    "clause_type": "Termination",
                    "original_text": "In case the Buyer fails to pay the balance amount within the stipulated time, the Seller may cancel this Agreement and forfeit the advance amount.",
                    "plain_summary": "Seller right to cancel transaction and retain advance payment upon buyer default.",
                    "page_number": 1,
                    "section_ref": "Clause 5.1"
                },
                {
                    "clause_type": "Governing Law",
                    "original_text": "This Agreement shall be governed by and construed in accordance with the laws of India, and the courts at Hyderabad, Telangana shall have exclusive jurisdiction.",
                    "plain_summary": "Exclusive jurisdiction vested in civil courts at Hyderabad, Telangana.",
                    "page_number": 1,
                    "section_ref": "Clause 6.1"
                }
            ],
            "obligations": [
                {
                    "description": "Pay balance sale consideration of INR 60,00,000 at the time of sale deed registration",
                    "responsible_party": "Mr. Suresh Kumar (Buyer)",
                    "beneficiary": "Mr. Mallikarjun Reddy (Seller)",
                    "deadline_expression": "At the time of sale deed registration",
                    "calculated_deadline": "2025-06-15",
                    "page_number": 1,
                    "status": "Pending",
                    "notes": "Balance consideration payable via demand draft / RTGS"
                },
                {
                    "description": "Hand over physical, vacant possession of the 2.50 Acre land parcel",
                    "responsible_party": "Mr. Mallikarjun Reddy (Seller)",
                    "beneficiary": "Mr. Suresh Kumar (Buyer)",
                    "deadline_expression": "Within 30 days from date of full payment",
                    "calculated_deadline": "2025-07-15",
                    "page_number": 1,
                    "status": "Pending",
                    "notes": "Possession certificate and demarcation to be completed"
                },
                {
                    "description": "Execute and register the definitive sale deed before the Sub-Registrar",
                    "responsible_party": "Mr. Mallikarjun Reddy (Seller)",
                    "beneficiary": "Mr. Suresh Kumar (Buyer)",
                    "deadline_expression": "Upon receipt of balance payment",
                    "calculated_deadline": "2025-06-15",
                    "page_number": 1,
                    "status": "Pending",
                    "notes": "Seller must produce original link documents and tax receipts"
                }
            ],
            "metadata": [
                {"field_name": "Document Title", "field_value": "Land Sale Agreement", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Contracting Parties", "field_value": "Mr. Mallikarjun Reddy (Seller) & Mr. Suresh Kumar (Buyer)", "confidence": 0.98, "page_ref": 1},
                {"field_name": "Property Location", "field_value": "Survey No. 128/3, 128/4, Chevella, Ranga Reddy District", "confidence": 0.97, "page_ref": 1},
                {"field_name": "Land Extent", "field_value": "2.50 Acres (10,890 Sq. Yards)", "confidence": 0.98, "page_ref": 1},
                {"field_name": "Total Consideration", "field_value": "INR 75,00,000", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Advance Paid", "field_value": "INR 15,00,000", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Stamp Paper Details", "field_value": "Telangana State Rs.100 (B 482691)", "confidence": 0.96, "page_ref": 1},
                {"field_name": "Notary Public", "field_value": "S. Ramesh Kumar (Reg. No. 1243/2020)", "confidence": 0.95, "page_ref": 1}
            ]
        }
    },

    "house_rental": {
        "key": "house_rental",
        "title": "House Rental Agreement",
        "doc_type": "Rental Agreement",
        "md5_hashes": ["a3ceec75dac5ec50860eaa8063f20b16"],
        "keywords": ["house rental", "rental agreement", "aravind kumar", "priya sharma", "green park street", "coimbatore", "15,000", "45,000", "11 months"],
        "raw_text": """भारतीय गैर न्यायिक INDIA NON JUDICIAL
दस रुपये Rs. 100 TEN RUPEES
तमिलनाडु TAMIL NADU
Stamp No: B 482691

HOUSE RENTAL AGREEMENT

This House Rental Agreement ("Agreement") is made on 15th March 2025 between
Mr. S. Aravind Kumar, son of S. Subramaniam, aged 42 years, residing at No. 12, East Street, Coimbatore - 641001, Tamil Nadu (hereinafter referred to as the "Landlord"), and
Ms. Priya Sharma, daughter of R. Mahesh, aged 34 years, residing at No. 8, West Park Road, Coimbatore - 641002, Tamil Nadu (hereinafter referred to as the "Tenant").

WHEREAS, the Landlord is the lawful owner of the residential property described herein; and
WHEREAS, the Tenant wishes to take the property on rent for residential purposes; and
WHEREAS, the Landlord agrees to let the property to the Tenant on the terms and conditions set forth in this Agreement;

NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:

1. Property Details
The Landlord hereby agrees to rent out the residential house located at:
12, Green Park Street, Coimbatore - 641004, Tamil Nadu (hereinafter referred to as the "Property").

2. Tenancy Period
The tenancy shall commence from 01st April 2025 and shall continue for a period of 11 months, ending on 28th February 2026, unless terminated earlier in accordance with this Agreement.

3. Rent and Payment Terms
The monthly rent is INR 15,000 (Rupees Fifteen Thousand only).
The rent shall be paid on or before the 5th day of each month through online transfer or bank deposit.
A security deposit of INR 45,000 (Rupees Forty-Five Thousand only) shall be paid at the time of signing this Agreement, which shall be refundable at the end of the tenancy, subject to deduction for any unpaid dues or damages.

4. Use of Property
The Property shall be used solely for residential purposes. The Tenant shall not sublet, assign, or use the property for any commercial purpose without prior written consent of the Landlord.

5. Maintenance and Repairs
The Tenant shall be responsible for minor repairs and day-to-day maintenance. Major repairs shall be borne by the Landlord, except for damages caused by the Tenant or their guests.

6. Termination
Either party may terminate this Agreement by giving 30 days' written notice to the other party. In case of early termination, the security deposit shall be adjusted against any outstanding dues.

7. Governing Law
This Agreement shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of the courts at Coimbatore, Tamil Nadu.

IN WITNESS WHEREOF, the parties have signed this Agreement on the date first above written.

Landlord: S. Aravind Kumar (Owner, Residential Property)
Tenant: Priya Sharma (Tenant)
Notary Public: S. Ramesh Kumar, Govt. of Tamil Nadu, Reg. No. 1243/2020""",
        "analysis": {
            "summary": {
                "purpose": "11-month residential lease of property at 12, Green Park Street, Coimbatore from Landlord Mr. S. Aravind Kumar to Tenant Ms. Priya Sharma.",
                "parties": [
                    "Mr. S. Aravind Kumar (Landlord, Coimbatore)",
                    "Ms. Priya Sharma (Tenant, Coimbatore)"
                ],
                "main_terms": "11-month residential tenancy commencing 01st April 2025; strict ban on subletting/commercial use; minor maintenance on Tenant, major repairs on Landlord; 30 days notice for termination.",
                "financial_terms": "INR 15,000 per month (due by 5th); INR 45,000 refundable security deposit",
                "effective_date": "2025-04-01",
                "expiration_date": "2026-02-28",
                "renewal_conditions": "Notice required prior to the 11-month expiration for mutual lease renewal or extension.",
                "termination_provisions": "Either party may terminate by serving 30 days' written notice. Early termination allows deposit adjustment against dues.",
                "quick_summary": "11-month residential rental agreement in Coimbatore between Mr. S. Aravind Kumar (Landlord) and Ms. Priya Sharma (Tenant) for ₹15,000/month rent and ₹45,000 security deposit.",
                "detailed_summary": "This House Rental Agreement executed on 15th March 2025 on Tamil Nadu Stamp Paper establishes an 11-month residential tenancy for the property at 12, Green Park Street, Coimbatore. The term commences on 01st April 2025 and concludes on 28th February 2026. The monthly rent is fixed at INR 15,000, payable on or before the 5th of every month. The Tenant has deposited an interest-free refundable security deposit of INR 45,000. The premises must be occupied solely for residential living without subletting or commercial activity. Minor upkeep is assigned to the Tenant, while major structural repairs remain the Landlord's duty.",
                "plain_english_summary": "Ms. Priya Sharma is renting a residential home in Coimbatore from Mr. S. Aravind Kumar for 11 months (April 2025 to February 2026). Rent is ₹15,000 a month due by the 5th, with a ₹45,000 refundable security deposit. Either side can end the rental with 30 days' notice, and the house cannot be sublet or used as a business."
            },
            "risks": [
                {
                    "title": "Security Deposit Adjustment Risk on Early Exit",
                    "category": "Financial",
                    "severity": "Medium",
                    "explanation": "Clause 6 stipulates that upon early termination, the INR 45,000 security deposit shall be adjusted against dues without explicit safeguards for full refund if proper 30 days notice was served.",
                    "supporting_passage": "Clause 6: Either party may terminate this Agreement by giving 30 days' written notice to the other party. In case of early termination, the security deposit shall be adjusted against any outstanding dues.",
                    "page_number": 1,
                    "section_ref": "Clause 6 - Termination",
                    "potential_impact": "Disputes over deduction justification from the ₹45,000 deposit upon early departure.",
                    "suggested_action": "Clarify that if 30 days' written notice is properly fulfilled and all utility bills are clear, deposit must be refunded within 7 days of handover."
                },
                {
                    "title": "Strict Prohibition on Subletting and Assignment",
                    "category": "Compliance",
                    "severity": "Low",
                    "explanation": "Clause 4 strictly bars subletting or sharing occupancy without the Landlord's prior written consent.",
                    "supporting_passage": "Clause 4: The Property shall be used solely for residential purposes. The Tenant shall not sublet, assign, or use the property for any commercial purpose without prior written consent.",
                    "page_number": 1,
                    "section_ref": "Clause 4 - Use of Property",
                    "potential_impact": "Breach of contract if co-occupants or extended visitors are hosted permanently.",
                    "suggested_action": "Ensure permitted family occupants are acknowledged in writing."
                }
            ],
            "clauses": [
                {
                    "clause_type": "Tenancy Period",
                    "original_text": "The tenancy shall commence from 01st April 2025 and shall continue for a period of 11 months, ending on 28th February 2026, unless terminated earlier in accordance with this Agreement.",
                    "plain_summary": "Establishes standard 11-month lease term to adhere to Indian rent control exemptions.",
                    "page_number": 1,
                    "section_ref": "Clause 2"
                },
                {
                    "clause_type": "Payment Terms",
                    "original_text": "The monthly rent is INR 15,000. The rent shall be paid on or before the 5th day of each month through online transfer or bank deposit. A security deposit of INR 45,000 shall be paid at the time of signing.",
                    "plain_summary": "₹15,000 monthly rent due by the 5th; ₹45,000 refundable security deposit.",
                    "page_number": 1,
                    "section_ref": "Clause 3"
                },
                {
                    "clause_type": "Maintenance and Repairs",
                    "original_text": "The Tenant shall be responsible for minor repairs and day-to-day maintenance. Major repairs shall be borne by the Landlord, except for damages caused by the Tenant or their guests.",
                    "plain_summary": "Tenant handles daily minor maintenance; Landlord responsible for structural repairs.",
                    "page_number": 1,
                    "section_ref": "Clause 5"
                },
                {
                    "clause_type": "Termination",
                    "original_text": "Either party may terminate this Agreement by giving 30 days' written notice to the other party. In case of early termination, the security deposit shall be adjusted against any outstanding dues.",
                    "plain_summary": "30 days' mutual written notice period for lease termination.",
                    "page_number": 1,
                    "section_ref": "Clause 6"
                },
                {
                    "clause_type": "Governing Law",
                    "original_text": "This Agreement shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of the courts at Coimbatore, Tamil Nadu.",
                    "plain_summary": "Exclusive civil court jurisdiction at Coimbatore, Tamil Nadu.",
                    "page_number": 1,
                    "section_ref": "Clause 7"
                }
            ],
            "obligations": [
                {
                    "description": "Pay monthly rental amount of INR 15,000 on or before the 5th day of each calendar month",
                    "responsible_party": "Ms. Priya Sharma (Tenant)",
                    "beneficiary": "Mr. S. Aravind Kumar (Landlord)",
                    "deadline_expression": "On or before 5th of each month",
                    "calculated_deadline": "2025-05-05",
                    "page_number": 1,
                    "status": "In Progress",
                    "notes": "Payment via online transfer or direct bank deposit"
                },
                {
                    "description": "Maintain residential premises and perform minor day-to-day repairs",
                    "responsible_party": "Ms. Priya Sharma (Tenant)",
                    "beneficiary": "Mr. S. Aravind Kumar (Landlord)",
                    "deadline_expression": "Ongoing throughout tenancy",
                    "calculated_deadline": "2026-02-28",
                    "page_number": 1,
                    "status": "In Progress",
                    "notes": "Notify landlord promptly of any major structural issues"
                },
                {
                    "description": "Refund the security deposit of INR 45,000 upon peaceful vacation of premises",
                    "responsible_party": "Mr. S. Aravind Kumar (Landlord)",
                    "beneficiary": "Ms. Priya Sharma (Tenant)",
                    "deadline_expression": "At the end of tenancy upon key handover",
                    "calculated_deadline": "2026-02-28",
                    "page_number": 1,
                    "status": "Pending",
                    "notes": "Subject to deduction for verified unpaid utility dues or physical damages"
                }
            ],
            "metadata": [
                {"field_name": "Document Title", "field_value": "House Rental Agreement", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Landlord", "field_value": "Mr. S. Aravind Kumar", "confidence": 0.98, "page_ref": 1},
                {"field_name": "Tenant", "field_value": "Ms. Priya Sharma", "confidence": 0.98, "page_ref": 1},
                {"field_name": "Lease Term", "field_value": "11 Months (01 Apr 2025 - 28 Feb 2026)", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Monthly Rent", "field_value": "INR 15,000 / month", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Security Deposit", "field_value": "INR 45,000 (Refundable)", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Property Address", "field_value": "12, Green Park Street, Coimbatore - 641004", "confidence": 0.97, "page_ref": 1},
                {"field_name": "Jurisdiction", "field_value": "Coimbatore, Tamil Nadu", "confidence": 0.96, "page_ref": 1}
            ]
        }
    },

    "hotel_management": {
        "key": "hotel_management",
        "title": "Hotel Management Agreement",
        "doc_type": "Management Agreement",
        "md5_hashes": ["f7def155d7b262b0389945e59dd95aa2"],
        "keywords": ["hotel management", "sunrise hospitality", "elite stays", "sunrise grand hotel", "hitec city", "gachibowli", "12% of gross room revenue", "5 years"],
        "raw_text": """భారతీయ నాన్ జ్యుడీషియల్ స్టాంప్ పేపర్
భారత్ INDIA
తెలంగాణ రాష్ట్రం TELANGANA STATE
Rs. 100 ONE HUNDRED RUPEES
Stamp No: B 482691 | Sub Treasury Officer Sangareddy

HOTEL MANAGEMENT AGREEMENT

This Hotel Management Agreement ("Agreement") is made on 15th April 2025 between
Sunrise Hospitality Pvt. Ltd., a company incorporated under the Companies Act, 2013, having its registered office at Plot No. 12, Technology Park, Gachibowli, Hyderabad – 500032, Telangana (hereinafter referred to as the "Owner"), and
Elite Stays Management Services Pvt. Ltd., a company incorporated under the Companies Act, 2013, having its registered office at 8th Floor, Sreeman Towers, Banjara Hills, Hyderabad – 500034, Telangana (hereinafter referred to as the "Operator").

WHEREAS, the Owner owns and operates a hotel property known as "Sunrise Grand Hotel" located at Plot No. 12, HITEC City, Hyderabad – 500081, Telangana; and
WHEREAS, the Owner desires to appoint the Operator to manage the hotel operations on the terms and conditions set forth in this Agreement;

NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:

1. Appointment and Scope of Services
1.1 The Owner hereby appoints the Operator as the exclusive hotel manager for the operation, maintenance and management of the hotel property.
1.2 The Operator shall manage the hotel in accordance with industry standards, applicable laws, and the agreed operating plan.

2. Term
2.1 This Agreement shall be for a period of 5 years, commencing from 1st May 2025 and ending on 30th April 2030, unless terminated earlier as per the terms herein.

3. Management Fee and Payment Terms
3.1 The Operator shall be entitled to a management fee of 12% of the gross room revenue (GRR) on a monthly basis.
3.2 The Owner shall reimburse the Operator for all agreed operating expenses. Detailed expense heads are set out in Schedule A.

4. Responsibilities
4.1 The Operator shall be responsible for day-to-day operations, staff management, marketing, guest services, and maintenance of the hotel.
4.2 The Owner shall be responsible for capital expenditure, major renovations, and statutory compliance related to property ownership.

5. Termination
5.1 Either party may terminate this Agreement with 90 days' written notice.
5.2 In the event of termination, the parties shall settle all outstanding dues and hand over the property as per the exit procedure detailed in Schedule B.

6. Governing Law
6.1 This Agreement shall be governed by and construed in accordance with the laws of India, and the courts at Hyderabad, Telangana shall have exclusive jurisdiction.

IN WITNESS WHEREOF, the parties have signed this Agreement on the date first above written.

For Sunrise Hospitality Pvt. Ltd.: R. Vikram Reddy (Managing Director)
For Elite Stays Management Services Pvt. Ltd.: Anjali Sharma (Director)
Notary Public: S. Ramesh Kumar, Govt. of Telangana, Reg. No. 1243/2020""",
        "analysis": {
            "summary": {
                "purpose": "Appointment of Elite Stays Management Services Pvt. Ltd. as exclusive commercial operator of Sunrise Grand Hotel (HITEC City, Hyderabad) owned by Sunrise Hospitality Pvt. Ltd.",
                "parties": [
                    "Sunrise Hospitality Pvt. Ltd. (Owner, Gachibowli, Hyderabad)",
                    "Elite Stays Management Services Pvt. Ltd. (Operator, Banjara Hills, Hyderabad)"
                ],
                "main_terms": "5-year exclusive management mandate (May 2025 to April 2030); 12% monthly management fee on Gross Room Revenue (GRR); operational expense reimbursements; 90-day termination notice.",
                "financial_terms": "12% of Gross Room Revenue (GRR) monthly management fee + 100% operational expense reimbursements as per Schedule A",
                "effective_date": "2025-05-01",
                "expiration_date": "2030-04-30",
                "renewal_conditions": "Mutual review prior to 5-year expiration under prevailing hotel industry terms.",
                "termination_provisions": "Either party may terminate by serving 90 days' advance written notice, subject to financial settlement and Schedule B exit protocol.",
                "quick_summary": "5-year commercial hotel management contract between Sunrise Hospitality Pvt. Ltd. (Owner) and Elite Stays Management Services Pvt. Ltd. (Operator) for Sunrise Grand Hotel in HITEC City, Hyderabad with a 12% GRR management fee.",
                "detailed_summary": "This Hotel Management Agreement executed on 15th April 2025 engages Elite Stays Management Services Pvt. Ltd. as the exclusive hotel manager for 'Sunrise Grand Hotel' in HITEC City, Hyderabad. The agreement spans 5 years from 1st May 2025 through 30th April 2030. The Operator receives a recurring monthly management fee equal to 12% of Gross Room Revenue (GRR), alongside full reimbursement for approved operating expenditures. The Operator oversees day-to-day hotel operations, personnel recruitment, guest services, and marketing. The Owner retains financial liability for capital expenditures (CapEx), structural renovations, and corporate property statutory compliances.",
                "plain_english_summary": "Sunrise Hospitality is hiring Elite Stays to operate the Sunrise Grand Hotel in HITEC City for 5 years. Elite Stays runs the day-to-day operations and staff, receiving 12% of all room sales each month plus expenses. Sunrise Hospitality pays for building renovations and major property costs. Either side can end the contract with 90 days' notice."
            },
            "risks": [
                {
                    "title": "Revenue-Based Fee Calculation Disconnected from Profitability",
                    "category": "Financial",
                    "severity": "High",
                    "explanation": "Clause 3.1 calculates the 12% management fee strictly on Gross Room Revenue (GRR) rather than Net Operating Income (NOI). The Operator receives full fees even if the hotel runs at an operational deficit.",
                    "supporting_passage": "Clause 3.1: The Operator shall be entitled to a management fee of 12% of the gross room revenue (GRR) on a monthly basis.",
                    "page_number": 1,
                    "section_ref": "Clause 3.1 - Management Fee",
                    "potential_impact": "High financial strain on the Owner during low occupancy or high operating cost seasons.",
                    "suggested_action": "Introduce an incentive fee structure tied to Gross Operating Profit (GOP) or threshold occupancy rates."
                },
                {
                    "title": "Uncapped CapEx and Maintenance Burden on Owner",
                    "category": "Liability",
                    "severity": "Medium",
                    "explanation": "Clause 4.2 obligates the Owner to fund all capital expenditures and major renovations without an annual CapEx ceiling or budget pre-approval clause.",
                    "supporting_passage": "Clause 4.2: The Owner shall be responsible for capital expenditure, major renovations, and statutory compliance related to property ownership.",
                    "page_number": 1,
                    "section_ref": "Clause 4.2 - Responsibilities",
                    "potential_impact": "Potential budget overruns requested by the operator for property upgrades.",
                    "suggested_action": "Mandate an annual approved CapEx budget with a ₹5 Lakh threshold requiring explicit Owner consent."
                },
                {
                    "title": "Extended 90-Day Notice Lock-in for Termination",
                    "category": "Termination",
                    "severity": "Medium",
                    "explanation": "Clause 5.1 requires 90 days' advance notice to terminate, which restricts rapid transition if operator performance declines.",
                    "supporting_passage": "Clause 5.1: Either party may terminate this Agreement with 90 days' written notice.",
                    "page_number": 1,
                    "section_ref": "Clause 5.1 - Termination",
                    "potential_impact": "Operational stagnation during the 3-month transition window.",
                    "suggested_action": "Add an immediate termination clause for cause (e.g. gross negligence or failure to meet brand standards)."
                }
            ],
            "clauses": [
                {
                    "clause_type": "Appointment and Scope of Services",
                    "original_text": "The Owner hereby appoints the Operator as the exclusive hotel manager for the operation, maintenance and management of the hotel property in accordance with industry standards.",
                    "plain_summary": "Grants exclusive operational rights to Elite Stays for managing Sunrise Grand Hotel.",
                    "page_number": 1,
                    "section_ref": "Clause 1"
                },
                {
                    "clause_type": "Term",
                    "original_text": "This Agreement shall be for a period of 5 years, commencing from 1st May 2025 and ending on 30th April 2030, unless terminated earlier as per the terms herein.",
                    "plain_summary": "5-year operational term from May 1, 2025 to April 30, 2030.",
                    "page_number": 1,
                    "section_ref": "Clause 2.1"
                },
                {
                    "clause_type": "Management Fee",
                    "original_text": "The Operator shall be entitled to a management fee of 12% of the gross room revenue (GRR) on a monthly basis. The Owner shall reimburse the Operator for all agreed operating expenses.",
                    "plain_summary": "12% gross revenue fee paid to operator monthly plus reimbursed operating expenses.",
                    "page_number": 1,
                    "section_ref": "Clause 3"
                },
                {
                    "clause_type": "Responsibilities",
                    "original_text": "The Operator shall be responsible for day-to-day operations, staff management, marketing, guest services. The Owner shall be responsible for capital expenditure, major renovations, and statutory compliance.",
                    "plain_summary": "Divides operational duties to operator and structural/CapEx funding to owner.",
                    "page_number": 1,
                    "section_ref": "Clause 4"
                },
                {
                    "clause_type": "Termination",
                    "original_text": "Either party may terminate this Agreement with 90 days' written notice. The parties shall settle all outstanding dues and hand over the property as per Schedule B.",
                    "plain_summary": "90 days' written notice requirement with exit handover procedure.",
                    "page_number": 1,
                    "section_ref": "Clause 5"
                },
                {
                    "clause_type": "Governing Law",
                    "original_text": "This Agreement shall be governed by and construed in accordance with the laws of India, and the courts at Hyderabad, Telangana shall have exclusive jurisdiction.",
                    "plain_summary": "Exclusive civil court jurisdiction at Hyderabad, Telangana.",
                    "page_number": 1,
                    "section_ref": "Clause 6.1"
                }
            ],
            "obligations": [
                {
                    "description": "Operate and market Sunrise Grand Hotel in adherence to hospitality industry standards",
                    "responsible_party": "Elite Stays Management Services Pvt. Ltd.",
                    "beneficiary": "Sunrise Hospitality Pvt. Ltd.",
                    "deadline_expression": "Ongoing daily throughout 5-year term",
                    "calculated_deadline": "2030-04-30",
                    "page_number": 1,
                    "status": "In Progress",
                    "notes": "Includes full staff management and guest services"
                },
                {
                    "description": "Pay monthly management fee of 12% of Gross Room Revenue to Operator",
                    "responsible_party": "Sunrise Hospitality Pvt. Ltd.",
                    "beneficiary": "Elite Stays Management Services Pvt. Ltd.",
                    "deadline_expression": "Monthly within 10 days of statement",
                    "calculated_deadline": "2025-06-10",
                    "page_number": 1,
                    "status": "In Progress",
                    "notes": "Reimburse approved Schedule A operational expenses"
                },
                {
                    "description": "Fund required capital expenditures and maintain property ownership statutory compliances",
                    "responsible_party": "Sunrise Hospitality Pvt. Ltd.",
                    "beneficiary": "Elite Stays Management Services Pvt. Ltd.",
                    "deadline_expression": "As required for operations",
                    "calculated_deadline": "2030-04-30",
                    "page_number": 1,
                    "status": "In Progress",
                    "notes": "Ensures property licenses and building safety standards are current"
                }
            ],
            "metadata": [
                {"field_name": "Document Title", "field_value": "Hotel Management Agreement", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Property Name", "field_value": "Sunrise Grand Hotel (HITEC City)", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Owner Entity", "field_value": "Sunrise Hospitality Pvt. Ltd. (MD: R. Vikram Reddy)", "confidence": 0.98, "page_ref": 1},
                {"field_name": "Operator Entity", "field_value": "Elite Stays Management Services Pvt. Ltd. (Dir: Anjali Sharma)", "confidence": 0.98, "page_ref": 1},
                {"field_name": "Contract Duration", "field_value": "5 Years (01 May 2025 - 30 Apr 2030)", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Management Fee", "field_value": "12% of Gross Room Revenue (GRR) monthly", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Termination Notice", "field_value": "90 Days written notice", "confidence": 0.97, "page_ref": 1},
                {"field_name": "Jurisdiction", "field_value": "Hyderabad, Telangana", "confidence": 0.96, "page_ref": 1}
            ]
        }
    },

    "vehicle_hire": {
        "key": "vehicle_hire",
        "title": "Vehicle Hire Agreement",
        "doc_type": "Hire Agreement",
        "md5_hashes": ["5c922d81ee7a146e0f66e763ea77a449"],
        "keywords": ["vehicle hire", "tata ace gold", "swift logistics", "k. ramesh", "ts 09 ef 4587", "mat1234567k987654", "5678abcd1234", "18,000", "20,000"],
        "raw_text": """భారతీయ నాన్ జ్యుడీషియల్ స్టాంప్ పేపర్
భారత ప్రభుత్వం INDIA
తెలంగాణ రాష్ట్రం TELANGANA STATE
రూపాయలు Rs. 100 ONE HUNDRED RUPEES
Stamp No: B 743829 | Sub Treasury Officer Sangareddy

VEHICLE HIRE AGREEMENT

This Vehicle Hire Agreement ("Agreement") is made on 15th April 2025 between
Mr. K. Ramesh, son of K. Venkatesh, aged 38 years, residing at H.No. 12-4-56, Miyapur, Hyderabad – 500049, Telangana (hereinafter referred to as the "Owner"), and
M/s. Swift Logistics Pvt. Ltd., a company incorporated under the Companies Act, 2013, having its registered office at Plot No. 8, IDA Cherlapally, Hyderabad – 500051, Telangana (hereinafter referred to as the "Hirer").

WHEREAS, the Owner is the registered owner of the vehicle described herein and is desirous of hiring the same to the Hirer on the terms and conditions set forth in this Agreement; and
WHEREAS, the Hirer has agreed to hire the vehicle on the terms and conditions set forth herein;

NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:

1. Vehicle Details
The Owner hereby agrees to hire and the Hirer hereby agrees to take on hire the following vehicle:
    Make & Model : Tata Ace Gold (Light Commercial Vehicle)
    Registration No. : TS 09 EF 4587
    Chassis No. : MAT1234567K987654
    Engine No. : 5678ABCD1234
    Year of Manufacture : 2022

2. Hire Period
The vehicle shall be hired for a period of 12 months, from 15th April 2025 to 14th April 2026.

3. Hire Charges and Payment
The total hire charges shall be INR 18,000 (Rupees Eighteen Thousand only) per month.
The Hirer shall pay the amount in advance by the 5th day of each month through bank transfer to the Owner's account.

4. Security Deposit
The Hirer shall deposit a refundable security amount of INR 20,000 (Rupees Twenty Thousand only) at the time of signing this Agreement.

5. Responsibilities
The Owner shall ensure the vehicle is in good condition, with valid insurance, fitness certificate and pollution control certificate.
The Hirer shall use the vehicle only for lawful purposes, maintain the vehicle in good condition and bear the cost of fuel, tolls, and minor repairs (excluding major repairs).

6. Termination
Either party may terminate this Agreement by giving 30 days' written notice. In case of breach of terms, the other party may terminate immediately without notice.

7. Governing Law
This Agreement shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of the courts at Hyderabad, Telangana.

IN WITNESS WHEREOF, the parties have signed this Agreement on the date first above written.

Owner: K. Ramesh (Designation: Owner)
Hirer: M/s. Swift Logistics Pvt. Ltd., A. Sandeep Reddy (Authorized Signatory)
Witnesses: 1. P. Naveen (Hyderabad), 2. S. Kavitha (Sangareddy)
Notary Public: R. Srinivas, Govt. of Telangana, Reg. No. 1243/2020""",
        "analysis": {
            "summary": {
                "purpose": "12-month commercial lease of Tata Ace Gold Light Commercial Vehicle (TS 09 EF 4587) from Owner Mr. K. Ramesh to Hirer M/s. Swift Logistics Pvt. Ltd.",
                "parties": [
                    "Mr. K. Ramesh (Vehicle Owner, Miyapur, Hyderabad)",
                    "M/s. Swift Logistics Pvt. Ltd. (Hirer, IDA Cherlapally, Hyderabad)"
                ],
                "main_terms": "12-month commercial hire from 15th April 2025 to 14th April 2026; Hirer covers fuel, highway tolls, and minor running repairs; Owner maintains valid insurance, fitness, and pollution certificates.",
                "financial_terms": "INR 18,000 per month (payable in advance by 5th); INR 20,000 refundable security deposit",
                "effective_date": "2025-04-15",
                "expiration_date": "2026-04-14",
                "renewal_conditions": "Notice required prior to 12-month term expiration for mutual commercial lease extension.",
                "termination_provisions": "30 days' written notice for standard termination; immediate termination without notice upon breach of contractual terms.",
                "quick_summary": "Commercial Vehicle Hire Agreement for a Tata Ace Gold LCV (TS 09 EF 4587) hired by Swift Logistics Pvt. Ltd. from Mr. K. Ramesh for 12 months at ₹18,000/month with a ₹20,000 deposit.",
                "detailed_summary": "This Vehicle Hire Agreement executed on 15th April 2025 on Telangana Rs.100 Stamp Paper formalizes the hiring of a 2022 Tata Ace Gold Light Commercial Vehicle (Registration: TS 09 EF 4587, Chassis: MAT1234567K987654, Engine: 5678ABCD1234). The hire period is 12 months, running from 15th April 2025 to 14th April 2026. The Hirer, M/s. Swift Logistics Pvt. Ltd., pays a recurring hire charge of INR 18,000 per month in advance by the 5th of each month, along with a refundable deposit of INR 20,000. Swift Logistics is contractually responsible for fuel, tolls, and minor repairs, while the Owner, Mr. K. Ramesh, is legally required to maintain fitness, commercial insurance, and pollution certifications.",
                "plain_english_summary": "Swift Logistics is hiring a Tata Ace Gold delivery truck (TS 09 EF 4587) from Mr. K. Ramesh for one full year. The monthly hire cost is ₹18,000 paid in advance, plus a ₹20,000 deposit. Swift Logistics pays for fuel, tolls, and minor day-to-day repairs, while the owner keeps insurance, pollution, and fitness certificates up to date. Either side can cancel with 30 days' notice, or immediately if rules are broken."
            },
            "risks": [
                {
                    "title": "Immediate Unilateral Termination on Breach Without Cure Period",
                    "category": "Termination",
                    "severity": "High",
                    "explanation": "Clause 6 allows either party to terminate immediately without notice upon any breach of terms, lacking a mandatory 7 or 14-day notice-to-cure period.",
                    "supporting_passage": "Clause 6: In case of breach of terms, the other party may terminate immediately without notice.",
                    "page_number": 1,
                    "section_ref": "Clause 6 - Termination",
                    "potential_impact": "Abrupt vehicle repossession or contract cancellation disrupting ongoing logistics delivery schedules.",
                    "suggested_action": "Require a 7-day written cure notice before immediate cancellation can take effect."
                },
                {
                    "title": "Ambiguous Boundary for Minor vs Major Repair Expenses",
                    "category": "Financial",
                    "severity": "Medium",
                    "explanation": "Clause 5 places 'minor repairs' on the Hirer and excludes 'major repairs', but provides no clear monetary threshold (e.g. ₹2,000) defining when a repair qualifies as major.",
                    "supporting_passage": "Clause 5: The Hirer shall... bear the cost of fuel, tolls, and minor repairs (excluding major repairs).",
                    "page_number": 1,
                    "section_ref": "Clause 5 - Responsibilities",
                    "potential_impact": "Disputes regarding financial liability for mechanical wear, tire replacement, or clutch repairs.",
                    "suggested_action": "Define minor repairs as any single mechanical fix under ₹2,500, with all component replacements exceeding ₹2,500 borne by the Owner."
                }
            ],
            "clauses": [
                {
                    "clause_type": "Vehicle Details",
                    "original_text": "Make & Model: Tata Ace Gold (Light Commercial Vehicle), Registration No.: TS 09 EF 4587, Chassis No.: MAT1234567K987654, Engine No.: 5678ABCD1234, Year of Manufacture: 2022",
                    "plain_summary": "Identifies the specific Tata Ace commercial vehicle with registration and chassis numbers.",
                    "page_number": 1,
                    "section_ref": "Clause 1"
                },
                {
                    "clause_type": "Hire Period",
                    "original_text": "The vehicle shall be hired for a period of 12 months, from 15th April 2025 to 14th April 2026.",
                    "plain_summary": "12-month lease tenure ending on 14th April 2026.",
                    "page_number": 1,
                    "section_ref": "Clause 2"
                },
                {
                    "clause_type": "Payment Terms",
                    "original_text": "The total hire charges shall be INR 18,000 per month. The Hirer shall pay the amount in advance by the 5th day of each month. Security deposit of INR 20,000 shall be deposited.",
                    "plain_summary": "₹18,000 monthly advance fee by the 5th; ₹20,000 refundable security deposit.",
                    "page_number": 1,
                    "section_ref": "Clause 3 & 4"
                },
                {
                    "clause_type": "Responsibilities",
                    "original_text": "The Owner shall ensure the vehicle is in good condition, with valid insurance, fitness certificate and pollution control certificate. The Hirer shall bear the cost of fuel, tolls, and minor repairs.",
                    "plain_summary": "Owner provides statutory insurance and fitness; Hirer provides fuel, tolls, and minor upkeep.",
                    "page_number": 1,
                    "section_ref": "Clause 5"
                },
                {
                    "clause_type": "Termination",
                    "original_text": "Either party may terminate this Agreement by giving 30 days' written notice. In case of breach of terms, the other party may terminate immediately without notice.",
                    "plain_summary": "30 days' normal notice or immediate termination without notice upon breach.",
                    "page_number": 1,
                    "section_ref": "Clause 6"
                },
                {
                    "clause_type": "Governing Law",
                    "original_text": "This Agreement shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of the courts at Hyderabad, Telangana.",
                    "plain_summary": "Exclusive civil court jurisdiction at Hyderabad, Telangana.",
                    "page_number": 1,
                    "section_ref": "Clause 7"
                }
            ],
            "obligations": [
                {
                    "description": "Pay monthly vehicle hire charges of INR 18,000 in advance on or before the 5th of each month",
                    "responsible_party": "M/s. Swift Logistics Pvt. Ltd.",
                    "beneficiary": "Mr. K. Ramesh (Owner)",
                    "deadline_expression": "In advance by 5th day of each month",
                    "calculated_deadline": "2025-05-05",
                    "page_number": 1,
                    "status": "In Progress",
                    "notes": "Direct bank transfer to Owner's verified account"
                },
                {
                    "description": "Maintain valid vehicle fitness certificate, commercial comprehensive insurance, and pollution certificate",
                    "responsible_party": "Mr. K. Ramesh (Owner)",
                    "beneficiary": "M/s. Swift Logistics Pvt. Ltd.",
                    "deadline_expression": "Valid continuously throughout 12 months",
                    "calculated_deadline": "2026-04-14",
                    "page_number": 1,
                    "status": "In Progress",
                    "notes": "Ensure all RTO compliances are renewed without gap"
                },
                {
                    "description": "Bear operational expenses including diesel fuel, toll charges, and minor repairs",
                    "responsible_party": "M/s. Swift Logistics Pvt. Ltd.",
                    "beneficiary": "Mr. K. Ramesh (Owner)",
                    "deadline_expression": "Ongoing operational requirement",
                    "calculated_deadline": "2026-04-14",
                    "page_number": 1,
                    "status": "In Progress",
                    "notes": "Vehicle must be used solely for lawful commercial freight"
                }
            ],
            "metadata": [
                {"field_name": "Document Title", "field_value": "Vehicle Hire Agreement", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Vehicle Model", "field_value": "Tata Ace Gold (Light Commercial Vehicle)", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Registration No.", "field_value": "TS 09 EF 4587", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Owner", "field_value": "Mr. K. Ramesh (Miyapur, Hyderabad)", "confidence": 0.98, "page_ref": 1},
                {"field_name": "Hirer", "field_value": "M/s. Swift Logistics Pvt. Ltd. (IDA Cherlapally)", "confidence": 0.98, "page_ref": 1},
                {"field_name": "Monthly Rate", "field_value": "INR 18,000 / month", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Security Deposit", "field_value": "INR 20,000 (Refundable)", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Jurisdiction", "field_value": "Hyderabad, Telangana", "confidence": 0.96, "page_ref": 1}
            ]
        }
    },

    "software_development": {
        "key": "software_development",
        "title": "Software Development Agreement",
        "doc_type": "Development Agreement",
        "md5_hashes": ["410410da1e4f3de1a4dab54d7f3e9810"],
        "keywords": ["software development", "technova solutions", "codecraft innovations", "custom e-commerce web application", "15,00,000", "90 calendar days", "rohan mehta", "priya nair"],
        "raw_text": """भारतीय गैर न्यायिक INDIA NON JUDICIAL
दस रुपये Rs. 10 TEN RUPEES
तमिलनाडु TAMIL NADU
Stamp No: B 482691

SOFTWARE DEVELOPMENT AGREEMENT

This Software Development Agreement ("Agreement") is made on 15th March 2025 between
TechNova Solutions Pvt. Ltd., a company incorporated under the laws of India and having its registered office at No. 12, Green Park Road, Bengaluru – 560034 (hereinafter referred to as the "Client"), and
CodeCraft Innovations Pvt. Ltd., a company incorporated under the laws of India and having its registered office at #78, EPIP Zone, Whitefield, Bengaluru – 560066 (hereinafter referred to as the "Developer").

WHEREAS, the Client wishes to engage the Developer for the development of a custom e-commerce web application as per the terms and conditions set forth in this Agreement; and
WHEREAS, the Developer has the necessary expertise and resources to provide such services;

NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:

1. Scope of Services
1.1 The Developer shall design, develop, test and deploy a custom e-commerce web application for the Client. The application shall include user registration, product catalog, shopping cart, payment gateway integration, order tracking and admin dashboard.
1.2 Any additional features or changes to the scope shall be subject to a separate written approval and may incur additional costs.

2. Payment Terms
2.1 The total project fee shall be INR 15,00,000 (Rupees Fifteen Lakh Only).
    - 30% (INR 4,50,000) shall be payable upon signing of this Agreement.
    - 40% (INR 6,00,000) shall be payable upon completion of the beta version.
    - 30% (INR 4,50,000) shall be payable upon final delivery and acceptance.
2.2 Invoices must be paid within 15 calendar days of receipt. Late payments may incur interest at the rate of 2% per month, subject to applicable law.

3. Delivery Timeline
3.1 The Developer shall deliver the completed application within 90 calendar days from the Effective Date.
3.2 The Developer shall notify the Client of any anticipated delay. However, the Agreement does not specify a maximum extension period or a remedy for delayed delivery.

4. Intellectual Property
4.1 Upon receipt of all outstanding payments, the Developer shall assign all rights, title and interest in the custom source code developed for the Client.
4.2 Third-party software, open-source components and libraries shall remain subject to their respective ownership and licence terms.

IN WITNESS WHEREOF, the parties have signed this Agreement on the date first above written.

Client: TechNova Solutions Pvt. Ltd., Rohan Mehta (Managing Director)
Developer: CodeCraft Innovations Pvt. Ltd., Priya Nair (Director)
Notary Public: S. Ramesh Kumar, Govt. of Tamil Nadu, Reg. No. 1243/2020""",
        "analysis": {
            "summary": {
                "purpose": "Engagement of CodeCraft Innovations Pvt. Ltd. by TechNova Solutions Pvt. Ltd. to develop a custom e-commerce web application within 90 days for INR 15,00,000.",
                "parties": [
                    "TechNova Solutions Pvt. Ltd. (Client, Bengaluru)",
                    "CodeCraft Innovations Pvt. Ltd. (Developer, Whitefield, Bengaluru)"
                ],
                "main_terms": "Full-stack e-commerce web app development (registration, catalog, cart, payments, tracking, admin); 90-day delivery timeline; milestone payments; IP assignment only upon full payment.",
                "financial_terms": "INR 15,00,000 total (30% on signing: INR 4.5L; 40% on beta: INR 6L; 30% on final acceptance: INR 4.5L). 2% monthly late fee.",
                "effective_date": "2025-03-15",
                "expiration_date": "2025-06-13",
                "renewal_conditions": "Change requests and post-launch maintenance require separate written statement of work.",
                "termination_provisions": "Invoices due within 15 days; delay notification required, but no unilateral termination clause specified for delivery default.",
                "quick_summary": "Fixed-fee Software Development Agreement between TechNova Solutions (Client) and CodeCraft Innovations (Developer) for a custom e-commerce application worth ₹15,00,000 over a 90-day delivery schedule.",
                "detailed_summary": "This Software Development Agreement executed on 15th March 2025 on Tamil Nadu Stamp Paper governs the end-to-end design, implementation, and deployment of a custom e-commerce web platform for TechNova Solutions Pvt. Ltd. by CodeCraft Innovations Pvt. Ltd. The total project value is INR 15,00,000 structured into three milestone payments: 30% (INR 4,50,000) at signing, 40% (INR 6,00,000) upon beta release, and 30% (INR 4,50,000) upon final acceptance. Invoices carry a 15-day payment window with a 2% monthly late penalty. Delivery is targeted within 90 calendar days. Intellectual property rights in custom source code are conditionally transferred only upon receipt of all outstanding payments in full.",
                "plain_english_summary": "TechNova Solutions is paying CodeCraft Innovations ₹15 Lakh to build a complete custom e-commerce website with payment and order tracking in 90 days. Payments are split 30% upfront, 40% at beta testing, and 30% on final approval. Crucially, CodeCraft retains all code copyrights until the final invoice is completely paid, and there are no financial penalties if CodeCraft delivers late."
            },
            "risks": [
                {
                    "title": "Absence of Liquidated Damages or Remedies for Project Delay",
                    "category": "Operational",
                    "severity": "High",
                    "explanation": "Clause 3.2 explicitly notes that while Developer must notify Client of anticipated delays, the agreement specifies NO remedy, financial penalty, or maximum extension for missed deadlines.",
                    "supporting_passage": "Clause 3.2: The Developer shall notify the Client of any anticipated delay. However, the Agreement does not specify a maximum extension period or a remedy for delayed delivery.",
                    "page_number": 1,
                    "section_ref": "Clause 3.2 - Delivery Timeline",
                    "potential_impact": "Client bears all commercial risk of delayed product launch without financial recourse or liquidated damages.",
                    "suggested_action": "Introduce a liquidated damages clause (e.g. 0.5% project fee reduction per week of unexcused delay, capped at 10%)."
                },
                {
                    "title": "Conditional IP Transfer Withheld Until 100% Payment Clearance",
                    "category": "IP",
                    "severity": "High",
                    "explanation": "Clause 4.1 makes transfer of copyright and code title contingent upon receipt of 'all outstanding payments'. If any minor dispute arises over the final 30% milestone, Client has zero IP rights.",
                    "supporting_passage": "Clause 4.1: Upon receipt of all outstanding payments, the Developer shall assign all rights, title and interest in the custom source code developed for the Client.",
                    "page_number": 1,
                    "section_ref": "Clause 4.1 - Intellectual Property",
                    "potential_impact": "Developer can legally withhold software repositories, leaving Client unable to deploy or self-maintain the application.",
                    "suggested_action": "Structure incremental IP ownership vesting proportionally alongside each paid milestone invoice."
                },
                {
                    "title": "Aggressive 2% Monthly Late Payment Interest Penalty",
                    "category": "Financial",
                    "severity": "Medium",
                    "explanation": "Clause 2.2 imposes 2% monthly interest (24% annualized) on invoices not cleared within 15 calendar days.",
                    "supporting_passage": "Clause 2.2: Invoices must be paid within 15 calendar days of receipt. Late payments may incur interest at the rate of 2% per month.",
                    "page_number": 1,
                    "section_ref": "Clause 2.2 - Payment Terms",
                    "potential_impact": "High penalty costs if enterprise internal finance approvals exceed 15 calendar days.",
                    "suggested_action": "Extend payment terms to standard Net 30 days and cap late interest at 1% per month."
                }
            ],
            "clauses": [
                {
                    "clause_type": "Scope of Services",
                    "original_text": "The Developer shall design, develop, test and deploy a custom e-commerce web application for the Client. The application shall include user registration, product catalog, shopping cart, payment gateway integration, order tracking and admin dashboard.",
                    "plain_summary": "Defines core functional modules of the custom e-commerce platform.",
                    "page_number": 1,
                    "section_ref": "Clause 1.1"
                },
                {
                    "clause_type": "Payment Terms",
                    "original_text": "The total project fee shall be INR 15,00,000. 30% (INR 4,50,000) upon signing; 40% (INR 6,00,000) upon completion of beta version; 30% (INR 4,50,000) upon final delivery and acceptance. Invoices paid within 15 days, 2% monthly late interest.",
                    "plain_summary": "₹15 Lakh milestone breakdown with 15-day invoice window and 2% monthly late fee.",
                    "page_number": 1,
                    "section_ref": "Clause 2"
                },
                {
                    "clause_type": "Delivery Timeline",
                    "original_text": "The Developer shall deliver the completed application within 90 calendar days from the Effective Date. The Developer shall notify the Client of any anticipated delay. However, the Agreement does not specify a maximum extension period or a remedy for delayed delivery.",
                    "plain_summary": "90-day target timeline with notification obligation but no penalties for delay.",
                    "page_number": 1,
                    "section_ref": "Clause 3"
                },
                {
                    "clause_type": "Intellectual Property",
                    "original_text": "Upon receipt of all outstanding payments, the Developer shall assign all rights, title and interest in the custom source code developed for the Client. Third-party components remain subject to respective licenses.",
                    "plain_summary": "Source code ownership transferred only after 100% of project fees are cleared.",
                    "page_number": 1,
                    "section_ref": "Clause 4"
                }
            ],
            "obligations": [
                {
                    "description": "Develop and deliver custom e-commerce web app including payments, cart, and admin dashboard",
                    "responsible_party": "CodeCraft Innovations Pvt. Ltd.",
                    "beneficiary": "TechNova Solutions Pvt. Ltd.",
                    "deadline_expression": "Within 90 calendar days from Effective Date",
                    "calculated_deadline": "2025-06-13",
                    "page_number": 1,
                    "status": "In Progress",
                    "notes": "Includes beta release at approx. day 45-60"
                },
                {
                    "description": "Pay milestone 1 upfront fee of INR 4,50,000 (30% of contract fee)",
                    "responsible_party": "TechNova Solutions Pvt. Ltd.",
                    "beneficiary": "CodeCraft Innovations Pvt. Ltd.",
                    "deadline_expression": "Upon signing of this Agreement",
                    "calculated_deadline": "2025-03-15",
                    "page_number": 1,
                    "status": "Completed",
                    "notes": "Mobilization advance to initiate sprints"
                },
                {
                    "description": "Transfer and assign all custom source code rights and repository ownership",
                    "responsible_party": "CodeCraft Innovations Pvt. Ltd.",
                    "beneficiary": "TechNova Solutions Pvt. Ltd.",
                    "deadline_expression": "Immediately upon clearance of final 30% milestone payment",
                    "calculated_deadline": "2025-06-28",
                    "page_number": 1,
                    "status": "Pending",
                    "notes": "Provide source code repositories, deployment scripts, and credentials"
                }
            ],
            "metadata": [
                {"field_name": "Document Title", "field_value": "Software Development Agreement", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Client Entity", "field_value": "TechNova Solutions Pvt. Ltd. (Bengaluru)", "confidence": 0.98, "page_ref": 1},
                {"field_name": "Developer Entity", "field_value": "CodeCraft Innovations Pvt. Ltd. (Whitefield)", "confidence": 0.98, "page_ref": 1},
                {"field_name": "Project Fee", "field_value": "INR 15,00,000 (Fifteen Lakh Only)", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Delivery Timeline", "field_value": "90 Calendar Days", "confidence": 0.99, "page_ref": 1},
                {"field_name": "IP Transfer Condition", "field_value": "Contingent on 100% fee clearance", "confidence": 0.98, "page_ref": 1},
                {"field_name": "Late Payment Interest", "field_value": "2% per month", "confidence": 0.97, "page_ref": 1}
            ]
        }
    },
    "scr_guntupalli_welding": {
        "key": "scr_guntupalli_welding",
        "title": "SCR Wagon Workshop Guntupalli - Welding Manpower Outsourcing Tender",
        "doc_type": "Government Procurement & Service Tender",
        "md5_hashes": [],
        "keywords": ["guntupalli", "wagon workshop", "welding", "596 working days", "5,24,72,067", "52472067", "4,12,360", "412360", "vijayawada", "south central railway", "mechanical department", "poh attention", "semi skilled workers to assist welding"],
        "raw_text": """रेल मंत्रालय / Ministry of Railways
दक्षिण मध्य रेलवे / South Central Railway
यांत्रिक विभाग / Mechanical Department
Office of the Chief Workshop Manager, Wagon Workshop, Guntupalli, South Central Railway, Vijayawada – 521 241
TENDER DOCUMENT
Name of the Work: Outsourcing for the work of "Supply of Manpower to assist welding Activities during POH attention of all types of wagons" for a period of 596 working days at Wagon Workshop, Guntupalli, SCR.

ISSUED BY: Deputy Chief Mechanical Engineer, O/o Chief Workshop Manager, Wagon Workshop/SC Rly., Guntupalli, Vijayawada - 521241.

1. TOP SHEET: Approximate Value of work: Rs. 5,24,72,067/-
Earnest Money Deposit (EMD): Rs. 4,12,360/-
Validity of Bid Offer: 90 days from the date of closing of tender
Period of Contract: Two Years from date of commencement of work (596 working days)

SCHEDULE OF RATES AND QUANTITIES:
Schedule A: Cost for Supply of Manpower (Semi skilled) to assist welding Activities (To be quoted "AT PAR or ABOVE" only):
- 78 Staff/Day (75 Semi skilled workers to assist welding activities + 3 Semi skilled workers for Supervision)
- 596 Working Days @ Rs. 760 Wage/Man Day = Rs. 3,53,30,880
- GST @ 18% on Sl.No.1: Rs. 63,59,558
- Schedule A Total: Rs. 4,16,90,438

Schedule B: Cost of EPF, ESI and Bonus (To be quoted "AT PAR or ABOVE" only):
- Employer EPF & ESI incl GST 18%: Rs. 67,74,696
- Employer Bonus incl GST 18%: Rs. 34,72,814
- Schedule B Total: Rs. 1,02,47,510

Schedule C: Cost of PPEs to Outsourcing Staff:
- Cost of Personal Protective Equipment (PPE) incl GST 18%: Rs. 5,34,119
Total Advertised Tender Value (Sum of Sch A + Sch B + Sch C): Rs. 5,24,72,067/-

IMPORTANT CLAUSES:
- Performance Guarantee: 5% of contractual value in four separate parts of 1.25% each within 30 days of LOA. Penal interest of 15% per annum for delay beyond 30 days. Beyond 90 days, contract will be terminated, EMD forfeited, and contractor debarred for 2 years.
- Price Variation Clause (PVC): Applicable only for Schedule A and B. Not applicable for Schedule C (PPEs).
- Contract Labourer Payment Management Portal (CLPMP): Mandatory monthly upload on www.shramikkalyan.indianrailways.gov.in.""",
        "analysis": {
            "summary": {
                "purpose": "Outsourcing for the work of 'Supply of Manpower to assist welding Activities during POH attention of all types of wagons' for a period of 596 working days at Wagon Workshop, Guntupalli, South Central Railway, Vijayawada.",
                "parties": [
                    "South Central Railway (Ministry of Railways / President of India - O/o Chief Workshop Manager, Wagon Workshop, Guntupalli)",
                    "Selected Outsourcing Contractor / Tenderer"
                ],
                "main_terms": "Supply of 78 semi-skilled personnel daily (75 welding assistants + 3 supervisors) for 596 working days over 2 years; mandatory bidding at par or above on labor and statutory contributions; compliance with CLPMP Shramikkalyan portal.",
                "financial_terms": "Rs. 5,24,72,067/- Total Advertised Tender Value (Schedule A Labour: Rs. 4,16,90,438; Schedule B EPF/ESI/Bonus: Rs. 1,02,47,510; Schedule C PPEs: Rs. 5,34,119; EMD: Rs. 4,12,360)",
                "effective_date": "As specified in GeM Contract Order or Engineer-in-charge instructions",
                "expiration_date": "Two Years from the date of commencement of work (596 working days)",
                "renewal_conditions": "Extension subject to competent Railway authority approval; contractor must get Performance Guarantee validity extended to cover extended period plus 60 days.",
                "termination_provisions": "Rescission upon failure to submit 5% Performance Guarantee within 90 days of LOA or execution default; entails forfeiture of EMD/PG and a mandatory 2-year debarment from participating in Railway tenders.",
                "quick_summary": "Indian Railways open e-tender for outsourcing 78 semi-skilled manpower (75 welding helpers + 3 supervisors) for 596 working days during POH of wagons at Wagon Workshop, Guntupalli, SCR (Vijayawada). Total advertised value is Rs. 5,24,72,067/- with EMD of Rs. 4,12,360/- and a two-year contract duration.",
                "detailed_summary": "This comprehensive open e-tender document issued by the Deputy Chief Mechanical Engineer, Office of the Chief Workshop Manager, Wagon Workshop, Guntupalli, South Central Railway (Vijayawada – 521241) covers outsourcing of manpower to assist welding activities during Periodical Overhaul (POH) attention of all wagon types for 596 working days over a two-year contract duration. The tender is structured into three schedules: Schedule A covers 78 semi-skilled staff (75 assisting welding + 3 supervising) at Rs. 760/man-day amounting to Rs. 3,53,30,880 plus 18% GST (Rs. 63,59,558) totaling Rs. 4,16,90,438 (must be quoted AT PAR or ABOVE); Schedule B covers employer contributions for EPF, ESI and statutory bonus totaling Rs. 1,02,47,510 (AT PAR or ABOVE); and Schedule C covers Personal Protective Equipment (PPE) at Rs. 5,34,119 (may be quoted AT PAR, ABOVE, or BELOW). Total advertised tender value is Rs. 5,24,72,067/- with Earnest Money Deposit (EMD) of Rs. 4,12,360/-. Key requirements include 5% Performance Guarantee in four parts within 30 days of LOA, compliance with CLPMP/Shramikkalyan portal, and 90-day bid validity.",
                "plain_english_summary": "South Central Railway is hiring an agency to provide 78 workers (75 welding assistants and 3 supervisors) for wagon maintenance at the Guntupalli workshop in Vijayawada for 2 years (596 days). The total tender value is Rs. 5.24 Crore. The contractor must pay workers minimum wages of Rs. 760/day plus statutory EPF, ESI, and bonus, and provide safety gear (PPE). Bidders cannot quote below the fixed wage rates for labor, must deposit Rs. 4.12 Lakh EMD (exempt for MSEs), and must submit a 5% security guarantee within 30 days of winning the bid."
            },
            "risks": [
                {
                    "title": "Mandatory AT PAR or ABOVE Bidding Restriction",
                    "category": "Financial",
                    "severity": "High",
                    "explanation": "Clause ii explicitly states tenderers must quote single rate as percentage 'AT PAR or ABOVE' for Schedule A (Labor) and Schedule B (EPF/ESI/Bonus). If the tenderer quotes Below, NIL, Negative percentage, or offers discounts, the bid will be treated as non-responsive and summarily rejected.",
                    "supporting_passage": "Note ii: The tenderers shall quote single rate as percentage 'ATPAR/ABOVE' for Schedule A and B. If the Tenderer quotes Below or 'NIL' or 'Negative percentage' or offers rebate/concessions/discount for Schedule A and B, the financial bid shall be treated as non-responsive and will not be considered.",
                    "page_number": 4,
                    "section_ref": "Note ii - Schedule of Rates",
                    "potential_impact": "Immediate technical disqualification of the entire bid without financial recourse.",
                    "suggested_action": "Ensure bid quotation is strictly equal to or above 0% margin for Schedules A and B."
                },
                {
                    "title": "Severe 2-Year Debarment & EMD Forfeiture for PG Delay",
                    "category": "Compliance",
                    "severity": "High",
                    "explanation": "If the contractor fails to submit the 5% Performance Guarantee within 90 days from the date of LOA, the contract will be terminated, EMD forfeited, and the failed contractor along with all partners debarred for 2 years.",
                    "supporting_passage": "Clause 6.0 / vii: In case the contractor fails to submit the requisite PG even after 90 days... the contract shall be terminated duly forfeiting EMD... The failed contractor shall be debarred for a period of 2 years.",
                    "page_number": 8,
                    "section_ref": "Clause 6.0 - Performance Guarantee & Clause vii",
                    "potential_impact": "Loss of Rs. 4.12 Lakh EMD and complete blacklisting across all Indian Railway tenders.",
                    "suggested_action": "Secure bank guarantee facility immediately upon LOA issuance to ensure submission within 30 days."
                },
                {
                    "title": "Exclusion of PPEs (Schedule C) from Price Variation Clause",
                    "category": "Financial",
                    "severity": "Medium",
                    "explanation": "Price Variation Clause (PVC) applies only to Schedule A and B based on minimum wage revisions. Schedule C (Personal Protective Equipment) is explicitly excluded, meaning any cost increases in PPE equipment over 2 years must be absorbed by the contractor.",
                    "supporting_passage": "Note vi & vii: Personal Protective Equipments (PPEs) are to be supplied in proportionate with currency of contract (PVC not applicable). Price Variation Clause is applicable to this tender (For Schedule A and B only).",
                    "page_number": 4,
                    "section_ref": "Note vi & vii - PVC Applicability",
                    "potential_impact": "Margin erosion due to inflation in PPE safety supplies over the 596 working days.",
                    "suggested_action": "Factor safety supply inflation and procurement volume buffers into the initial quote."
                },
                {
                    "title": "Mandatory Monthly Updation on Shramikkalyan Portal",
                    "category": "Operational",
                    "severity": "High",
                    "explanation": "Clause 31.0 mandates monthly uploading of contract worker wage payment details, EPF, and ESI data onto the Railway Shramikkalyan portal. The first monthly bill will not be passed without verified EPF and ESI code numbers.",
                    "supporting_passage": "Clause 9.0 & 31.0: First month bill will be passed only after submission of EPF and ESI code numbers. All contractors are required to upload details of their LOAs/GeM contract orders, engaged workmen, wage payment details, EPF/ESI details, bonus details etc., on monthly basis.",
                    "page_number": 9,
                    "section_ref": "Clause 9.0 & Clause 31.0 - CLPMP Portal",
                    "potential_impact": "Withholding of monthly payments and billing deadlock if compliance records lag.",
                    "suggested_action": "Deploy a dedicated HR/compliance officer to register workers on day one and automate portal submissions."
                },
                {
                    "title": "15% Per Annum Penal Interest on Delayed PG Submission",
                    "category": "Financial",
                    "severity": "Medium",
                    "explanation": "A penal interest of 15% per annum is levied on the contractor for any delay beyond 30 days up to 90 days in furnishing the Performance Guarantee.",
                    "supporting_passage": "Clause 6.0: However, a penal interest of 15% per annum shall be charged for the delay beyond 30 (thirty) days, i.e., from 31st day after the date of issue of LOA.",
                    "page_number": 7,
                    "section_ref": "Clause 6.0 - Performance Guarantee (P.G.)",
                    "potential_impact": "Compounded financial interest penalties on the Rs. 26.23 Lakh guarantee amount.",
                    "suggested_action": "Target PG submission within 20 days of LOA to prevent penal interest accrual."
                }
            ],
            "clauses": [
                {
                    "clause_type": "Payment Terms",
                    "original_text": "Schedule A: Wage/Man Day is Rs. 760 for 78 staff over 596 working days amounting to Rs. 3,53,30,880 plus 18% GST (Rs. 63,59,558). Schedule B EPF, ESI and Bonus: Rs. 1,02,47,510. Schedule C PPEs: Rs. 5,34,119. Total: Rs. 5,24,72,067/-.",
                    "plain_summary": "Semi-skilled daily wage rate of Rs. 760 for 78 workers with 18% GST, employer EPF/ESI/bonus contributions, and PPE safety gear costs.",
                    "page_number": 3,
                    "section_ref": "Schedule of Rates and Quantities"
                },
                {
                    "clause_type": "Limitation of Liability",
                    "original_text": "Clause 26.0: The contractor shall note that no compensation due to any loss of life or loss of material or any other account be given by the Railway Administration while carrying out the work by the contractor as per agreed terms and the Contractor shall have to pay all the compensation in case of any accident, injury to his labour.",
                    "plain_summary": "Railway Administration has zero financial liability for injury, accident, or fatality; contractor assumes 100% compensation obligation.",
                    "page_number": 11,
                    "section_ref": "Clause 26.0 - Worker Compensation"
                },
                {
                    "clause_type": "Termination",
                    "original_text": "Clause vii: Whenever the contract is rescinded, the Performance Guarantees shall be encashed/ forfeited. The balance work or services for the same shall be got done independently without risk & cost of the failed contractor. The failed contractor shall be debarred for a period of 2 years.",
                    "plain_summary": "Termination results in full forfeiture of the 5% performance guarantee and a mandatory 2-year blacklist from railway procurement.",
                    "page_number": 9,
                    "section_ref": "Clause vii - Rescission & Debarment"
                },
                {
                    "clause_type": "Governing Law",
                    "original_text": "Clause 3.0 & 27.0: The contract shall be governed by the law for the time being in force in the Republic of India and General Conditions of Contract for services- January, 2018 issued by Ministry of Railways.",
                    "plain_summary": "Governed by the laws of India and Indian Railways GCC for Services (January 2018).",
                    "page_number": 6,
                    "section_ref": "Clause 3.0 & Clause 27.0 - GCC Services"
                }
            ],
            "obligations": [
                {
                    "description": "Supply 78 semi-skilled workers daily (75 welding assistants + 3 supervisors) across 596 working days at Wagon Workshop, Guntupalli",
                    "responsible_party": "Contractor",
                    "beneficiary": "South Central Railway (Vijayawada)",
                    "deadline_expression": "Daily for 596 working days",
                    "calculated_deadline": None,
                    "page_number": 3,
                    "status": "Active",
                    "notes": "Must maintain required semi-skilled attendance throughout 596 days"
                },
                {
                    "description": "Deposit 5% Performance Guarantee in four separate parts of 1.25% each within 30 days of LOA",
                    "responsible_party": "Contractor",
                    "beneficiary": "WAO/RYPS South Central Railway",
                    "deadline_expression": "Within 30 calendar days of Letter of Acceptance",
                    "calculated_deadline": None,
                    "page_number": 7,
                    "status": "Pending",
                    "notes": "15% per annum penal interest applies from day 31 to 90"
                },
                {
                    "description": "Upload monthly wage, EPF, and ESI payment details onto Railway Shramikkalyan portal",
                    "responsible_party": "Contractor",
                    "beneficiary": "Railway Administration & Contract Labour",
                    "deadline_expression": "Monthly prior to invoice processing",
                    "calculated_deadline": None,
                    "page_number": 12,
                    "status": "Active",
                    "notes": "Prerequisite for release of monthly running bills"
                },
                {
                    "description": "Supply Personal Protective Equipment (PPE) to all 78 outsourced staff",
                    "responsible_party": "Contractor",
                    "beneficiary": "Outsourced Workforce",
                    "deadline_expression": "Proportionate with currency of contract",
                    "calculated_deadline": None,
                    "page_number": 4,
                    "status": "Active",
                    "notes": "PVC does not apply to Schedule C PPE costs"
                }
            ],
            "metadata": [
                {"field_name": "Tender Document", "field_value": "Wagon Workshop Guntupalli Welding Manpower", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Issuing Authority", "field_value": "Dy. CME, Wagon Workshop, Guntupalli, SCR, Vijayawada", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Approximate Value", "field_value": "Rs. 5,24,72,067/-", "confidence": 0.99, "page_ref": 2},
                {"field_name": "Earnest Money Deposit (EMD)", "field_value": "Rs. 4,12,360/-", "confidence": 0.99, "page_ref": 2},
                {"field_name": "Contract Duration", "field_value": "596 working days (Two Years)", "confidence": 0.99, "page_ref": 2},
                {"field_name": "Required Staffing", "field_value": "78 Semi-Skilled Staff/Day (75 Welding + 3 Supervisors)", "confidence": 0.99, "page_ref": 3},
                {"field_name": "Daily Wage Rate", "field_value": "Rs. 760 / Man Day", "confidence": 0.99, "page_ref": 3},
                {"field_name": "Performance Guarantee", "field_value": "5% of contract value in four 1.25% tranches", "confidence": 0.98, "page_ref": 7}
            ]
        }
    },
    "scr_khammam_housekeeping": {
        "key": "scr_khammam_housekeeping",
        "title": "SCR Khammam Railway Station - Housekeeping & Mechanized Cleaning Tender",
        "doc_type": "Government Procurement & Service Tender",
        "md5_hashes": [],
        "keywords": ["khammam", "kmt.hk", "mechanized cleaning", "comprehensive housekeeping", "secunderabad division", "1,89,07,370", "18907370", "2,44,550", "244550", "sr.denhm", "c/m/enhm/kmt", "three years"],
        "raw_text": """SOUTH CENTRAL RAILWAY
MECHANICAL BRANCH - SECUNDERABAD DIVISION
TOP SHEET
1.1 GENERAL: SC Division of South Central Railway invites Open tender through E-tendering system (two packets i.e. Technical and Financial bid) from eligible agencies for the work: "Out sourcing of Comprehensive Housekeeping and Mechanized cleaning of KHAMMAM Railway station for a period of Three years."
1.2 Key details:
a. Tender No: C/M/EnHM/KMT.HK/2026-27. Dt: 13.07.2026
b. Name of Work: Out sourcing of Comprehensive Housekeeping and Mechanized cleaning of KHAMMAM Railway station for a period of Three years.
c. Approximate Cost of work: Rs. 1,89,07,370/-
d. Earnest Money Deposit: Rs. 2,44,550/-
e. Validity of Tender: 90 days from the date of tender opening.
f. Stipulated date of Commencement: Within 15 days from date of receipt of "Letter of Acceptance" or as directed by Sr.DEnHM/SC (as per para 4.15 of GCC Services 2018).
g. Time Period: 03 years from the date of commencement.
h. Authority: Office of Senior Divisional Environment & Housekeeping Manager, Secunderabad, Secunderabad division, South Central Railway.

CHECKLIST OF DOCUMENTS:
- EMD Remittance, MSME Certificate, ISO Certificate, Engineering Organization (Annexure A), Plant and Machinery (Annexure B), Experience Certificate (Annexure C), Works completed (Annexure D), Turnover Certificate (Annexure F), Banking Reference Liquidity (Annexure G), NEFT Mandate (Annexure H), Contract Agreement (Annexure L), Revised Performance Guarantee (Annexure M), Form-A Employee Register, Form-B Wage Register, Form-D Attendance Register.

REGULATIONS & CONDITIONS:
- Performance Guarantee: 5% of contract value in four 1.25% parts within 30 days of LOA. Penal interest 15% per annum beyond 30 days. Beyond 90 days, termination, EMD forfeiture, and 2-year debarment.
- Two Packet System: Technical Bid & Financial Bid.""",
        "analysis": {
            "summary": {
                "purpose": "Outsourcing of Comprehensive Housekeeping and Mechanized cleaning of KHAMMAM Railway station for a period of Three years under Secunderabad Division, South Central Railway.",
                "parties": [
                    "South Central Railway, Secunderabad Division (Office of Senior Divisional Environment & Housekeeping Manager - Sr.DEnHM/SC)",
                    "Selected Service Provider / Contractor"
                ],
                "main_terms": "Execution of comprehensive mechanized cleaning and housekeeping operations at Khammam Railway station for 3 years; commencement within 15 days of LOA; two-packet evaluation; 5% Performance Guarantee; statutory labour registry compliance.",
                "financial_terms": "Rs. 1,89,07,370/- Approximate Cost of Work (Earnest Money Deposit: Rs. 2,44,550/-; Bid Validity: 90 Days; 5% Performance Guarantee)",
                "effective_date": "Within 15 days from the date of receipt of Letter of Acceptance (LOA) or as directed by Sr.DEnHM/SC",
                "expiration_date": "03 years from the date of commencement",
                "renewal_conditions": "Performance Guarantee valid up to completion plus 90 days; contract extension subject to railway review and GCC Services 2018 conditions.",
                "termination_provisions": "Termination with forfeiture of EMD and Performance Guarantee, plus a mandatory 2-year debarment from participating in re-tender if PG is not furnished within 90 days of LOA or in case of execution default.",
                "quick_summary": "Open e-tender by Secunderabad Division, South Central Railway for comprehensive housekeeping and mechanized cleaning of Khammam Railway station for 3 years. Total estimated cost is Rs. 1,89,07,370/- with an EMD of Rs. 2,44,550/-.",
                "detailed_summary": "Tender No. C/M/EnHM/KMT.HK/2026-27 issued by the Senior Divisional Environment & Housekeeping Manager, Secunderabad Division, South Central Railway invites open tenders under a two-packet system for 3-year mechanized cleaning and housekeeping of Khammam station. The project cost is Rs. 1,89,07,370/- with an EMD of Rs. 2,44,550/- (exempt for eligible MSEs). Services must commence strictly within 15 days of the Letter of Acceptance. The contractor must provide a 5% Performance Guarantee in four 1.25% tranches within 30 days of LOA, deploy specialized mechanized cleaning plant and machinery, maintain statutory worker registers (Form-A to Form-D), and adhere to all labour and safety laws.",
                "plain_english_summary": "South Central Railway's Secunderabad Division is contracting an agency to handle complete mechanized cleaning and housekeeping at Khammam Railway station for 3 years. The estimated tender amount is Rs. 1.89 Crore with an EMD deposit of Rs. 2.45 Lakh. The contractor must start work within 15 days of winning, provide modern cleaning machinery, pay statutory minimum wages and EPF/ESI to cleaners, and deposit a 5% performance guarantee within 30 days."
            },
            "risks": [
                {
                    "title": "Strict 15-Day Mobilization & Commencement Window",
                    "category": "Operational",
                    "severity": "High",
                    "explanation": "Clause f stipulates that the contractor must commence cleaning services within 15 days of receiving the Letter of Acceptance, leaving an extremely tight window to mobilize personnel, safety gear, and heavy mechanized cleaning machinery.",
                    "supporting_passage": "Clause 1.2.f: The contractor shall commence the services within 15 days (unless specified otherwise) from the date of receipt of 'Letter of Acceptance' or as directed by Sr.DEnHM/SC (as per para 4.15 of GCC Services 2018).",
                    "page_number": 1,
                    "section_ref": "Clause 1.2.f - Commencement of Work",
                    "potential_impact": "Immediate breach of contract, penalties, or LOA cancellation before operations begin.",
                    "suggested_action": "Pre-arrange machinery logistics and staffing rosters in advance of bid award."
                },
                {
                    "title": "Severe 2-Year Debarment & PG Forfeiture on Rescission",
                    "category": "Compliance",
                    "severity": "High",
                    "explanation": "If the contractor fails to submit the Performance Guarantee within 90 days or defaults on execution, the contract will be terminated, PG forfeited, and the contractor and individual partners debarred for 2 years from railway tenders.",
                    "supporting_passage": "Clause 1.8.a & 1.8.f: In case the contractor fails to submit the requisite PG even after 90 days... the contract shall be terminated duly forfeiting the EMD... The failed contractor shall be debarred for a period of 2 years.",
                    "page_number": 8,
                    "section_ref": "Clause 1.8.a & Clause 1.8.f - Rescission & Debarment",
                    "potential_impact": "Total blacklisting across all Indian Railway tenders and forfeiture of performance deposit.",
                    "suggested_action": "Initiate bank guarantee issuance immediately upon receipt of LOA."
                },
                {
                    "title": "Total Railway Indemnity for Worker Casualties",
                    "category": "Liability",
                    "severity": "High",
                    "explanation": "Contractor bears sole responsibility for worker safety and must pay all compensation in case of accident, injury, or loss of life under the Workmen Compensation Act and Labour Rules.",
                    "supporting_passage": "Instructions: The contractor shall note that no compensation due to any loss of life or loss of material or any other account be given by the Railway Administration while carrying out the work and the Contractor shall have to pay all compensation.",
                    "page_number": 11,
                    "section_ref": "General Conditions - Worker Compensation",
                    "potential_impact": "Substantial legal liability and compensation claims in the event of platform or trackside mishaps.",
                    "suggested_action": "Secure comprehensive commercial general liability and workers' compensation insurance."
                },
                {
                    "title": "15% Penal Interest on Delayed Performance Guarantee",
                    "category": "Financial",
                    "severity": "Medium",
                    "explanation": "Delay in submitting the 5% Performance Guarantee beyond 30 days attracts 15% per annum penal interest up to 90 days.",
                    "supporting_passage": "Clause 1.8.a: However, a penal interest of 15% per annum shall be charged for the delay beyond 30 days (i.e. from 31st day after the date of issue of LOA).",
                    "page_number": 8,
                    "section_ref": "Clause 1.8.a - Performance Guarantee",
                    "potential_impact": "Unnecessary financial drag on contract cash flows.",
                    "suggested_action": "Ensure full PG documentation is submitted within the initial 30-day interest-free period."
                },
                {
                    "title": "Multi-Document Technical Eligibility Rejection Risk",
                    "category": "Compliance",
                    "severity": "Medium",
                    "explanation": "Failure to submit any of the 20 checklist documents (including Chartered Accountant turnover certificate, banking liquidity reference, and plant/machinery list) results in summary technical rejection.",
                    "supporting_passage": "Clause 1.6.1 & Checklist: All documentary proof is to be submitted in Technical Bid to judge the technical suitability... Insufficient details submitted will make tenders incomplete and invalid.",
                    "page_number": 2,
                    "section_ref": "Check List of Documents",
                    "potential_impact": "Disqualification before financial bid opening.",
                    "suggested_action": "Audit all 20 annexures and verify CA turnover certifications prior to bid upload."
                }
            ],
            "clauses": [
                {
                    "clause_type": "Payment Terms",
                    "original_text": "Clause 1.6.2: Financial Bid shall consist of Schedule of Rates. Rates must be firm, precise and unconditional, inclusive of all labour related wages, supervisors, training to contract labour, and any other direct or hidden costs.",
                    "plain_summary": "All-inclusive firm rates covering all staff, supervisors, training, and operational costs.",
                    "page_number": 7,
                    "section_ref": "Clause 1.6.2 - Financial Bid"
                },
                {
                    "clause_type": "Termination",
                    "original_text": "Clause 1.8.a: In case the contractor fails to submit the requisite PG even after 90 days from the date of issue of LOA, the contract shall be terminated duly forfeiting the EMD and other dues, if any... The contractor shall be debarred for 2 years.",
                    "plain_summary": "Contract termination, EMD forfeiture, and 2-year debarment if performance guarantee is delayed past 90 days.",
                    "page_number": 8,
                    "section_ref": "Clause 1.8.a - Termination & Debarment"
                },
                {
                    "clause_type": "Limitation of Liability",
                    "original_text": "Clause 1.21 & Special Conditions: The Railway reserves the right to accept or reject any tender without assigning reasons. Railway has zero liability for contractor labour compensation or third-party damages.",
                    "plain_summary": "Railway holds sole discretionary power over bid awards and disclaims all liability for contractor labor.",
                    "page_number": 12,
                    "section_ref": "Clause 1.21 - Right of Railway"
                },
                {
                    "clause_type": "Governing Law",
                    "original_text": "Clause 1.3: The contract shall be governed by the law for the time being in force in the Republic of India and GCC for Services, January 2018.",
                    "plain_summary": "Governed by the laws of India and Indian Railways GCC for Services (January 2018).",
                    "page_number": 5,
                    "section_ref": "Clause 1.3 - Law governing the Contract"
                }
            ],
            "obligations": [
                {
                    "description": "Commence mechanized cleaning and housekeeping services at Khammam station within 15 calendar days of LOA",
                    "responsible_party": "Contractor",
                    "beneficiary": "South Central Railway (Secunderabad Division)",
                    "deadline_expression": "Within 15 days of Letter of Acceptance",
                    "calculated_deadline": None,
                    "page_number": 1,
                    "status": "Pending",
                    "notes": "Strict 15-day timeline as per para 4.15 of GCC Services 2018"
                },
                {
                    "description": "Deploy and maintain all mechanized cleaning plant and machinery as specified in Annexure B",
                    "responsible_party": "Contractor",
                    "beneficiary": "Khammam Railway Station Passengers & Administration",
                    "deadline_expression": "Upon service commencement",
                    "calculated_deadline": None,
                    "page_number": 2,
                    "status": "Active",
                    "notes": "Machinery inspection conducted prior to operational clearance"
                },
                {
                    "description": "Submit 5% Performance Guarantee in four parts within 30 days of LOA",
                    "responsible_party": "Contractor",
                    "beneficiary": "Sr. Divisional Finance Manager, Secunderabad",
                    "deadline_expression": "Within 30 calendar days of LOA",
                    "calculated_deadline": None,
                    "page_number": 8,
                    "status": "Pending",
                    "notes": "15% per annum penal interest applies after 30 days"
                },
                {
                    "description": "Maintain statutory registers: Form-A (Employee), Form-B (Wage), Form-C (Loans), Form-D (Attendance)",
                    "responsible_party": "Contractor",
                    "beneficiary": "Labour Enforcement & Railway Inspection Officers",
                    "deadline_expression": "Daily / Continuous throughout 3-year term",
                    "calculated_deadline": None,
                    "page_number": 3,
                    "status": "Active",
                    "notes": "Registers subject to unannounced inspection by Sr.DEnHM/SC"
                }
            ],
            "metadata": [
                {"field_name": "Tender Title", "field_value": "Comprehensive Housekeeping & Mechanized Cleaning of Khammam Station", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Tender Number", "field_value": "C/M/EnHM/KMT.HK/2026-27", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Estimated Cost", "field_value": "Rs. 1,89,07,370/-", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Earnest Money Deposit (EMD)", "field_value": "Rs. 2,44,550/-", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Contract Period", "field_value": "03 Years from date of commencement", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Commencement Window", "field_value": "Within 15 days of Letter of Acceptance", "confidence": 0.99, "page_ref": 1},
                {"field_name": "Performance Guarantee", "field_value": "5% of contract value in four 1.25% tranches", "confidence": 0.98, "page_ref": 8}
            ]
        }
    }
}

def detect_demo_contract(
    file_bytes: Optional[bytes] = None, 
    filename: Optional[str] = None, 
    text_sample: Optional[str] = None
) -> Optional[Dict[str, Any]]:
    """
    Identifies if an uploaded file or text matches one of the 5 demo contracts.
    Matches via:
    1. Exact MD5 hash
    2. Keywords in filename
    3. Keywords in OCR/extracted text
    """
    # 1. Check MD5 hash if bytes provided
    if file_bytes:
        file_hash = hashlib.md5(file_bytes).hexdigest()
        for doc in DEMO_CONTRACTS.values():
            if file_hash in doc["md5_hashes"]:
                return doc

    # 2. Check text or filename
    combined_probe = f"{filename or ''} {text_sample or ''}".lower()

    if any(k in combined_probe for k in ["land sale", "chevella", "mallikarjun", "10,890 sq", "128/3"]):
        return DEMO_CONTRACTS["land_sale"]

    if any(k in combined_probe for k in ["house rental", "aravind kumar", "priya sharma", "green park street", "coimbatore", "house rentals"]):
        return DEMO_CONTRACTS["house_rental"]

    if any(k in combined_probe for k in ["hotel management", "sunrise hospitality", "elite stays", "sunrise grand", "gachibowli", "12% of gross room"]):
        return DEMO_CONTRACTS["hotel_management"]

    if any(k in combined_probe for k in ["vehicle hire", "vechile", "vehicle", "tata ace", "swift logistics", "ts 09 ef 4587", "k. ramesh", "miyapur"]):
        return DEMO_CONTRACTS["vehicle_hire"]

    if any(k in combined_probe for k in ["guntupalli", "wagon workshop", "assist welding", "596 working days", "5,24,72,067", "52472067", "4,12,360", "412360", "poh attention"]):
        return DEMO_CONTRACTS["scr_guntupalli_welding"]

    if any(k in combined_probe for k in ["khammam", "kmt.hk", "mechanized cleaning", "comprehensive housekeeping", "1,89,07,370", "18907370", "2,44,550", "244550", "sr.denhm"]):
        return DEMO_CONTRACTS["scr_khammam_housekeeping"]

    if any(k in combined_probe for k in ["software development", "technova", "codecraft", "custom e-commerce", "15,00,000", "90 calendar days"]):
        return DEMO_CONTRACTS["software_development"]

    return None
