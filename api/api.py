from flask import Flask, request, jsonify
from flask_cors import CORS
from .controllers.processor import delegate
import logging
app = Flask(__name__)
CORS(app)
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

@app.route("/api/generateInstructions", methods=["POST"])
def generateInstructions():
    data = request.get_json()
    return delegate(data)
