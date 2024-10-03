import React from 'react';
import Alumni from '../pages/Alumni';

const alumniData = [
    {
        name: 'John Doe',
        description: 'Graduated from XYZ University, now working at ABC Company.',
        price: 0.05,
    },
    {
        name: 'Jane Smith',
        description: 'Graduated from XYZ University, expert in AI and Machine Learning.',
        price: 0.1,
    },
    // Add more alumni as needed
];

const AlumniList = () => {
    const handleContact = (alumni) => {
        // Implement contact logic (e.g., modal, navigation, etc.)
        alert(`Contacting ${alumni.name} for ${alumni.price} ETH`);
    };

    return (
        <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumniData.map((alumni, index) => (
                <Alumni key={index} alumni={alumni} onContact={handleContact} />
            ))}
        </div>
    );
};

export default AlumniList;
