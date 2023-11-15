import os
from bs4 import BeautifulSoup
import webbrowser
import requests
import json 

url = "https://eu.wargaming.net/clans/wot/500066861/"
targeted_language = "fr"

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
    
    if actualClanID is not None and targeted_language in getLanguagesFromClanID(actualClanID):
        isFrench = True
    else:
        cpt = 0
        for id in allClansIDs:
            if targeted_language in getLanguagesFromClanID(id):
                cpt += 1
        if cpt > 3:
            isFrench = True
    return isFrench

def getPlayerIDfromName(name):
    response = requests.get(f"https://worldoftanks.eu/fr/community/accounts/#wot&at_search={name}")
    soup = BeautifulSoup(response.text, 'html.parser')
    id = None
    try:
        lines = soup.find("script")
        for line in lines:
            
            if name in line.get("href"):
                id = line.split("/")[-2].split("-")[0]
    except:
        id = None
    return id

def getNamefromID(id):
    response = requests.get(f"https://worldoftanks.eu/fr/community/accounts/{id}")
    try:
        name = response.url.split("/")[-2].split("-")[1]
    except:
        name = None
    return name

def getAllFrenchPlayersIDs():
    allIDs = range(500000000,600000000)
    allFrenchPlayers = []
    for id in allIDs:
        name = getNamefromID(str(id))
        print(name)
        if name is not None and isPlayerFrench(name):
            allFrenchPlayers.append((name,str(id)))
    return allFrenchPlayers

def getWN8fromPlayerName():
    return 0

def getAllFrenchClans():
    response = requests.get("http://ledernierdenous.alwaysdata.net/clancc")

    soup = BeautifulSoup(response.text, 'html.parser')
    clanLinks = soup.find_all("div", {"class": "clan-tag"})
    allIDs = []
    for clanLink in clanLinks:
        allIDs.append(getIDFromClanLink(clanLink.find("a").get("href")))
    return allIDs

#allL = getLanguagesFromClanID("500066861")
# print(allL)

cous = "Couscouz_"
daki = "Dakillzor"

#print(isPlayerFrench(name))

# temp = getNamefromID("500135410")
# print(temp)

all = getAllFrenchPlayersIDs()
print(all)