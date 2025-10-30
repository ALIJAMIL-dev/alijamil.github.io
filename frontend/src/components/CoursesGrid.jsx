import React from 'react'

const CoursesGrid = ({ courses = [] }) => {
  return (
    <div className="courses-grid">
      {courses.map((c) => (
        <div key={c.id} className="course-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{c.title}</h3>
            <span className="course-badge">{c.level || 'Beginner'}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{c.description}</p>
          <div className="flex items-center justify-between">
            <button className="edu-cta">Start Course</button>
            <span className="text-sm text-gray-500">{c.lessons} lessons</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CoursesGrid
