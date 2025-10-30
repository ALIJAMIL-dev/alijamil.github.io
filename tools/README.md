Tools for managing courses and learning content

Files:
- manage_courses.py — CLI tool to add courses (can be run non-interactively)
- manage_courses_gui.py — Tkinter GUI for adding courses and lessons

Usage:
  python tools\manage_courses.py --add --title "Intro" --lessons 10
  python tools\manage_courses_gui.py

Both tools write to `backend/flaskr/data/`.
