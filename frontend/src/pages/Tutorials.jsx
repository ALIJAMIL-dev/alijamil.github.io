import { useState, useEffect } from 'react'
import axios from 'axios'

const Tutorials = () => {
    const [tutorials, setTutorials] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        category: '',
        difficulty: '',
        search: ''
    })
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchTutorials()
        fetchCategories()
    }, [filters])

    const fetchTutorials = async () => {
        try {
            const params = new URLSearchParams()
            if (filters.category) params.append('category', filters.category)
            if (filters.difficulty) params.append('difficulty', filters.difficulty)
            if (filters.search) params.append('search', filters.search)

            const response = await axios.get(`/api/learning/tutorials?${params.toString()}`)
            setTutorials(response.data.tutorials)
        } catch (error) {
            console.error('Error fetching tutorials:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/learning/categories')
            setCategories(response.data.tutorial_categories)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'beginner':
                return 'bg-green-100 text-green-800'
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800'
            case 'advanced':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
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
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Tutorials</h1>
                    <p className="text-lg text-gray-600">
                        Learn new skills with our comprehensive tutorial collection
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search tutorials..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Difficulty
                            </label>
                            <select
                                value={filters.difficulty}
                                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Levels</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={() => setFilters({ category: '', difficulty: '', search: '' })}
                                className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tutorials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tutorials.map((tutorial) => (
                        <div key={tutorial.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                                        {tutorial.difficulty}
                                    </span>
                                    <span className="text-sm text-gray-500">{tutorial.duration}</span>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                                <p className="text-gray-600 mb-4">{tutorial.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {tutorial.tags.slice(0, 3).map((tag, index) => (
                                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                    {tutorial.tags.length > 3 && (
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                            +{tutorial.tags.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">{tutorial.category}</span>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                        Start Tutorial
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {tutorials.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No tutorials found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tutorials
