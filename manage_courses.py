#!/usr/bin/env python3
"""
manage_courses.py

Simple CLI to add courses and lessons to backend/flaskr/data.

Usage:
  python manage_courses.py --add --title "Course Title" --lessons 12 --videos video1.mp4,video2.mp4

If run without flags, interactive prompts will run.
"""
import os
import json
import argparse
from datetime import datetime

ROOT = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(ROOT, 'backend', 'flaskr', 'data')
os.makedirs(DATA_DIR, exist_ok=True)

COURSES_FILE = os.path.join(DATA_DIR, 'courses.json')

def load_courses():
    if os.path.exists(COURSES_FILE):
        with open(COURSES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_courses(courses):
    with open(COURSES_FILE, 'w', encoding='utf-8') as f:
        json.dump(courses, f, indent=2)

def next_id(courses):
    if not courses:
        return 1
    return max(c['id'] for c in courses) + 1

def add_course(title, description, lessons, videos, level='Beginner'):
    courses = load_courses()
    cid = next_id(courses)
    course = {
        'id': cid,
        'title': title,
        'description': description,
        'lessons': lessons,
        'videos': videos,
        'level': level,
        'created_at': datetime.utcnow().isoformat() + 'Z'
    }
    courses.append(course)
    save_courses(courses)

    # create a lessons file
    lessons_file = os.path.join(DATA_DIR, f'lessons_{cid}.json')
    lessons_payload = [{'lesson_id': i+1, 'title': f'Lesson {i+1}', 'video': (videos[i] if i < len(videos) else '')} for i in range(lessons)]
    with open(lessons_file, 'w', encoding='utf-8') as f:
        json.dump(lessons_payload, f, indent=2)

    print(f"Added course {cid}: {title}")
    print(f"Lessons file created: {lessons_file}")

def interactive():
    title = input('Course title: ').strip()
    description = input('Short description: ').strip()
    lessons = int(input('Number of lessons: ').strip() or '0')
    videos_input = input('Comma-separated video filenames (optional): ').strip()
    videos = [v.strip() for v in videos_input.split(',')] if videos_input else []
    level = input('Level (Beginner/Intermediate/Advanced) [Beginner]: ').strip() or 'Beginner'
    add_course(title, description, lessons, videos, level)

def main():
    parser = argparse.ArgumentParser(description='Manage courses for the learning backend')
    parser.add_argument('--add', action='store_true', help='Add a new course')
    parser.add_argument('--title', type=str, help='Course title')
    parser.add_argument('--description', type=str, default='', help='Short description')
    parser.add_argument('--lessons', type=int, default=0, help='Number of lessons')
    parser.add_argument('--videos', type=str, help='Comma separated video filenames')
    parser.add_argument('--level', type=str, default='Beginner', help='Course level')

    args = parser.parse_args()

    if args.add:
        videos = [v.strip() for v in args.videos.split(',')] if args.videos else []
        add_course(args.title or 'Untitled Course', args.description, args.lessons, videos, args.level)
    else:
        interactive()

if __name__ == '__main__':
    main()
