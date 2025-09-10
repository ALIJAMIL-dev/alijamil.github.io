from flask import Blueprint, jsonify, request

api_bp = Blueprint("api", __name__)

# GET
@api_bp.route("/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Hello from Flask Backend!"})

# POST
@api_bp.route("/data", methods=["POST"])
def get_data():
    data = request.get_json()
    return jsonify({"received": data})
