#Sandbox
def process(data,function):
    res = []
    for value in data:
        data = value[0]
        print(data)
        try:
            res.append(function(data))
        except:
            print(f"Error on value={data}")
    return res

if __name__ == "__main__":
    #CSV.removeRow()
    pass