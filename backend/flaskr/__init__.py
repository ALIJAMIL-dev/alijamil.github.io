
from flask import Flask, send_from_directory
from flask_cors import CORS


def create_app():
    app = Flask(
        __name__,
        static_folder='./frontend/src',  # Serve static files from frontend/src
        static_url_path='/static'
    )
    CORS(app)


    # Register API routes
    from .api import api_bp
    app.register_blueprint(api_bp, url_prefix="/api")

    return app
