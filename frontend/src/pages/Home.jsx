import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CoursesGrid from '../components/CoursesGrid'

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
                                className="group course-card animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.name}</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{project.description}</p>
                                <div className="flex items-center justify-between">
                                    <button className="edu-cta">View Project</button>
                                    <span className="text-sm text-gray-500">{project.technologies.length} tech</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Courses preview - education style */}
                    <div className="mt-16">
                        <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Learn with Courses</h2>
                        <CoursesGrid courses={[
                            { id: 1, title: 'Intro to Web', description: 'HTML, CSS, JS foundations', lessons: 12, level: 'Beginner' },
                            { id: 2, title: 'React Basics', description: 'Components, state, hooks', lessons: 18, level: 'Beginner' },
                            { id: 3, title: 'Backend APIs', description: 'Build REST APIs with Flask', lessons: 16, level: 'Intermediate' },
                        ]} />
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
