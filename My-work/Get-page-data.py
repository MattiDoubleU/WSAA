import requests

page = requests.get("https://www.atu.ie/")

print(page.text)  