import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AlumniContractABI from '../contracts/AlumniContract.json'; // Ensure the ABI path is correct

const Alumni = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [contactType, setContactType] = useState('');

  const alumniData = [
    {
      id: 1,
      name: 'John Doe',
      image: 'https://example.com/johndoe.jpg',
      description: 'Software Engineer at Google',
    },
    {
      id: 2,
      name: 'Jane Smith',
      image: 'https://example.com/janesmith.jpg',
      description: 'Data Scientist at Facebook',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      image: 'https://example.com/alicejohnson.jpg',
      description: 'Product Manager at Amazon',
    },
    {
      id: 4,
      name: 'Bob Brown',
      image: 'https://example.com/bobbrown.jpg',
      description: 'UX Designer at Apple',
    },
    {
      id: 5,
      name: 'Charlie Davis',
      image: 'https://example.com/charliedavis.jpg',
      description: 'DevOps Engineer at Microsoft',
    },
  ];

  // Initialize ethers.js and connect to MetaMask on component mount
  useEffect(() => {
    const initEthers = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const customProvider = new ethers.BrowserProvider(window.ethereum);
          setProvider(customProvider);

          const contractAddress = '0x7A79193446eC842C732f480E817A1ba364Fa53f8'; // Replace with your contract address
          const alumniContract = new ethers.Contract(contractAddress, AlumniContractABI, customProvider.getSigner());
          setContract(alumniContract);
        } catch (error) {
          console.error('User denied account access or other error:', error);
        }
      } else {
        alert('Please install MetaMask!');
      }
    };
    initEthers();
  }, []);

  const handleContact = async (alumni, contactType) => {
    if (!provider || !contract) {
      alert('Ethereum provider or contract not initialized.');
      return;
    }

    try {
      // Estimate the price dynamically; for now, we can set a default price
      const estimatedPriceInEther = contactType === 'message' ? 0.01 : 0.05; // Example estimated prices
      const priceInWei = ethers.parseEther(estimatedPriceInEther.toString()); // Convert price to wei

      // Get the signer
      const signer = await provider.getSigner();

      // Use the contract with the signer
      const contractWithSigner = contract.connect(signer);

      // Call the contract method
      const transaction = await contractWithSigner.payForContact(alumni.id, contactType, {
        value: priceInWei,
      });

      console.log('Transaction sent:', transaction.hash);
      await transaction.wait();

      // Update modal state
      setSelectedAlumni(alumni);
      setContactType(contactType);
      setShowModal(true);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed! Please check your MetaMask settings.');
    }
  };

  return (
    <section className="container mx-auto p-16">
      <h2 className="text-3xl font-bold text-center mb-6">Contact Our Alumni</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumniData.map((alumni) => (
          <div key={alumni.id} className="card w-full bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                alt={alumni.name}
                className="rounded-full w-32 h-32 mx-auto mb-4"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{alumni.name}</h2>
              <p>{alumni.description}</p>
              <div className="flex justify-center mt-4">
                <div className="mr-4">
                  <button
                    onClick={() => handleContact(alumni, 'message')}
                    className="btn btn-primary"
                  >
                    Message
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleContact(alumni, 'session')}
                    className="btn btn-secondary"
                  >
                    1v1 Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedAlumni && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Transaction Successful!</h3>
            <p className="py-4">
              You have successfully purchased a <strong>{contactType === 'message' ? 'Message' : '1v1 Session'}</strong> with <strong>{selectedAlumni.name}</strong>.
            </p>
            <p>
              You can now {contactType === 'message' ? 'send a message' : 'schedule your 1v1 session'} with {selectedAlumni.name}.
            </p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setShowModal(false)} // Close modal
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Alumni;
