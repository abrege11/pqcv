from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/generateInstructions", methods=["POST"])
def generateInstructions():
    data = request.get_json()
    print("Received data:", data)
    return {"message": "Instructions received"}
