import React, { useState } from 'react';

export const ApplicationTracker = () => {
    const [universities, setUniversities] = useState([
        { id: 1, name: "Harvard University", status: "Pending" },
        { id: 2, name: "Stanford University", status: "Pending" },
        { id: 3, name: "Massachusetts Institute of Technology", status: "Pending" },
        { id: 4, name: "California Institute of Technology", status: "Pending" },
        { id: 5, name: "University of Chicago", status: "Pending" },
        { id: 6, name: "Princeton University", status: "Pending" },
        { id: 7, name: "Columbia University", status: "Pending" },
        { id: 8, name: "Yale University", status: "Pending" },
        { id: 9, name: "University of Pennsylvania", status: "Pending" },
        { id: 10, name: "Johns Hopkins University", status: "Pending" }
    ]);
    const [newUniversityName, setNewUniversityName] = useState("");
    const [newUniversityStatus, setNewUniversityStatus] = useState("Pending");

    const handleAddUniversity = () => {
        if (newUniversityName) {
            setUniversities([...universities, { id: universities.length + 1, name: newUniversityName, status: newUniversityStatus }]);
            setNewUniversityName("");
            setNewUniversityStatus("Pending");
        }
    };

    const handleUpdateStatus = (id, status) => {
        setUniversities(universities.map(university => university.id === id ? { ...university, status } : university));
    };

    const handleDeleteUniversity = (id) => {
        setUniversities(universities.filter(university => university.id !== id));
    };

    return (
        <div className="container mx-auto p-14">
            <h1 className="text-4xl font-bold mb-4">University Application Tracker</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                <h2 className="text-2xl font-semibold mb-4">Add University</h2>
                <div className="flex space-x-4">
                    <input 
                        type="text" 
                        value={newUniversityName} 
                        onChange={(e) => setNewUniversityName(e.target.value)} 
                        placeholder="University Name" 
                        className="border rounded-lg p-2 flex-grow" 
                    />
                    <button 
                        onClick={handleAddUniversity} 
                        className="bg-blue-500 text-white rounded-lg px-4 py-2"
                    >
                        Add
                    </button>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Added Universities</h2>
                <ul className="list-none">
                    {universities.map(university => (
                        <li key={university.id} className="border-b py-2 flex justify-between items-center">
                            <span className="font-medium">{university.name}</span>
                            <div className="flex items-center space-x-2">
                                <select 
                                    value={university.status} 
                                    onChange={(e) => handleUpdateStatus(university.id, e.target.value)} 
                                    className="border rounded-lg p-1"
                                >
                                    <option value="Accepted">Accepted</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Pending">Pending</option>
                                </select>
                                <button onClick={() => handleDeleteUniversity(university.id)} className="text-red-500">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
