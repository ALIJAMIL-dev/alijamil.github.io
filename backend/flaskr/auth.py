from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt
import json
import os

auth_bp = Blueprint("auth", __name__)

# Simple in-memory user storage (in production, use a database)
USERS_FILE = 'users.json'

def load_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)

@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if not all([username, email, password]):
            return jsonify({"error": "All fields are required"}), 400
        
        users = load_users()
        
        # Check if user already exists
        if username in users or any(user['email'] == email for user in users.values()):
            return jsonify({"error": "Username or email already exists"}), 400
        
        # Hash password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        # Create user
        users[username] = {
            'username': username,
            'email': email,
            'password': hashed_password,
            'profile': {
                'name': username,
                'bio': '',
                'skills': [],
                'projects': []
            }
        }
        
        save_users(users)
        
        # Create access token
        access_token = create_access_token(identity=username)
        
        return jsonify({
            "message": "User registered successfully",
            "access_token": access_token,
            "user": {
                "username": username,
                "email": email
            }
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not all([username, password]):
            return jsonify({"error": "Username and password are required"}), 400
        
        users = load_users()
        
        if username not in users:
            return jsonify({"error": "Invalid credentials"}), 401
        
        user = users[username]
        
        # Check password
        if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            return jsonify({"error": "Invalid credentials"}), 401
        
        # Create access token
        access_token = create_access_token(identity=username)
        
        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user": {
                "username": username,
                "email": user['email']
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    try:
        username = get_jwt_identity()
        users = load_users()
        
        if username not in users:
            return jsonify({"error": "User not found"}), 404
        
        user = users[username]
        return jsonify({
            "username": user['username'],
            "email": user['email'],
            "profile": user['profile']
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    try:
        username = get_jwt_identity()
        data = request.get_json()
        
        users = load_users()
        
        if username not in users:
            return jsonify({"error": "User not found"}), 404
        
        # Update profile data
        if 'name' in data:
            users[username]['profile']['name'] = data['name']
        if 'bio' in data:
            users[username]['profile']['bio'] = data['bio']
        if 'skills' in data:
            users[username]['profile']['skills'] = data['skills']
        
        save_users(users)
        
        return jsonify({
            "message": "Profile updated successfully",
            "profile": users[username]['profile']
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route("/verify", methods=["GET"])
@jwt_required()
def verify_token():
    try:
        username = get_jwt_identity()
        return jsonify({
            "valid": True,
            "username": username
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401
