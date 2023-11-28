import requests
import WotAPI
from bs4 import BeautifulSoup

def getRecentWN8ofPlayer(name,id):
    overall, overallX, recent, recentX = 0,0,0,0

    response = requests.get(f"https://tomato.gg/stats/EU/{name}%3D{id}")
    soup = BeautifulSoup(response.text, "html.parser")
    try:
        wn8 = int(soup.find("div", {"class": "giPEpe"}).text)
    except:
        wn8 = None
    return wn8