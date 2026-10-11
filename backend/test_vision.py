import urllib.request, urllib.error, json, base64, io, sys
from PIL import Image, ImageDraw
from app.core.config import settings

img = Image.new('RGB', (600, 200), color=(255, 255, 255))
d = ImageDraw.Draw(img)
d.text((20, 40), 'CONFIDENTIALITY AGREEMENT: Disclose no secrets.', fill=(0, 0, 0))
buf = io.BytesIO()
img.save(buf, format='JPEG')
b64 = base64.b64encode(buf.getvalue()).decode('utf-8')

api_key = settings.GEMINI_API_KEY
models_to_test = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-flash-latest',
    'gemini-3.5-flash',
    'gemini-3.7-flash',
    'gemini-3.8-flash'
]

for m in models_to_test:
    sys.stdout.write(f'Testing {m}... ')
    sys.stdout.flush()
    url = f'https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={api_key}'
    payload = {
        'contents': [{
            'parts': [
                {'inline_data': {'mime_type': 'image/jpeg', 'data': b64}},
                {'text': 'Transcribe all text from this image verbatim.'}
            ]
        }]
    }
    try:
        req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            res = json.loads(resp.read().decode('utf-8'))
            print('SUCCESS: ' + res['candidates'][0]['content']['parts'][0]['text'].strip())
            break
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode('utf-8', errors='ignore')
        print(f'HTTPError {e.code}: {err_msg[:120]}')
    except Exception as e:
        print(f'Error: {e}')
