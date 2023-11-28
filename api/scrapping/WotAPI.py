from bs4 import BeautifulSoup
import requests
import json

APPLICATION_ID = '104dcbb058cfe503c47eb27800beb0ec'
TARGETED_LANGUAGE = "fr"

#----GET-CLANS------------------------------

def getClanIDbyName(name):
    response = requests.get(f"https://api.worldoftanks.eu/wot/clans/list/?application_id={APPLICATION_ID}&search={name.lower()}")
    id = json.loads(response.content)["data"][0]["clan_id"]
    return int(id)



#----GET-PLAYERS---------------------

def getPlayerIDbyName(name):
    response = requests.get(f"https://api.worldoftanks.eu/wot/account/list/?application_id={APPLICATION_ID}&search={name.lower()}")
    response = requests.get(f"https://worldoftanks.eu/fr/community/accounts/{id}")
    try:
        id = int(json.loads(response.content)["data"][0]["account_id"])
    except:
        id = None
    return id

def getPlayerNamefromID(id):
    response = requests.get(f"https://worldoftanks.eu/fr/community/accounts/{id}")
    try:
        name = response.url.split("/")[-2].split("-")[1]
    except:
        name = None
    return name

def getPlayersOfClan(clanID):
    allPlayers = []
    response = requests.get(f"https://api.worldoftanks.eu/wot/clans/info/?application_id={APPLICATION_ID}&clan_id={clanID}")
    try:
        members = json.loads(response.content)["data"][clanID]["members"]
        for member in members:
            allPlayers.append([member["account_name"],member["account_id"]])
    except:
        allPlayers = []
    return allPlayers

#-------------------------------------------
#---------------USELESS---------------------
#-------------------------------------------

def getIDFromClanLink(url):
    return url.split("/")[3].split("-")[-1]

def getLanguagesFromClanID(id):
    apiURL = f"https://eu.wargaming.net/clans/wot/{id}/api/claninfo/"
    response = requests.get(apiURL)
    json_object = json.loads(response.text)
    
    try:
        languages = json_object["clanview"]["profiles"][1]["languages_list"]
    except:
        languages = []
   
    return languages


def getAllClanIDsFromPlayerName(name):
    response = requests.get(f"https://fr.wot-life.com/eu/player/{name}")
    soup = BeautifulSoup(response.text, 'html.parser')
    clanLinks = soup.find_all("div", {"class": "clan-tag"})
    allIDs = []
    for clanLink in clanLinks:
        allIDs.append(getIDFromClanLink(clanLink.find("a").get("href")))
    return allIDs

def getCurrentClanIDFromPlayer(name):
    response = requests.get(f"https://fr.wot-life.com/eu/player/{name}")
    soup = BeautifulSoup(response.text, 'html.parser')
    try:
        clanLink = soup.find("div", {"id": "title"}).find("a").get("href")
        id = getIDFromClanLink(clanLink)
    except:
        id = None
    return id
    
def isPlayerFrench(name):
    isFrench = False
    actualClanID = getCurrentClanIDFromPlayer(name)
    allClansIDs = getAllClanIDsFromPlayerName(name)
    
    if actualClanID is not None and TARGETED_LANGUAGE in getLanguagesFromClanID(actualClanID):
        isFrench = True
    else:
        cpt = 0
        for id in allClansIDs:
            if TARGETED_LANGUAGE in getLanguagesFromClanID(id):
                cpt += 1
        if cpt > 3:
            isFrench = True
    return isFrench


def getAllFrenchClans():
    response = requests.get("http://ledernierdenous.alwaysdata.net/clancc")

    soup = BeautifulSoup(response.text, 'html.parser')
    clanLinks = soup.find_all("div", {"class": "clan-tag"})
    allIDs = []
    for clanLink in clanLinks:
        allIDs.append(getIDFromClanLink(clanLink.find("a").get("href")))
    return allIDs