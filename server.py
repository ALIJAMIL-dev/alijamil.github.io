#!/usr/bin/env python3

import sys
import os

# Add the backend directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backend'))

try:
    print("\n" + "="*60)
    print("🚀 ALI JAMIL PORTFOLIO WEBSITE")
    print("="*60)
    print("📱 Frontend: React with Tailwind CSS")
    print("🔧 Backend: Flask with JWT Authentication")
    print("📚 Features: Portfolio, Learning Management, User Auth")
    print("="*60)
    print("\n🌐 Website will be available at:")
    print("   • http://127.0.0.1:5000")
    print("   • http://localhost:5000")
    print("\n📋 Available Pages:")
    print("   • / - Home page")
    print("   • /about-me - About page")
    print("   • /contact - Contact page")
    print("   • /login - Login page")
    print("   • /register - Register page")
    print("   • /me - User dashboard (requires login)")
    print("   • /me/learn/tutorials - Tutorials (requires login)")
    print("   • /me/learn/courses - Courses (requires login)")
    print("\n🔗 API Endpoints:")
    print("   • /api/health - Health check")
    print("   • /api/portfolio/* - Portfolio data")
    print("   • /api/auth/* - Authentication")
    print("   • /api/learning/* - Learning content")
    print("\n" + "="*60)
    print("Press Ctrl+C to stop the server")
    print("="*60 + "\n")
    
except Exception as e:
    print(f"✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
