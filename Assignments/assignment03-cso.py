import json
import requests

URL = "https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.ReadDataset/FIQ02/JSON-stat/2.0/en"

response = requests.get(URL)
data = response.json()

# Using if statement for error handling and "w" to overwrite existing file.

if response.status_code == 200:
    with open(r"C:\Users\User\ATU\WSAA\Assignments\cso.json", "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4)
    print("Data saved to cso.json")
else:
    print(f"Couldn't fetch data: {response.status_code}")



   

    