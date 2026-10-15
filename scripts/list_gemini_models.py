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

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
try:
    with urllib.request.urlopen(url) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        for m in data.get("models", []):
            if "generateContent" in m.get("supportedGenerationMethods", []):
                print(m.get("name"))
except Exception as e:
    print("ERROR:", e)
