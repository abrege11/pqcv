from qiskit import QuantumCircuit
from ..helpers import serializeGates
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

def delegate(channels):
    registers = len(channels)
    circuitInstructions = serializeGates(channels)
    qc = QuantumCircuit(registers)
    instructions = processCircuit(qc, circuitInstructions)
    return {"message": instructions}

def processCircuit(qc, circuitInstructions):
    for qubit, gates in circuitInstructions.items():
        for gate in gates:
            gateMethod = getattr(qc, gate)
            gateMethod(int(qubit))

    fig = qc.draw('mpl')
    fig.savefig("circuit.png")
