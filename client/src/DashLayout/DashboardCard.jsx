import { useState } from "react";
import axios from "axios";
import { ethers } from "ethers"; // Assuming you're connecting the user's wallet for the address

const DocumentCard = ({ title, desc }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1MjAxMDg0OC1iNjM4LTQwMGMtYmQ4ZS0zYjJmZjUzZmY1ZGMiLCJlbWFpbCI6InNwYXJzaHNoYXJtYWRhdkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZmY4MGY0YTRkNjM2NmUxZjZmNjIiLCJzY29wZWRLZXlTZWNyZXQiOiIxNzg5ZjlkMTVlZmE0NmQyMzllODg3NWQ1YjJlZTAxYjJmODQyZjVkMWE5NzgwYTcyMjUzMWZiMDdjZDA2ZTk2IiwiZXhwIjoxNzU5MTE4OTk0fQ.NIwtdyJvaMkWaKkDWrZ-WIZJTMp8Pt7vVvl2pFIrWWM"

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  // Connect to user's wallet to get their address
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Please install MetaMask to connect your wallet!");
    }
  };

  // Upload file to IPFS using Pinata API
  const uploadToIPFS = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        setUploading(true);
        const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: Infinity, // Allow large file sizes
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${jwt}`, // Replace with your Pinata JWT or API Key
            },
        });
        const ipfsHash = response.data.IpfsHash;
        console.log("File uploaded to IPFS successfully:", ipfsHash);
        setIpfsHash(ipfsHash);
        return ipfsHash;
    } catch (error) {
        console.error("Error uploading file to IPFS:", error.response?.data || error.message);
        throw error;
    } finally {
        setUploading(false);
    }
};



  // Submit function to handle the entire process
  const handleSubmit = async () => {
    if (file && walletAddress) {
      try {
        const ipfsHash = await uploadToIPFS();
        console.log(
          `File uploaded to IPFS with hash: ${ipfsHash}, associated with wallet: ${walletAddress}`
        );

        // You can now send this association (wallet address + IPFS hash) to your backend or smart contract.
        // Example:
        // await contract.storeDocument(walletAddress, ipfsHash);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      alert("Please select a file and connect your wallet.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex flex-col items-center justify-center h-40 bg-gray-100">
        <h2 className="text-xl font-medium text-gray-800">{title}</h2>
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-600 mb-4">{desc}</p>
        <div className="flex flex-col space-y-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full text-gray-800 cursor-pointer"
          />
          {!walletAddress && (
            <button onClick={connectWallet} className="btn btn-primary w-full">
              Connect Wallet
            </button>
          )}
          {file && walletAddress && (
            <>
              <p className="text-sm text-gray-600">Selected: {file.name}</p>
              <button
                onClick={handleSubmit}
                className="btn btn-sm btn-primary w-full mt-2"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Submit"}
              </button>
              {ipfsHash && (
                <p className="text-green-500">
                  File uploaded to IPFS: {ipfsHash}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
