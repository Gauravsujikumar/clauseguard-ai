import os
import sys
import json
import urllib.request
import urllib.error

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from app.core.config import settings

api_key = settings.GEMINI_API_KEY
models = [
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite',
    'gemini-flash-latest',
    'gemini-flash-lite-latest',
    'gemini-3.7-flash',
    'gemini-3.1-flash-lite',
    'gemini-3-flash-preview',
    'gemini-pro-latest'
]

payload = json.dumps({"contents": [{"parts": [{"text": "Hi"}]}]}).encode("utf-8")

for m in models:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={api_key}"
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=6) as r:
            res = json.loads(r.read().decode("utf-8"))
            print(f"{m}: ACTIVE (200 OK)", flush=True)
    except urllib.error.HTTPError as e:
        print(f"{m}: HTTP {e.code}", flush=True)
    except Exception as e:
        print(f"{m}: {e}", flush=True)
