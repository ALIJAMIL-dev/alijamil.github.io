
from flask import Flask, send_from_directory, send_file
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os

def create_app():
    # Get the absolute path to the frontend dist folder
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # Go up from backend/flaskr to backend, then up to root, then into frontend/dist
    frontend_dist = os.path.join(current_dir, '..', '..', 'frontend', 'dist')
    frontend_dist = os.path.abspath(frontend_dist)
    
    app = Flask(__name__, static_folder=frontend_dist, static_url_path='/static')
    
    # Configure JWT
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  # Tokens don't expire for simplicity
    
    # Enable CORS for all routes
    CORS(app, origins=['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173', 'http://localhost:5000', 'http://127.0.0.1:5000'])
    
    # Initialize JWT
    jwt = JWTManager(app)

    # Register API routes
    from .api import api_bp
    from .auth import auth_bp
    from .portfolio import portfolio_bp
    from .learning import learning_bp
    
    app.register_blueprint(api_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(portfolio_bp, url_prefix="/api/portfolio")
    app.register_blueprint(learning_bp, url_prefix="/api/learning")

    # Serve React app
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_react_app(path):
        print(f"Requested path: '{path}'")
        print(f"Static folder: {app.static_folder}")
        print(f"Static folder exists: {os.path.exists(app.static_folder)}")
        
        if os.path.exists(app.static_folder):
            if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
                print(f"Serving file: {path}")
                return send_from_directory(app.static_folder, path)
            else:
                print("Serving index.html")
                return send_from_directory(app.static_folder, 'index.html')
        else:
            return f"Static folder not found: {app.static_folder}", 404

    return app
