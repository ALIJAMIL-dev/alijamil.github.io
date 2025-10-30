#!/usr/bin/env python3
"""
tools/manage_courses_gui.py

Tkinter GUI to add/edit courses for the learning backend.
Run: python tools\manage_courses_gui.py
"""
import os
import json
import tkinter as tk
from tkinter import messagebox, ttk
from datetime import datetime

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DATA_DIR = os.path.join(REPO_ROOT, 'backend', 'flaskr', 'data')
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

def create_lessons_file(course_id, lessons, videos):
    lessons_file = os.path.join(DATA_DIR, f'lessons_{course_id}.json')
    lessons_payload = []
    for i in range(lessons):
        lessons_payload.append({
            'lesson_id': i+1,
            'title': f'Lesson {i+1}',
            'video': videos[i] if i < len(videos) else ''
        })
    with open(lessons_file, 'w', encoding='utf-8') as f:
        json.dump(lessons_payload, f, indent=2)
    return lessons_file

class CourseManagerGUI(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title('Course Manager')
        self.geometry('700x500')
        self.resizable(False, False)

        self.create_widgets()
        self.refresh_course_list()

    def create_widgets(self):
        frm = ttk.Frame(self, padding=12)
        frm.pack(fill='both', expand=True)

        left = ttk.Frame(frm)
        left.grid(row=0, column=0, sticky='nsew', padx=(0,12))

        ttk.Label(left, text='Title:').grid(row=0, column=0, sticky='w')
        self.title_var = tk.StringVar()
        ttk.Entry(left, textvariable=self.title_var, width=50).grid(row=1, column=0, pady=6)

        ttk.Label(left, text='Description:').grid(row=2, column=0, sticky='w')
        self.desc_txt = tk.Text(left, height=4, width=50)
        self.desc_txt.grid(row=3, column=0, pady=6)

        ttk.Label(left, text='Lessons (number):').grid(row=4, column=0, sticky='w')
        self.lessons_var = tk.IntVar(value=5)
        ttk.Entry(left, textvariable=self.lessons_var, width=10).grid(row=5, column=0, sticky='w', pady=6)

        ttk.Label(left, text='Videos (comma separated filenames):').grid(row=6, column=0, sticky='w')
        self.videos_var = tk.StringVar()
        ttk.Entry(left, textvariable=self.videos_var, width=50).grid(row=7, column=0, pady=6)

        ttk.Label(left, text='Level:').grid(row=8, column=0, sticky='w')
        self.level_var = tk.StringVar(value='Beginner')
        ttk.Combobox(left, textvariable=self.level_var, values=['Beginner','Intermediate','Advanced'], width=20).grid(row=9, column=0, sticky='w', pady=6)

        btn_frame = ttk.Frame(left)
        btn_frame.grid(row=10, column=0, pady=12, sticky='w')
        ttk.Button(btn_frame, text='Add Course', command=self.add_course).grid(row=0, column=0, padx=6)
        ttk.Button(btn_frame, text='Clear', command=self.clear_form).grid(row=0, column=1, padx=6)

        right = ttk.Frame(frm)
        right.grid(row=0, column=1, sticky='ns')

        ttk.Label(right, text='Existing Courses:').pack(anchor='w')
        self.courses_list = tk.Listbox(right, width=40, height=20)
        self.courses_list.pack(pady=6)
        ttk.Button(right, text='Reload', command=self.refresh_course_list).pack(pady=6)

    def add_course(self):
        title = self.title_var.get().strip()
        description = self.desc_txt.get('1.0', 'end').strip()
        lessons = int(self.lessons_var.get())
        videos = [v.strip() for v in self.videos_var.get().split(',') if v.strip()]
        level = self.level_var.get()

        if not title:
            messagebox.showerror('Error', 'Title is required')
            return

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

        lessons_file = create_lessons_file(cid, lessons, videos)

        messagebox.showinfo('Success', f'Course added (id={cid})\nLessons file: {lessons_file}')
        self.refresh_course_list()
        self.clear_form()

    def refresh_course_list(self):
        courses = load_courses()
        self.courses_list.delete(0, 'end')
        for c in courses:
            self.courses_list.insert('end', f"{c['id']}: {c['title']} ({c.get('lessons',0)} lessons)")

    def clear_form(self):
        self.title_var.set('')
        self.desc_txt.delete('1.0', 'end')
        self.lessons_var.set(5)
        self.videos_var.set('')
        self.level_var.set('Beginner')

def main():
    app = CourseManagerGUI()
    app.mainloop()

if __name__ == '__main__':
    main()
