import urllib.request
import json
import os

config_path = r"c:\Hoang's projects\03_DR_HOANG_CONTENT_AND_MEDIA\instagram_facts_studio\config.env"
api_key = ""
if os.path.exists(config_path):
    with open(config_path, "r", encoding="utf-8") as f:
        for line in f:
            if line.startswith("GEMINI_API_KEY="):
                api_key = line.strip().split("=", 1)[1].strip('"\' ')

print("Found API Key:", bool(api_key))

models_to_test = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-3.1-flash-lite",
    "gemini-3.8-flash"
]

for m in models_to_test:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={api_key}"
    body = json.dumps({"contents": [{"parts": [{"text": "hello"}]}]}).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"{m} -> HTTP {resp.status}")
    except Exception as e:
        print(f"{m} -> ERROR: {e}")
