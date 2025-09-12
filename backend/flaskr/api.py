from flask import Blueprint, jsonify, request

api_bp = Blueprint("api", __name__)

# Health check endpoint
@api_bp.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "message": "API is running successfully",
        "version": "1.0.0"
    }), 200

# General API info
@api_bp.route("/info", methods=["GET"])
def info():
    return jsonify({
        "name": "Ali JAMIL Portfolio API",
        "version": "1.0.0",
        "description": "Backend API for portfolio website with authentication and learning management",
        "endpoints": {
            "auth": "/api/auth",
            "portfolio": "/api/portfolio", 
            "learning": "/api/learning"
        }
    }), 200