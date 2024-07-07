import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import './App.css';
import AddAnimalForm from './pages/add-animal/AddAnimalForm';
import AnimalList from './pages/animal-list/AnimalList';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="app">
        <h1>Farm Management</h1>
        <AddAnimalForm fetchAnimals={() => { }} />
        <AnimalList />
      </div>
    </ErrorBoundary>
  );
};

export default App;
