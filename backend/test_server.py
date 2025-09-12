#!/usr/bin/env python3

import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from flaskr import create_app
    print("✓ Successfully imported create_app")
    
    app = create_app()
    print("✓ Successfully created app")
    
    print("Available routes:")
    for rule in app.url_map.iter_rules():
        print(f"  {rule.rule} -> {rule.endpoint}")
    
    print("\nStarting Flask server...")
    print("Server will be available at: http://127.0.0.1:5000")
    print("API endpoints:")
    print("  GET  http://127.0.0.1:5000/api/hello")
    print("  GET  http://127.0.0.1:5000/api/about")
    print("  GET  http://127.0.0.1:5000/api/projects")
    print("  POST http://127.0.0.1:5000/api/contact")
    print("\nPress Ctrl+C to stop the server")
    
    app.run(debug=True, port=5000, host='127.0.0.1', use_reloader=False)
    
except Exception as e:
    print(f"✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
