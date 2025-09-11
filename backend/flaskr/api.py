from flask import Blueprint, jsonify, request, current_app, send_from_directory

api_bp = Blueprint("api", __name__)

# GET API Example
@api_bp.route("/hello", methods=["GET"])
def hello():
    # return HTML file for /hello
    return send_from_directory(current_app.static_folder, "hello.html")

# POST API Example
@api_bp.route("/data", methods=["POST"])
def get_data():
    data = request.get_json()
    return jsonify({"received": data})

# Serve index.html at root
@api_bp.route("/", methods=["GET"])
def index():
    return send_from_directory(current_app.static_folder, "index.html")

# Example: /another route serving another.html
@api_bp.route("/another", methods=["GET"])
def another():
    return send_from_directory(current_app.static_folder, "another.html")