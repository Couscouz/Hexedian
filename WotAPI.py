import requests
import json


APPLICATION_ID = '104dcbb058cfe503c47eb27800beb0ec'

def getClanIDbyName(name):
    response = requests.get(f"https://api.worldoftanks.eu/wot/clans/list/?application_id={APPLICATION_ID}&search={name.lower()}")
    id = json.loads(response.content)["data"][0]["clan_id"]
    print(f"{name} id={id}")
    return id
