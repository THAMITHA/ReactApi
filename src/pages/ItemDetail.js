import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, User, Rocket, Globe, Car, Users, Film } from 'lucide-react';

const API_BASE = 'https://swapi.py4e.com/api';

const CATEGORIES = {
  people: { name: 'People', icon: User, endpoint: 'people' },
  planets: { name: 'Planets', icon: Globe, endpoint: 'planets' },
  films: { name: 'Films', icon: Film, endpoint: 'films' },
  species: { name: 'Species', icon: Users, endpoint: 'species' },
  vehicles: { name: 'Vehicles', icon: Car, endpoint: 'vehicles' },
  starships: { name: 'Starships', icon: Rocket, endpoint: 'starships' }
};

function ItemDetail() {
    const { category, id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categoryInfo = CATEGORIES[category];

    useEffect(() => {
        if (categoryInfo && id) {
            fetchItem();
        }
    }, [category, id]);

    const fetchItem = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`${API_BASE}/${categoryInfo.endpoint}/${id}/`);
            if (!response.ok) throw new Error('Failed to fetch data');
            
            const result = await response.json();
            setItem(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderDetailFields = (data) => {
        const excludeFields = ['url', 'created', 'edited'];
        
        return Object.entries(data)
            .filter(([key]) => !excludeFields.includes(key))
            .map(([key, value]) => {
                if (Array.isArray(value)) {
                    return (
                        <div key={key} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                            <dt style={{ fontWeight: 'bold', color: '#666', textTransform: 'capitalize', marginBottom: '5px' }}>
                                {key.replace(/_/g, ' ')}:
                            </dt>
                            <dd style={{ margin: 0 }}>
                                {value.length === 0 ? 'None' : (
                                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                        {value.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </dd>
                        </div>
                    );
                }
                
                return (
                    <div key={key} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                        <dt style={{ fontWeight: 'bold', color: '#666', textTransform: 'capitalize' }}>
                            {key.replace(/_/g, ' ')}:
                        </dt>
                        <dd style={{ margin: '5px 0 0 0' }}>
                            {value || 'Unknown'}
                        </dd>
                    </div>
                );
            });
    };

    if (!categoryInfo) {
        return (
            <div>
                <h1>Category not found</h1>
                <Link to="/">Return to Home</Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
                <div>⏳ Please wait...</div>
            </div>
        );
    }

    if (error || !item) {
        return (
            <div>
                <h1>Error</h1>
                <p>Error: {error || 'Item not found'}</p>
                <Link to={`/${category}`}>
                    Back to {categoryInfo.name}
                </Link>
            </div>
        );
    }

    const itemName = item.name || item.title || 'Unknown';

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <Link 
                    to={`/${category}`}
                    style={{ 
                        textDecoration: 'none', 
                        color: '#007bff',
                        marginRight: '15px'
                    }}
                >
                    ← Back to {categoryInfo.name}
                </Link>
                
                <Link
                    to="/"
                    style={{ 
                        textDecoration: 'none', 
                        color: '#007bff'
                    }}
                >
                    Home
                </Link>
            </div>

            <div style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '30px',
                backgroundColor: '#f8f9fa'
            }}>
                <div style={{ marginBottom: '30px' }}>
                    <h1 style={{ 
                        color: '#333', 
                        marginBottom: '10px',
                        borderBottom: '3px solid #007bff',
                        paddingBottom: '10px'
                    }}>
                        {itemName}
                    </h1>
                    <p style={{ color: '#666', fontSize: '18px', margin: 0 }}>
                        {categoryInfo.name.slice(0, -1)} Details
                    </p>
                </div>

                <dl style={{ margin: 0 }}>
                    {renderDetailFields(item)}
                </dl>
            </div>
        </div>
    );
}

export default ItemDetail;