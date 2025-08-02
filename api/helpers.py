gateMap = {"a928dfa9-75b0-4152-8ee1-22f1dfe680b5": "h", "06ebe310-bc30-4d57-ac2a-f272ddb26ab1": "s", "d43a8020-2058-4889-89c3-a7711b4b5681": "x", "c4359cfd-4428-4072-b341-aba781068ab8": "y", "087ba4ff-1c16-43ed-ac96-cf0229f63345": "z"}

def getGateById(gateId):
    return gateMap.get(gateId)

def serializeGates(gateMap):
    newObj = {}
    for reg, gates in gateMap.items():
        temp=[]
        for gate in gates:
            temp.append(getGateById(gate))
        newObj[reg] = temp
    return newObj
