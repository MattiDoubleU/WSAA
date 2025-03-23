import os
import requests
import json

url = 'https://api.github.com/users/andrewbeattycourseware/repos?per_page=100'
#url = 'https://api.github.com/repos/andrewbeattycourseware/wsaa-course-material/contents/code'
#url = 'https://api.github.com/repos/andrewbeattycourseware/aprivateone'

#filename = "repos-public.json"
filename = "wsaa-code.json"
txt_filename = "wsaa-code.txt"
destination_folder = r"C:\Users\User\ATU\WSAA\My-work"

# Ensure the destination folder exists
os.makedirs(destination_folder, exist_ok=True)

# Full file path
file_path = os.path.join(destination_folder, filename)
txt_file_path = os.path.join(destination_folder, txt_filename)

response = requests.get(url)
print (response.status_code)
repoJSON = response.json()
#print (response.json())

with  open(filename, 'w') as fp:
    json.dump(repoJSON, fp, indent=4)

# Convert JSON to text and save.
with open(txt_file_path, 'w') as fp:
    if isinstance(repoJSON, list):  # Check if JSON is a list.
        for item in repoJSON:
            if isinstance(item, dict):  # Ensure each item is a dictionary.
                for key, value in item.items():
                    fp.write(f"{key}: {value}\n")
                fp.write("\n")  # Add space between entries.

    else:  # If JSON is a dictionary.
        for key, value in repoJSON.items():
            fp.write(f"{key}: {value}\n")
