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

candidates = [
    "gemini-3.1-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-3.5-flash-lite",
    "gemini-3.6-flash",
    "gemini-3.7-flash",
    "gemini-3.1-pro-preview",
    "gemini-2.5-flash-lite",
    "gemini-pro-latest"
]

for m in candidates:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent?key={api_key}"
    body = json.dumps({"contents": [{"parts": [{"text": "Hello"}]}]}).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"{m} -> HTTP {resp.status} OK")
    except Exception as e:
        print(f"{m} -> {e}")
