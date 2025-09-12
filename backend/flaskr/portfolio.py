from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
import os

portfolio_bp = Blueprint("portfolio", __name__)

# Portfolio data
PORTFOLIO_DATA = {
    "about": {
        "name": "Ali JAMIL",
        "title": "Software Engineer",
        "description": "I am a software engineer with a passion for building scalable and efficient web applications. I have experience in various programming languages and frameworks, and I am always eager to learn new technologies.",
        "skills": {
            "programming_languages": ["Python", ".NET", "C#", "Java", "JavaScript", "TypeScript", "HTML & CSS"],
            "frameworks": ["React JS", "Node.js", "Django", "Tailwind CSS", "Flask", "Express.js"]
        },
        "experience": [
            {
                "company": "Tech Solutions Inc.",
                "position": "Senior Software Engineer",
                "duration": "2022 - Present",
                "description": "Leading development of web applications using React and Node.js"
            },
            {
                "company": "StartupXYZ",
                "position": "Full Stack Developer",
                "duration": "2020 - 2022",
                "description": "Developed full-stack applications using Python, Django, and React"
            }
        ],
        "education": [
            {
                "degree": "Bachelor of Computer Science",
                "university": "University of Technology",
                "year": "2016 - 2020"
            }
        ]
    },
    "projects": [
        {
            "id": 1,
            "name": "Personal Portfolio Website",
            "description": "A modern, responsive portfolio website built with React and Flask, featuring dynamic content management and user authentication.",
            "technologies": ["React", "Flask", "Tailwind CSS", "Python", "JWT"],
            "image": "/images/portfolio-project.jpg",
            "github": "https://github.com/alijamil/portfolio",
            "demo": "https://alijamil.github.io",
            "featured": True
        },
        {
            "id": 2,
            "name": "E-commerce Platform",
            "description": "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
            "technologies": ["React", "Node.js", "MongoDB", "Stripe", "Express.js"],
            "image": "/images/ecommerce-project.jpg",
            "github": "https://github.com/alijamil/ecommerce",
            "demo": "https://ecommerce-demo.com",
            "featured": True
        },
        {
            "id": 3,
            "name": "Task Management App",
            "description": "Collaborative task management application with real-time updates and team collaboration features.",
            "technologies": ["Vue.js", "Python", "PostgreSQL", "WebSocket"],
            "image": "/images/taskapp-project.jpg",
            "github": "https://github.com/alijamil/taskapp",
            "demo": "https://taskapp-demo.com",
            "featured": False
        },
        {
            "id": 4,
            "name": "Weather Dashboard",
            "description": "Real-time weather dashboard with location-based forecasts and interactive charts.",
            "technologies": ["React", "D3.js", "OpenWeather API", "CSS3"],
            "image": "/images/weather-project.jpg",
            "github": "https://github.com/alijamil/weather-dashboard",
            "demo": "https://weather-demo.com",
            "featured": False
        }
    ],
    "contact": {
        "email": "ali.jamil@example.com",
        "phone": "+1 (555) 123-4567",
        "location": "New York, NY",
        "social": {
            "github": "https://github.com/alijamil",
            "linkedin": "https://linkedin.com/in/alijamil",
            "twitter": "https://twitter.com/alijamil",
            "email": "mailto:ali.jamil@example.com"
        }
    }
}

@portfolio_bp.route("/about", methods=["GET"])
def get_about():
    """Get portfolio about information"""
    return jsonify(PORTFOLIO_DATA["about"]), 200

@portfolio_bp.route("/projects", methods=["GET"])
def get_projects():
    """Get all projects"""
    featured = request.args.get('featured', 'false').lower() == 'true'
    
    if featured:
        projects = [p for p in PORTFOLIO_DATA["projects"] if p.get("featured", False)]
    else:
        projects = PORTFOLIO_DATA["projects"]
    
    return jsonify({"projects": projects}), 200

@portfolio_bp.route("/projects/<int:project_id>", methods=["GET"])
def get_project(project_id):
    """Get specific project by ID"""
    project = next((p for p in PORTFOLIO_DATA["projects"] if p["id"] == project_id), None)
    
    if not project:
        return jsonify({"error": "Project not found"}), 404
    
    return jsonify(project), 200

@portfolio_bp.route("/contact", methods=["GET"])
def get_contact():
    """Get contact information"""
    return jsonify(PORTFOLIO_DATA["contact"]), 200

@portfolio_bp.route("/contact", methods=["POST"])
def send_contact_message():
    """Send contact message"""
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        if not all([name, email, message]):
            return jsonify({"error": "All fields are required"}), 400
        
        # In a real application, you would save this to a database or send an email
        # For now, we'll just return a success message
        
        return jsonify({
            "message": "Thank you for your message! I'll get back to you soon.",
            "status": "success"
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@portfolio_bp.route("/skills", methods=["GET"])
def get_skills():
    """Get skills information"""
    return jsonify(PORTFOLIO_DATA["about"]["skills"]), 200

@portfolio_bp.route("/experience", methods=["GET"])
def get_experience():
    """Get work experience"""
    return jsonify({"experience": PORTFOLIO_DATA["about"]["experience"]}), 200

@portfolio_bp.route("/education", methods=["GET"])
def get_education():
    """Get education information"""
    return jsonify({"education": PORTFOLIO_DATA["about"]["education"]}), 200
