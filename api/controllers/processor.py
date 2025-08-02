from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
from ..helpers import serializeGates
import matplotlib
matplotlib.use('Agg')

def delegate(channels):
    registers = len(channels)
    circuitInstructions = serializeGates(channels)
    qc = QuantumCircuit(registers)
    instructions = getInstructions(circuitInstructions, registers)
    return {"message": instructions}

def getInstructions(circuitInstructions, numQubits):
    state = Statevector.from_int(0, dims=[2] * numQubits)
    res=[]
    for qubit, gates in circuitInstructions.items():
        for gate in gates:
            qc = QuantumCircuit(numQubits)
            getattr(qc, gate)(int(qubit))
            state = state.evolve(qc)
            res.append([{"real": c.real, "imag": c.imag} for c in state.data])
    return res

def getCircuitPNG(qc, circuitInstructions):
    for qubit, gates in circuitInstructions.items():
        for gate in gates:
            gateMethod = getattr(qc, gate)
            gateMethod(int(qubit))

    fig = qc.draw('mpl')
    fig.savefig("circuit.png")