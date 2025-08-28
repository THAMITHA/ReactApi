import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, User, Rocket, Globe, Car, Users, Film } from 'lucide-react';

const API_BASE = 'https://swapi.py4e.com/api';

const CATEGORIES = {
  people: { name: 'People', icon: User, endpoint: 'people' },
  planets: { name: 'Planets', icon: Globe, endpoint: 'planets' },
  films: { name: 'Films', icon: Film, endpoint: 'films' },
  species: { name: 'Species', icon: Users, endpoint: 'species' },
  vehicles: { name: 'Vehicles', icon: Car, endpoint: 'vehicles' },
  starships: { name: 'Starships', icon: Rocket, endpoint: 'starships' }
};

function CategoryList() {
    const { category } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const categoryInfo = CATEGORIES[category];

    useEffect(() => {
        if (categoryInfo) {
            setCurrentPage(1);
            setSearchTerm('');
            setSearchResults([]);
            fetchData();
        }
    }, [category]);

    useEffect(() => {
        if (categoryInfo && !searchTerm) {
            fetchData();
        }
    }, [currentPage]);

    const fetchData = async (search = '') => {
        if (!categoryInfo) return;
        
        setLoading(true);
        setError(null);
        
        try {
            let url = `${API_BASE}/${categoryInfo.endpoint}/?page=${currentPage}`;
            if (search) {
                url = `${API_BASE}/${categoryInfo.endpoint}/?search=${search}`;
            }
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch data');
            
            const result = await response.json();
            
            if (search) {
                setSearchResults(result.results || []);
            } else {
                setData(result.results || []);
                setTotalPages(Math.ceil(result.count / 10));
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (searchTerm.trim()) {
            fetchData(searchTerm.trim());
        } else {
            setSearchResults([]);
            fetchData();
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
        setCurrentPage(1);
        fetchData();
    };

    if (!categoryInfo) {
        return (
            <div>
                <h1>Category not found</h1>
                <Link to="/">Return to Home</Link>
            </div>
        );
    }

    const displayData = searchResults.length > 0 || searchTerm ? searchResults : data;

    const getItemName = (item) => {
        return item.name || item.title || 'Unknown';
    };

    const getItemId = (item) => {
        const urlParts = item.url.split('/');
        return urlParts[urlParts.length - 2];
    };

    if (loading) {
        return (
            <div>
                <h1>Loading {categoryInfo.name}...</h1>
                <div>⏳ Please wait...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>Error loading {categoryInfo.name}</h1>
                <p>Error: {error}</p>
                <button onClick={() => fetchData()}>Retry</button>
            </div>
        );
    }

    return (
        <div>
            <div>
                <Link to="/">← Back to Home</Link>
                <h1>{categoryInfo.name}</h1>
            </div>

            {/* Search */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                    placeholder={`Search ${categoryInfo.name.toLowerCase()}...`}
                    style={{ 
                        padding: '8px', 
                        marginRight: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
                <button 
                    onClick={handleSearch}
                    style={{ 
                        padding: '8px 16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        marginRight: '10px',
                        cursor: 'pointer'
                    }}
                >
                    Search
                </button>
                {(searchResults.length > 0 || searchTerm) && (
                    <button 
                        onClick={clearSearch}
                        style={{ 
                            padding: '8px 16px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Results */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                {displayData.map((item) => (
                    <div key={item.url} style={{ 
                        border: '1px solid #ddd', 
                        borderRadius: '8px', 
                        padding: '16px',
                        backgroundColor: '#f8f9fa'
                    }}>
                        <h3>
                            <Link 
                                to={`/${category}/${getItemId(item)}`}
                                style={{ color: '#007bff', textDecoration: 'none' }}
                            >
                                {getItemName(item)}
                            </Link>
                        </h3>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                            {category === 'people' && (
                                <>
                                    <p>Height: {item.height} cm</p>
                                    <p>Birth Year: {item.birth_year}</p>
                                </>
                            )}
                            {category === 'planets' && (
                                <>
                                    <p>Climate: {item.climate}</p>
                                    <p>Population: {item.population}</p>
                                </>
                            )}
                            {category === 'films' && (
                                <>
                                    <p>Director: {item.director}</p>
                                    <p>Release Date: {item.release_date}</p>
                                </>
                            )}
                            {category === 'species' && (
                                <>
                                    <p>Classification: {item.classification}</p>
                                    <p>Language: {item.language}</p>
                                </>
                            )}
                            {category === 'vehicles' && (
                                <>
                                    <p>Model: {item.model}</p>
                                    <p>Manufacturer: {item.manufacturer}</p>
                                </>
                            )}
                            {category === 'starships' && (
                                <>
                                    <p>Model: {item.model}</p>
                                    <p>Class: {item.starship_class}</p>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {displayData.length === 0 && (searchResults.length === 0 && searchTerm) && (
                <div>
                    <p>No results found for "{searchTerm}"</p>
                </div>
            )}

            {/* Pagination */}
            {!searchTerm && totalPages > 1 && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        style={{ 
                            padding: '8px 16px',
                            marginRight: '10px',
                            backgroundColor: currentPage === 1 ? '#e9ecef' : '#007bff',
                            color: currentPage === 1 ? '#6c757d' : 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        ← Previous
                    </button>
                    
                    <span style={{ padding: '0 20px' }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        style={{ 
                            padding: '8px 16px',
                            marginLeft: '10px',
                            backgroundColor: currentPage === totalPages ? '#e9ecef' : '#007bff',
                            color: currentPage === totalPages ? '#6c757d' : 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}

export default CategoryList;