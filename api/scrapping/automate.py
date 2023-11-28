import CSV
import Tomato
import WotAPI

def process(allIDs):
    result = []
    for id in allIDs:
        playerName = WotAPI.getPlayerNamefromID(id)
        wn8 = Tomato.getRecentWN8ofPlayer(playerName,id)
        print(f"{playerName} recent wn8 is {wn8}")
        if wn8 is not None:
            result.append([id,playerName,wn8])
    return result
    
if __name__ == "__main__":
    
    allIDs = CSV.read("playersID_20lines")
    data = process(allIDs) 
    CSV.write("wn8",data)