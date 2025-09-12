import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useState } from 'react'

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth()
    const { isDark, toggleTheme } = useTheme()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/')
        setIsMenuOpen(false)
    }

    return (
        <nav className="bg-white/90 dark:bg-dark-900/90 backdrop-blur-xl shadow-cursor sticky top-0 z-50 border-b border-gray-200/30 dark:border-dark-700/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 group-hover:rotate-2">
                                <img src="/logo.svg" alt="Ali JAMIL Logo" className="w-6 h-6" />
                            </div>
                            <div className="absolute inset-0 bg-emerald-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"></div>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                            Ali JAMIL
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link to="/" className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300 font-medium group">
                            <span className="relative z-10">Home</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-orange-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                        <Link to="/about-me" className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-300 font-medium group">
                            <span className="relative z-10">About Me</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                        <Link to="/contact" className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 font-medium group">
                            <span className="relative z-10">Contact</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gradient-to-r from-orange-100 to-rose-100 dark:from-orange-900/20 dark:to-rose-900/20 hover:from-orange-200 hover:to-rose-200 dark:hover:from-orange-900/30 dark:hover:to-rose-900/30 transition-all duration-300 group hover:scale-105 active:scale-95 border border-orange-200 dark:border-orange-800"
                        >
                            {isDark ? (
                                <svg className="w-4 h-4 text-orange-500 group-hover:rotate-180 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 text-rose-500 group-hover:rotate-180 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                <Link to="/me" className="px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 font-medium group">
                                    <span className="relative z-10">Dashboard</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Link>
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 font-medium">
                                        <span>Learn</span>
                                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-dark-800/95 backdrop-blur-xl rounded-2xl shadow-cursor-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-200/50 dark:border-dark-700/50">
                                        <div className="py-3">
                                            <Link to="/me/learn/tutorials" className="block px-6 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 rounded-xl mx-2">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                                    <span>Tutorials</span>
                                                </div>
                                            </Link>
                                            <Link to="/me/learn/courses" className="block px-6 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 rounded-xl mx-2">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                                                    <span>Courses</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 pl-4 border-l border-gray-200 dark:border-dark-700">
                                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Welcome, {user?.username}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-xl transition-all duration-300 text-sm font-medium hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link to="/login" className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300 font-medium group">
                                    <span className="relative z-10">Login</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-orange-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Link>
                                <Link to="/register" className="bg-gradient-to-r from-rose-500 to-indigo-500 hover:from-rose-600 hover:to-indigo-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-3">
                        {/* Theme Toggle for Mobile */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gradient-to-r from-orange-100 to-rose-100 dark:from-orange-900/20 dark:to-rose-900/20 hover:from-orange-200 hover:to-rose-200 dark:hover:from-orange-900/30 dark:hover:to-rose-900/30 transition-all duration-300 hover:scale-105 active:scale-95 border border-orange-200 dark:border-orange-800"
                        >
                            {isDark ? (
                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:outline-none transition-all duration-300 hover:scale-110 active:scale-95"
                        >
                            <svg className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                    <div className="px-4 pt-4 pb-6 space-y-2 bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl border-t border-gray-200/30 dark:border-dark-700/30">
                        <Link
                            to="/"
                            className="block px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all duration-300 group"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-primary-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                                <span>Home</span>
                            </div>
                        </Link>
                        <Link
                            to="/about-me"
                            className="block px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all duration-300 group"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-accent-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                                <span>About Me</span>
                            </div>
                        </Link>
                        <Link
                            to="/contact"
                            className="block px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all duration-300 group"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                                <span>Contact</span>
                            </div>
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <div className="border-t border-gray-200 dark:border-dark-700 my-4"></div>
                                <Link
                                    to="/me"
                                    className="block px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all duration-300 group"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                                        <span>Dashboard</span>
                                    </div>
                                </Link>
                                <Link
                                    to="/me/learn/tutorials"
                                    className="block px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all duration-300 group"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                                        <span>Tutorials</span>
                                    </div>
                                </Link>
                                <Link
                                    to="/me/learn/courses"
                                    className="block px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all duration-300 group"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                                        <span>Courses</span>
                                    </div>
                                </Link>
                                <div className="border-t border-gray-200 dark:border-dark-700 my-4"></div>
                                <div className="px-4 py-3 bg-gray-50 dark:bg-dark-800 rounded-xl">
                                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Welcome, {user?.username}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-red-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                                        <span>Logout</span>
                                    </div>
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="border-t border-gray-200 dark:border-dark-700 my-4"></div>
                                <Link
                                    to="/login"
                                    className="block px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all duration-300 group"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                                        <span>Login</span>
                                    </div>
                                </Link>
                                <Link
                                    to="/register"
                                    className="block px-4 py-3 text-base font-semibold bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-cursor-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <span>Register</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
