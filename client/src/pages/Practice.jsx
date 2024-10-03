import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import CourseRewardContractABI from "../contracts/CourseRewardContract.json";

// Modal Component
const Modal = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Success!</h2>
                <p>{message}</p>
                <button onClick={onClose} className="btn btn-primary mt-4">
                    Close
                </button>
            </div>
        </div>
    );
};

const Practice = () => {
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [courses, setCourses] = useState([
        { id: 1, name: "Introduction to Blockchain", description: "Learn the basics of blockchain technology.", completed: false },
        { id: 2, name: "Smart Contracts 101", description: "An introduction to smart contracts and their applications.", completed: false },
        { id: 3, name: "Ethereum Development", description: "Explore how to build decentralized applications on Ethereum.", completed: false },
        { id: 4, name: "Web3 Fundamentals", description: "Understand the principles of Web3 and decentralized finance (DeFi).", completed: false },
        { id: 5, name: "NFTs and Digital Art", description: "Discover the world of non-fungible tokens and their impact on digital art.", completed: false },
    ]);
    const [rewards, setRewards] = useState(0);
    const [completionStatus, setCompletionStatus] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        const initEthers = async () => {
            if (window.ethereum) {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const customProvider = new ethers.BrowserProvider(window.ethereum);
                setProvider(customProvider);

                const contractAddress = "0x66f75Ba9B31510C9bee9E8c67e8cc0840a2c7DAF"; // Ensure this address is correct
                const signer = await customProvider.getSigner();
                const courseRewardContract = new ethers.Contract(contractAddress, CourseRewardContractABI, signer);
                setContract(courseRewardContract);
                await loadRewards(courseRewardContract, signer);
            } else {
                alert("Please install MetaMask!");
            }
        };

        initEthers();
    }, []);

    const loadRewards = async (contract, signer) => {
        const address = await signer.getAddress();
        const rewardAmount = await contract.getReward(address); // Make sure `getReward` exists
        setRewards(parseInt(rewardAmount.toString(), 10));
    };

    const handleCheckboxChange = (courseId) => {
        setCompletionStatus((prevState) => ({
            ...prevState,
            [courseId]: !prevState[courseId],
        }));
    };

    const handleCompleteCourse = async (courseId) => {
        if (!completionStatus[courseId]) {
            alert("Please mark this course as completed before proceeding.");
            return;
        }

        // Simulate a successful completion with a token reward
        const tokenReward = 10; // Example token reward
        setModalMessage(`You have received ${tokenReward} tokens for completing this course!`);
        setShowModal(true);

        // Simulate updating the course completion status
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.id === courseId ? { ...course, completed: true } : course
            )
        );

        // Update rewards (if this were connected to a contract, you'd update it here)
        setRewards((prevRewards) => prevRewards + tokenReward);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <section className="container mx-auto p-16">
            <h2 className="text-3xl font-bold text-center mb-6">Explore Courses</h2>
            <p className="text-center mb-4">Your Rewards: {rewards} Tokens</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{course.name}</h2>
                            <p>{course.description}</p>
                            <label className="flex items-center mt-4">
                                <input
                                    type="checkbox"
                                    checked={!!completionStatus[course.id]}
                                    onChange={() => handleCheckboxChange(course.id)}
                                    className="mr-2"
                                />
                                Mark as Completed
                            </label>
                            <button
                                onClick={() => handleCompleteCourse(course.id)}
                                className="btn btn-primary mt-4"
                                disabled={!completionStatus[course.id]}
                            >
                                Complete Course
                            </button>
                            {course.completed && (
                                <p className="mt-2 text-green-500">Course Completed!</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {showModal && <Modal message={modalMessage} onClose={closeModal} />}
        </section>
    );
};

export default Practice;
