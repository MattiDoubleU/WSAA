import requests

url = "https://www.cso.ie/en/index.html"
response = requests.get(url)

print(f"Status Code: {response.status_code}")