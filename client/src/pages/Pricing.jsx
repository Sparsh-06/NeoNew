import React, { useState } from 'react';
import Web3 from 'web3';

const Pricing = () => {
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);

  // Connect Web3 to the student's wallet
  const loadWeb3 = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } else {
      alert('Non-Ethereum browser detected. Install MetaMask.');
    }
  };

  // Mock smart contract ABI and address (replace with actual contract ABI and address)
  const contractAddress = '0xE35B1374Aa7F5bFE86f658405F8a3916C59Bb974'; 
  const contractABI =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "serviceType",
				"type": "string"
			}
		],
		"name": "payForService",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "serviceType",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PaymentReceived",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "essayPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mockInterviewPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sopPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

  // Handle payments for the selected service
  const handlePayment = async (serviceType, priceInEther) => {
    setLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      await contract.methods.payForService(serviceType).send({
        from: account,
        value: web3.utils.toWei(priceInEther, 'ether')  // Converting price to ether
      });

      alert('Payment Successful! You now have access to the service.');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
    setLoading(false);
  };

  // Service details
  const services = [
    { name: 'AI SOP Writing Assistance', price: '0.01', type: 'SOP' },
    { name: 'AI Essay Writing Assistance', price: '0.02', type: 'Essay' },
    { name: 'AI Mock Interview Access', price: '0.05', type: 'MockInterview' }
  ];

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Pricing Plans</h1>
        <p className="text-lg">Pay with GAS tokens and unlock AI-powered services to assist you with your college applications.</p>
      </div>
      
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {services.map((service) => (
          <div key={service.type} className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl font-bold">{service.name}</h2>
              <p className="text-lg text-gray-500">Price: {service.price} GAS</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => handlePayment(service.type, service.price)}
                  disabled={!account || loading}
                  className={`btn btn-primary w-full ${loading && 'loading'}`}
                >
                  {loading ? 'Processing...' : `Pay with GAS`}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Connect Wallet Section */}
      <div className="mt-12 text-center">
        {account ? (
          <div className="badge badge-success p-4 text-lg">Wallet Connected: {account}</div>
        ) : (
          <button
            onClick={loadWeb3}
            className="btn btn-secondary btn-lg mt-4"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Pricing;
