import React, { useState } from 'react';
import './AddAnimalForm.css';
import api from '../../axiosConfig';

interface AddAnimalFormProps {
    fetchAnimals: () => void;
}

const AddAnimalForm: React.FC<AddAnimalFormProps> = ({ fetchAnimals }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addAnimal = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim().length === 0) {
            setError('Animal name cannot be empty.');
            return;
        }

        try {
            await api.post('/animals', { name });
            setName('');
            fetchAnimals();
            setError(null);
        } catch (error) {
            setError('Error adding animal. Name must be unique.');
            console.error('Error adding animal:', error);
        }
    };

    return (
        <form onSubmit={addAnimal} className="add-animal-form">
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Animal Name"
                required
            />
            <button type="submit">Add Animal</button>
        </form>
    );
};

export default AddAnimalForm;
