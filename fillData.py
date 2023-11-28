import csv
import os
from bs4 import BeautifulSoup
import webbrowser
import requests
import json
import WotAPI
#from wotapi import WotAPI, REALM

APPLICATION_ID = '104dcbb058cfe503c47eb27800beb0ec'

def readCSV(csvName):
    with open(f"data/{csvName}.csv", newline='') as file:   
        reader = csv.reader(file,delimiter=';')
        data = list(reader)
    return data

def writeCSV(csvName,data):
    with open(f"data/{csvName}.csv", "w") as file:
        for line in data:
            lineToWrite = ""
            for value in line:
                lineToWrite += value + ";"
            file.write(f"{lineToWrite[:-1]}\n")
    
    
def getClanIDbyName(name):
    
    # Obtain the account id
    # Since this is a constant it can be executed only once to get the account_id
    #wot = WotAPI(APPLICATION_ID, realm=REALM.eu)
    #account_id = wot.get_account_id(nickname='Couscouz')

    response = requests.get(f"https://api.worldoftanks.eu/wot/clans/list/?application_id={APPLICATION_ID}&search={name.lower()}")
    id = json.loads(response.content)["data"][0]["clan_id"]
    print(f"{name} id={id}")
    return id

def getPlayerIDbyName(name):
    response = requests.get(f"https://api.worldoftanks.eu/wot/account/list/?application_id=104dcbb058cfe503c47eb27800beb0ec&search=Couscouz")
    js = json.loads(response.content)
    print(js)

def getPlayersOfClan(clanID):
    allP = []
    response = requests.get(f"https://api.worldoftanks.eu/wot/clans/info/?application_id={APPLICATION_ID}&clan_id={clanID}")
    try:
        members = json.loads(response.content)["data"][clanID]["members"]
        for member in members:
            allP.append([member["account_name"],member["account_id"]])
    except:
        allP = []
    return allP

def processClans():
    with open('data/clans.csv', newline='') as f:   
        reader = csv.reader(f)
        data = list(reader)

    r = open('data/result.csv', "w")

    for line in data:
        id = getClanIDbyName(line[0])
        r.write(f"{line[0]};{id}\n")

    r.close()
    f.close()

def writeAllPlayersFromFrenchClans():
    playersFile = open("data/result.csv","w")

    with open('data/clans.csv', newline='') as f:   
        reader = csv.reader(f,delimiter=';')
        allClans = list(reader)

    for clan in allClans:
        print(clan)
        playersOfClan = getPlayersOfClan(clan[1])
        for player in playersOfClan:
            playersFile.write(f"{player[0]};{player[1]}\n")
            print(f"add {player[0]} of {clan[0]}")
    print("done")
    playersFile.close()

def getRecentWN8ofPlayer(name,id):
    overall, overallX, recent, recentX = 0,0,0,0

    response = requests.get(f"https://tomato.gg/stats/EU/{name}%3D{id}?tab=advanced")
    soup = BeautifulSoup(response.text, "html.parser")
    try:
        divs = soup.find_all("div", {"class": "sc-1c1f782f-0"})
        for div in divs:
            if "Heatmap" in str(div):
                heatmapDiv = div
        #print(heatmapDiv)
        heatmapDiv = heatmapDiv.find_all("div")
        for div in heatmapDiv:
            print(div)
    except:
        allP = []

    return 0

def writeAllwn8():
    dataFile = open("data/result.csv","w")

    with open('data/players.csv', newline='') as f:   
        reader = csv.reader(f,delimiter=';')
        allPlayers = list(reader)

    for player in allPlayers:
        overall, overallX, recent, recentX = getWN8ofPlayer(player[0],player[1])
        dataFile.write(f"{player[0]};{player[1]};{overall};{overallX};{recent};{recentX}\n")
        print(f"add {player[0]} => {overall};{overallX};{recent};{recentX}")

    return

def process(data,function):
    res = []
    for value in data:
        res.append(function(value))
    return res

if __name__ == "__main__":
    #allPseudos = readCSV("toGet")
    allPseudos = ["Couscouz_"]
    allIds = process(allPseudos,getPlayerIDbyName)
    #writeCSV("oui",allPseudos)