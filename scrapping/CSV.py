import csv

#filename in /data
def read(filename):
    with open(f"../data/{filename}.csv", newline='') as file:   
        reader = csv.reader(file,delimiter=';')
        data = list(reader)
    if width(filename) == 1:
        epurated = []
        for line in data:
            epurated.append(line[0])
        return epurated
    return data

#filename in /data
def write(filename,data):
    with open(f"../data/{filename}.csv", "w") as file:
        for line in data:
            if isinstance(line, list):
                lineToWrite = ""
                for value in line:
                    lineToWrite += str(value) + ";"
                file.write(f"{lineToWrite[:-1]}\n")
            else:
                file.write(f"{line}\n")
    
#filenames in /data
def merge(filename1,filename2,resultname):
    data1 = read(filename1)
    data2 = read(filename2)
    merge = data1 + data2
    allUniques = set(merge)
    resultData = list(allUniques)
    write(resultname,resultData)
    print(f"Merged, {len(data1)+len(data2)-len(resultData)} lines removed")

#filename in /data and rowNumber possible
def removeRow(filename,rowNumber):
    if rowNumber < width(filename) and rowNumber > 1:
        data = read(filename)
        for line in data:
            print(line)
            line.pop(rowNumber)
        write(filename,data)
        
#filename in /data
def width(filename):
    minimum = 0
    for line in read(filename):
        if len(line) > minimum:
            minimum = len(line)
    return minimum