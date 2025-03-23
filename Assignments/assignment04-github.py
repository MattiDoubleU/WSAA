import requests
import re
from github import Github
from config import config as cfg

apikey = cfg.get('apikey')
g = Github(apikey)

repo = g.get_repo("MattiDoubleU/Testrepository-for-WSAA") 

fileInfo = repo.get_contents("wsaa-andrew-code.txt")
urlOfFile = fileInfo.download_url

response = requests.get(urlOfFile)
contentOfFile = response.text

# Replacing anything that resembles Andrew even when it is inside a word and case insensitive.
# Using regex pattern.
modified_content = re.sub(r"(?i)andrew", "Matthias", contentOfFile)

print("Modified Content:\n", modified_content)

output_filename = "wsaa-andrew-code.txt"

with open(output_filename, "w", encoding="utf-8") as file:
        file.write(modified_content)

print(f"Modified content saved to {output_filename}")

gitHubResponse=repo.update_file(fileInfo.path,"updated by prog",
modified_content,fileInfo.sha)
print (gitHubResponse)
