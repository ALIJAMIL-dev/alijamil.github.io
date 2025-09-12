import { useState, useEffect } from 'react'
import axios from 'axios'

const AboutMe = () => {
    const [about, setAbout] = useState(null)
    const [projects, setProjects] = useState([])
    const [experience, setExperience] = useState([])
    const [education, setEducation] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [aboutResponse, projectsResponse, experienceResponse, educationResponse] = await Promise.all([
                axios.get('/api/portfolio/about'),
                axios.get('/api/portfolio/projects'),
                axios.get('/api/portfolio/experience'),
                axios.get('/api/portfolio/education')
            ])

            setAbout(aboutResponse.data)
            setProjects(projectsResponse.data.projects)
            setExperience(experienceResponse.data.experience)
            setEducation(educationResponse.data.education)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {about && (
                    <>
                        {/* Header Section */}
                        <div className="text-center mb-16">
                            <h1 className="text-5xl font-bold text-gray-900 mb-4">{about.name}</h1>
                            <h2 className="text-2xl text-gray-600 mb-6">{about.title}</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                {about.description}
                            </p>
                        </div>

                        {/* Skills Section */}
                        <section className="mb-16">
                            <h3 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h3>

                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-2xl font-semibold mb-6">Programming Languages</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {about.skills.programming_languages.map((skill, index) => (
                                            <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-2xl font-semibold mb-6">Frameworks & Libraries</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {about.skills.frameworks.map((skill, index) => (
                                            <span key={index} className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Experience Section */}
                        <section className="mb-16">
                            <h3 className="text-3xl font-bold text-center mb-12">Work Experience</h3>
                            <div className="space-y-8">
                                {experience.map((exp, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-xl font-semibold text-gray-900">{exp.position}</h4>
                                                <p className="text-lg text-blue-600">{exp.company}</p>
                                            </div>
                                            <span className="text-gray-500 font-medium">{exp.duration}</span>
                                        </div>
                                        <p className="text-gray-600">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education Section */}
                        <section className="mb-16">
                            <h3 className="text-3xl font-bold text-center mb-12">Education</h3>
                            <div className="space-y-6">
                                {education.map((edu, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-xl font-semibold text-gray-900">{edu.degree}</h4>
                                                <p className="text-lg text-blue-600">{edu.university}</p>
                                            </div>
                                            <span className="text-gray-500 font-medium">{edu.year}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Projects Section */}
                        <section className="mb-16">
                            <h3 className="text-3xl font-bold text-center mb-12">Featured Projects</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.filter(p => p.featured).map((project) => (
                                    <div key={project.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                        <h4 className="text-xl font-semibold mb-3">{project.name}</h4>
                                        <p className="text-gray-600 mb-4">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.map((tech, index) => (
                                                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex space-x-2">
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    GitHub
                                                </a>
                                            )}
                                            {project.demo && (
                                                <a
                                                    href={project.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-green-600 hover:text-green-800 text-sm"
                                                >
                                                    Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Contact CTA */}
                        <section className="text-center bg-gray-50 rounded-lg p-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">Let's Work Together</h3>
                            <p className="text-lg text-gray-600 mb-8">
                                I'm always interested in new opportunities and exciting projects.
                            </p>
                            <a
                                href="/contact"
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                            >
                                Get In Touch
                            </a>
                        </section>
                    </>
                )}
            </div>
        </div>
    )
}

export default AboutMe
