import React, { useEffect, useState } from 'react';
import './AnimalList.css';
import api from '../../axiosConfig';

interface Animal {
    name: string;
}

const AnimalList: React.FC = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchAnimals = async () => {
        try {
            const response = await api.get<Animal[]>('/animals');
            setAnimals(response.data);
            setError(null);
        } catch (error) {
            setError('Error fetching animals.');
            console.error('Error fetching animals:', error);
        }
    };

    const removeAnimal = async (name: string) => {
        try {
            await api.delete(`/animals/${name}`);
            fetchAnimals(); // Refresh the list after removal
            setError(null);
        } catch (error) {
            setError('Error removing animal.');
            console.error('Error removing animal:', error);
        }
    };

    useEffect(() => {
        fetchAnimals();
    }, []);

    return (
        <div className="animal-list">
            <h2>Animals</h2>
            {error && <p className="error">{error}</p>}
            {animals.length === 0 ? (
                <p>No animals added yet. Please add some animals.</p>
            ) : (
                <ul>
                    {animals.map(animal => (
                        <li key={animal.name}>
                            {animal.name}
                            <button onClick={() => removeAnimal(animal.name)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AnimalList;
