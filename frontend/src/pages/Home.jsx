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
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-900">
                <div className="relative">
                    <div className="animate-spin rounded-full h-32 w-32 border-4 border-primary-200 dark:border-primary-800"></div>
                    <div className="animate-spin rounded-full h-32 w-32 border-4 border-primary-500 border-t-transparent absolute top-0 left-0"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 text-white py-32">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 animate-gradient"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-3xl animate-blob"></div>
                    <div className="absolute top-32 right-20 w-20 h-20 bg-white/10 rounded-3xl animate-blob" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-accent-500/20 rounded-2xl animate-float"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="animate-fade-in-up">
                        <h1 className="text-7xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-accent-100 bg-clip-text text-transparent">
                            Software Engineer
                        </h1>
                        <p className="text-2xl md:text-3xl mb-12 max-w-5xl mx-auto text-blue-100 leading-relaxed font-light">
                            Building scalable and efficient web applications with modern technologies
                        </p>
                    </div>

                    <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/about-me"
                                className="group bg-gradient-to-r from-emerald-500/20 to-orange-500/20 backdrop-blur-xl text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-500/30 hover:to-orange-500/30 transition-all duration-500 hover:scale-105 active:scale-95 border border-emerald-400/30 hover:border-emerald-400/50 shadow-lg hover:shadow-xl"
                            >
                                <span className="flex items-center space-x-2">
                                    <span>Learn More</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </Link>
                            <Link
                                to="/contact"
                                className="group bg-gradient-to-r from-rose-500/20 to-indigo-500/20 backdrop-blur-xl text-white px-8 py-3 rounded-xl font-semibold hover:from-rose-500/30 hover:to-indigo-500/30 transition-all duration-500 hover:scale-105 active:scale-95 border border-rose-400/30 hover:border-rose-400/50 shadow-lg hover:shadow-xl"
                            >
                                <span className="flex items-center space-x-2">
                                    <span>Get In Touch</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Preview Section */}
            <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-dark-800 dark:to-dark-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-fade-in-up">
                        <h2 className="text-6xl font-bold text-center mb-20 text-gray-900 dark:text-white">
                            About Me
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="animate-slide-in-left">
                            <h3 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
                                {about?.name || "Ali JAMIL"}
                            </h3>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                                {about?.description || "I am a passionate software engineer with expertise in modern web technologies. I love building scalable applications and solving complex problems through code."}
                            </p>

                            <div className="mb-10">
                                <h4 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Programming Languages</h4>
                                <div className="flex flex-wrap gap-4">
                                    {(about?.skills?.programming_languages || ["Python", "JavaScript", "TypeScript", "React", "Node.js"]).slice(0, 5).map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 text-primary-800 dark:text-primary-300 px-6 py-3 rounded-2xl text-sm font-semibold hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    <span className="bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg">
                                        +5 more
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    to="/about-me"
                                    className="group bg-gradient-to-r from-emerald-500 to-orange-500 hover:from-emerald-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl inline-flex items-center justify-center space-x-2"
                                >
                                    <span>View Full Profile</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <Link
                                    to="/contact"
                                    className="group border-2 border-rose-500 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-500 hover:scale-105 active:scale-95 inline-flex items-center justify-center space-x-2"
                                >
                                    <span>Get In Touch</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="animate-slide-in-right">
                            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-dark-700 dark:to-dark-800 p-10 rounded-3xl shadow-cursor-xl border border-gray-200 dark:border-dark-600">
                                <h4 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Quick Stats</h4>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl shadow-lg">
                                        <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">Experience</span>
                                        <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">4+ Years</span>
                                    </div>
                                    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-2xl shadow-lg">
                                        <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">Projects</span>
                                        <span className="text-3xl font-bold text-accent-600 dark:text-accent-400">20+</span>
                                    </div>
                                    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl shadow-lg">
                                        <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">Technologies</span>
                                        <span className="text-3xl font-bold text-green-600 dark:text-green-400">15+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="py-20 bg-gray-50 dark:bg-dark-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-fade-in-up">
                        <h2 className="text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                            Featured Projects
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className="group bg-white dark:bg-dark-700 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-dark-600 animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                                        {project.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-sm font-medium">
                                            +{project.technologies.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="flex space-x-4">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/link flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 text-sm font-medium transition-colors duration-300"
                                        >
                                            <svg className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            <span>GitHub</span>
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/link flex items-center space-x-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium transition-colors duration-300"
                                        >
                                            <svg className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            <span>Demo</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12 animate-fade-in-up">
                        <Link
                            to="/about-me"
                            className="group bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
                        >
                            <span>View All Projects</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-purple-600 dark:from-dark-800 dark:via-dark-900 dark:to-purple-900 text-white relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-purple-600/20 animate-gradient"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-float"></div>
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="animate-fade-in-up">
                        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                            Ready to Work Together?
                        </h2>
                        <p className="text-xl mb-10 text-blue-100 leading-relaxed">
                            Let's discuss your next project and bring your ideas to life
                        </p>
                        <Link
                            to="/contact"
                            className="group bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 hover:border-white/40 inline-flex items-center space-x-3"
                        >
                            <span>Start a Conversation</span>
                            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
