import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const [about, setAbout] = useState(null)
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [aboutResponse, projectsResponse] = await Promise.all([
                axios.get('/api/portfolio/about'),
                axios.get('/api/portfolio/projects?featured=true')
            ])

            setAbout(aboutResponse.data)
            setProjects(projectsResponse.data.projects)
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
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-4">Software Engineer</h1>
                    <p className="text-xl mb-8 max-w-3xl mx-auto">
                        Building scalable and efficient web applications with modern technologies
                    </p>
                    <div className="space-x-4">
                        <Link
                            to="/about-me"
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                        >
                            Learn More
                        </Link>
                        <Link
                            to="/contact"
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-block"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Preview Section */}
            {about && (
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">{about.name}</h3>
                                <p className="text-lg text-gray-600 mb-6">{about.description}</p>

                                <div className="mb-6">
                                    <h4 className="text-xl font-semibold mb-3">Programming Languages</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {about.skills.programming_languages.slice(0, 5).map((skill, index) => (
                                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                        {about.skills.programming_languages.length > 5 && (
                                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                                                +{about.skills.programming_languages.length - 5} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <Link
                                    to="/about-me"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                                >
                                    View Full Profile
                                </Link>
                            </div>
                            <div className="bg-gray-100 p-8 rounded-lg">
                                <h4 className="text-xl font-semibold mb-4">Quick Stats</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Experience</span>
                                        <span className="font-semibold">4+ Years</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Projects</span>
                                        <span className="font-semibold">20+</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Technologies</span>
                                        <span className="font-semibold">15+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Projects Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div key={project.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold mb-3">{project.name}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.slice(0, 3).map((tech, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                            +{project.technologies.length - 3}
                                        </span>
                                    )}
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
                    <div className="text-center mt-8">
                        <Link
                            to="/about-me"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                        >
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Work Together?</h2>
                    <p className="text-xl mb-8">
                        Let's discuss your next project and bring your ideas to life
                    </p>
                    <Link
                        to="/contact"
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                    >
                        Start a Conversation
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Home
