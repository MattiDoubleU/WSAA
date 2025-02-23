import requests

url = "https://api.twitter.com/oauth/request_token"  
response = requests.post(url, data={})  

print(response.status_code)  