import { useRef, useState } from "react";
import JoinWaitlistModal from "./JoinWaitlistModal"; // Import the modal
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import Web3 from 'web3';

const Header = () => {
  const AnimatedHeads = useRef(null);
  const AnimatedImg = useRef(null);
  const [account, setAccount] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useGSAP(()=>{
    const tl = gsap.timeline({defaults: {ease: 'power3.inOut'}})
    tl.from(AnimatedHeads.current.children, {
      duration: 2,
      opacity: 0,
      stagger: 0.1
    })
    gsap.from(AnimatedImg.current, {
      duration: 1,
      opacity: 0,
      x: 100,
    })
  })

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]); // Store connected account
        console.log("Connected account:", accounts[0]);
        const response = await axios.post('http://localhost:5000/api/login', { walletAddress: accounts[0] });
        setMessage(response.data.message);
        // Navigate to dashboard after successful connection
        navigate("/dashboard");
      } catch (error) {
        console.error("User denied account access:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask to use this feature.");
    }
  };

  return (
      <section className="text-gray-600 body-font h-screen">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center" ref={AnimatedHeads}>
            <h1 className="sm:text-4xl lg:text-5xl mb-4 font-medium text-gray-900">
              Revolutionising College Admissions 
              <br className="hidden lg:inline-block" />
            </h1>
            <p className="leading-relaxed">
              Navigating the complex world of university applications doesn't have
              to be overwhelming. Our platform empowers you with the tools,
              support, and community you need to stand out and achieve your
              college dreams.
            </p>
            <p className="mb-8 font-thin text-xl mt-4">World's 1<sup>st</sup> Blochain-Powered Application Preparation Platform </p>
            <div className="flex justify-center gap-4">
              {/* Button to trigger modal */}
              <button className="btn btn-primary">
                {!account ? (
                    <button onClick={connectWallet} className="connect-button">
                      Connect Wallet
                    </button>
                ) : (
                    <p>Connected: {account}</p>
                )}
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            {/* <iframe
            className="rounded-xl pointer-events-none"
            width="520"
            height="320"
            src="https://www.youtube.com/embed/1SCqveOv--c"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; "
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe> */}
            <img
                src="https://plus.unsplash.com/premium_photo-1683887034473-74e486cdb7a1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="university"
                className="rounded-xl" ref={AnimatedImg}/>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-center">Scroll Down</h2>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mx-auto mt-1"
          >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12l-7.5 7.5L4.5 12"
            />
          </svg>
        </div>
        {/* Include the modal */}
        {/*<JoinWaitlistModal isOpen={isModalOpen} onClose={closeModal} />*/}
      </section>
  );
};

export default Header;