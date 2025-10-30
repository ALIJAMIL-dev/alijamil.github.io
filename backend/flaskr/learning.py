from flask import Blueprint, jsonify, request, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
import json

learning_bp = Blueprint('learning', __name__)

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
os.makedirs(DATA_DIR, exist_ok=True)

COURSES_FILE = os.path.join(DATA_DIR, 'courses.json')
PROGRESS_FILE = os.path.join(DATA_DIR, 'progress.json')

def load_json(path, default):
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return default

def save_json(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

# Seed sample courses if not present
if not os.path.exists(COURSES_FILE):
    sample_courses = [
        {"id": 1, "title": "Intro to Web", "description": "HTML, CSS, JS foundations", "lessons": 12},
        {"id": 2, "title": "React Basics", "description": "Components, state, hooks", "lessons": 18},
        {"id": 3, "title": "APIs with Flask", "description": "Build REST APIs with Flask", "lessons": 16}
    ]
    save_json(COURSES_FILE, sample_courses)

@learning_bp.route('/courses', methods=['GET'])
def list_courses():
    courses = load_json(COURSES_FILE, [])
    return jsonify({"courses": courses})

@learning_bp.route('/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    courses = load_json(COURSES_FILE, [])
    for c in courses:
        if c['id'] == course_id:
            return jsonify(c)
    return jsonify({"error": "Course not found"}), 404

@learning_bp.route('/enroll', methods=['POST'])
@jwt_required()
def enroll():
    username = get_jwt_identity()
    data = request.get_json() or {}
    course_id = data.get('course_id')
    if not course_id:
        return jsonify({"error": "course_id required"}), 400

    progress = load_json(PROGRESS_FILE, {})
    user_prog = progress.get(username, [])
    if course_id in user_prog:
        return jsonify({"message": "Already enrolled"}), 200
    user_prog.append(course_id)
    progress[username] = user_prog
    save_json(PROGRESS_FILE, progress)
    return jsonify({"message": "Enrolled", "course_id": course_id}), 201

@learning_bp.route('/progress', methods=['GET'])
@jwt_required()
def get_progress():
    username = get_jwt_identity()
    progress = load_json(PROGRESS_FILE, {})
    return jsonify({"username": username, "enrolled": progress.get(username, [])})
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import json
import os

learning_bp = Blueprint("learning", __name__)

# Learning content data
LEARNING_DATA = {
    "tutorials": [
        {
            "id": 1,
            "title": "Getting Started with React",
            "description": "Learn the fundamentals of React including components, state, and props.",
            "duration": "2 hours",
            "difficulty": "Beginner",
            "category": "Frontend",
            "tags": ["React", "JavaScript", "Frontend"],
            "content": {
                "sections": [
                    {
                        "title": "Introduction to React",
                        "content": "React is a JavaScript library for building user interfaces..."
                    },
                    {
                        "title": "Components and JSX",
                        "content": "Components are the building blocks of React applications..."
                    },
                    {
                        "title": "State and Props",
                        "content": "State allows components to manage their own data..."
                    }
                ]
            },
            "video_url": "https://example.com/react-tutorial",
            "resources": [
                "React Documentation",
                "Code Examples",
                "Practice Exercises"
            ],
            "created_at": "2024-01-15",
            "updated_at": "2024-01-20"
        },
        {
            "id": 2,
            "title": "Python Flask API Development",
            "description": "Build RESTful APIs with Python Flask framework.",
            "duration": "3 hours",
            "difficulty": "Intermediate",
            "category": "Backend",
            "tags": ["Python", "Flask", "API", "Backend"],
            "content": {
                "sections": [
                    {
                        "title": "Setting up Flask",
                        "content": "Flask is a lightweight web framework for Python..."
                    },
                    {
                        "title": "Creating Routes",
                        "content": "Routes define the endpoints of your API..."
                    },
                    {
                        "title": "Database Integration",
                        "content": "Connect your Flask app to a database..."
                    }
                ]
            },
            "video_url": "https://example.com/flask-tutorial",
            "resources": [
                "Flask Documentation",
                "API Examples",
                "Database Setup Guide"
            ],
            "created_at": "2024-01-10",
            "updated_at": "2024-01-18"
        },
        {
            "id": 3,
            "title": "Advanced JavaScript Concepts",
            "description": "Deep dive into advanced JavaScript features and patterns.",
            "duration": "4 hours",
            "difficulty": "Advanced",
            "category": "JavaScript",
            "tags": ["JavaScript", "ES6", "Async", "Advanced"],
            "content": {
                "sections": [
                    {
                        "title": "Closures and Scope",
                        "content": "Understanding JavaScript closures and lexical scoping..."
                    },
                    {
                        "title": "Promises and Async/Await",
                        "content": "Working with asynchronous JavaScript..."
                    },
                    {
                        "title": "Design Patterns",
                        "content": "Common JavaScript design patterns..."
                    }
                ]
            },
            "video_url": "https://example.com/js-advanced-tutorial",
            "resources": [
                "JavaScript MDN Docs",
                "Code Challenges",
                "Best Practices Guide"
            ],
            "created_at": "2024-01-05",
            "updated_at": "2024-01-15"
        }
    ],
    "courses": [
        {
            "id": 1,
            "title": "Full Stack Web Development",
            "description": "Complete course covering frontend and backend development with modern technologies.",
            "duration": "40 hours",
            "difficulty": "Intermediate",
            "category": "Full Stack",
            "tags": ["React", "Node.js", "MongoDB", "Full Stack"],
            "modules": [
                "HTML & CSS Fundamentals",
                "JavaScript ES6+",
                "React Development",
                "Node.js Backend",
                "Database Design",
                "Deployment & DevOps"
            ],
            "instructor": "Ali JAMIL",
            "price": 199.99,
            "rating": 4.8,
            "students": 1250,
            "created_at": "2024-01-01",
            "updated_at": "2024-01-25"
        },
        {
            "id": 2,
            "title": "Python for Data Science",
            "description": "Learn Python programming for data analysis, visualization, and machine learning.",
            "duration": "35 hours",
            "difficulty": "Intermediate",
            "category": "Data Science",
            "tags": ["Python", "Pandas", "NumPy", "Matplotlib", "Data Science"],
            "modules": [
                "Python Basics",
                "Data Manipulation with Pandas",
                "Data Visualization",
                "Statistical Analysis",
                "Machine Learning Basics",
                "Project Portfolio"
            ],
            "instructor": "Ali JAMIL",
            "price": 179.99,
            "rating": 4.9,
            "students": 980,
            "created_at": "2024-01-01",
            "updated_at": "2024-01-22"
        },
        {
            "id": 3,
            "title": "Mobile App Development with React Native",
            "description": "Build cross-platform mobile applications using React Native.",
            "duration": "30 hours",
            "difficulty": "Intermediate",
            "category": "Mobile Development",
            "tags": ["React Native", "JavaScript", "Mobile", "iOS", "Android"],
            "modules": [
                "React Native Setup",
                "Navigation",
                "State Management",
                "API Integration",
                "Native Features",
                "App Store Deployment"
            ],
            "instructor": "Ali JAMIL",
            "price": 159.99,
            "rating": 4.7,
            "students": 750,
            "created_at": "2024-01-01",
            "updated_at": "2024-01-20"
        }
    ]
}

@learning_bp.route("/tutorials", methods=["GET"])
def get_tutorials():
    """Get all tutorials with optional filtering"""
    category = request.args.get('category')
    difficulty = request.args.get('difficulty')
    search = request.args.get('search')
    
    tutorials = LEARNING_DATA["tutorials"]
    
    # Apply filters
    if category:
        tutorials = [t for t in tutorials if t['category'].lower() == category.lower()]
    
    if difficulty:
        tutorials = [t for t in tutorials if t['difficulty'].lower() == difficulty.lower()]
    
    if search:
        search_term = search.lower()
        tutorials = [t for t in tutorials if 
                    search_term in t['title'].lower() or 
                    search_term in t['description'].lower() or
                    any(search_term in tag.lower() for tag in t['tags'])]
    
    return jsonify({"tutorials": tutorials}), 200

@learning_bp.route("/tutorials/<int:tutorial_id>", methods=["GET"])
def get_tutorial(tutorial_id):
    """Get specific tutorial by ID"""
    tutorial = next((t for t in LEARNING_DATA["tutorials"] if t["id"] == tutorial_id), None)
    
    if not tutorial:
        return jsonify({"error": "Tutorial not found"}), 404
    
    return jsonify(tutorial), 200

@learning_bp.route("/courses", methods=["GET"])
def get_courses():
    """Get all courses with optional filtering"""
    category = request.args.get('category')
    difficulty = request.args.get('difficulty')
    search = request.args.get('search')
    
    courses = LEARNING_DATA["courses"]
    
    # Apply filters
    if category:
        courses = [c for c in courses if c['category'].lower() == category.lower()]
    
    if difficulty:
        courses = [c for c in courses if c['difficulty'].lower() == difficulty.lower()]
    
    if search:
        search_term = search.lower()
        courses = [c for c in courses if 
                  search_term in c['title'].lower() or 
                  search_term in c['description'].lower() or
                  any(search_term in tag.lower() for tag in c['tags'])]
    
    return jsonify({"courses": courses}), 200

@learning_bp.route("/courses/<int:course_id>", methods=["GET"])
def get_course(course_id):
    """Get specific course by ID"""
    course = next((c for c in LEARNING_DATA["courses"] if c["id"] == course_id), None)
    
    if not course:
        return jsonify({"error": "Course not found"}), 404
    
    return jsonify(course), 200

@learning_bp.route("/categories", methods=["GET"])
def get_categories():
    """Get available categories for tutorials and courses"""
    tutorial_categories = list(set(t['category'] for t in LEARNING_DATA["tutorials"]))
    course_categories = list(set(c['category'] for c in LEARNING_DATA["courses"]))
    
    return jsonify({
        "tutorial_categories": tutorial_categories,
        "course_categories": course_categories,
        "all_categories": list(set(tutorial_categories + course_categories))
    }), 200

@learning_bp.route("/enroll/<int:course_id>", methods=["POST"])
@jwt_required()
def enroll_course(course_id):
    """Enroll user in a course"""
    try:
        username = get_jwt_identity()
        course = next((c for c in LEARNING_DATA["courses"] if c["id"] == course_id), None)
        
        if not course:
            return jsonify({"error": "Course not found"}), 404
        
        # In a real application, you would save enrollment to a database
        # For now, we'll just return a success message
        
        return jsonify({
            "message": f"Successfully enrolled in {course['title']}",
            "course": course,
            "enrollment_date": "2024-01-25"
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@learning_bp.route("/progress/<int:course_id>", methods=["GET"])
@jwt_required()
def get_course_progress(course_id):
    """Get user's progress in a course"""
    try:
        username = get_jwt_identity()
        
        # In a real application, you would fetch progress from a database
        # For now, we'll return mock progress data
        
        return jsonify({
            "course_id": course_id,
            "username": username,
            "progress_percentage": 45,
            "completed_modules": 2,
            "total_modules": 6,
            "last_accessed": "2024-01-25T10:30:00Z"
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
