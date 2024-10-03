import React, { useState } from "react";
import {
  ArrowRight,
  Users,
  DownloadCloud,
  TimerOffIcon,
  InspectionPanel,
  LucideLetterText,
  GroupIcon,
} from "lucide-react";


const ServiceCard = ({ icon, title, description, onClick }) => (
  <div
    className="p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer"
    onClick={onClick}
  >
    <div className="w-12 h-12 mb-4 text-blue-600">{icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <span className="text-blue-600 inline-flex items-center font-medium hover:text-blue-800 transition-colors duration-300">
      Learn More
      <ArrowRight className="w-4 h-4 ml-2" />
    </span>
  </div>
);

const Service = () => {

  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: <DownloadCloud className="w-full h-full" />,
      title: "Organize & Manage All Your Documents in One Place",
      description:
        "No more scrambling to find critical documents at the last minute. Store, organize, and manage all your application documents from one central hub",
      detailedDescription:
        "Our document management service ensures that your critical documents are always at your fingertips. Keep everything from your SOPs and test scores to your letters of recommendation safe and easily accessible in one place. ",
      miniStatements: [
        "Blockchain technology ensures the integrity and security of your documents.",
        "Immutable records provide a tamper-proof history of document changes."
      ]
    },
    {
      icon: <TimerOffIcon className="w-full h-full" />,
      title: "Never Miss a Deadline Again",
      description:
        "Stay on top of every important deadline—whether it's for applications, scholarships, or visa interviews.",
      detailedDescription:
        "Sync our deadline tracker with your calendar and receive timely reminders for university applications, scholarships, or visa interviews. Stay organized and stress-free with timely notifications that ensure you never miss a crucial date.",
      miniStatements: [
        "Blockchain timestamps ensure deadlines are immutable and verifiable.",
        "Decentralized reminders provide reliable and consistent notifications."
      ]
    },
    {
      icon: <Users className="w-full h-full" />,
      title: "Get Help from Experts & Alumni",
      description:
        "Connect with mentors who have successfully navigated the same journey through personalized 1-on-1 sessions.",
      detailedDescription:
        "Our platform provides access to experts and alumni who have gone through the application process themselves. Get personalized advice on university choices, essays, and more through one-on-one mentoring sessions.",
      miniStatements: [
        "Blockchain-based verification ensures mentor credentials are authentic.",
        "Secure and transparent interactions with mentors."
      ]
    },
    {
      icon: <InspectionPanel className="w-full h-full" />,
      title: "AI-Powered Practice for Interviews & Exams",
      description:
        "Ace your interviews and exams with our AI-driven simulations, tailored to your responses.",
      detailedDescription:
        "Whether you're preparing for your IELTS, GRE, or visa interview, our AI-powered simulation helps you practice in real-time. The AI adapts to your responses, offering feedback and helping you improve your performance for the actual event.",
      miniStatements: [
        "Blockchain ensures the integrity of AI training data.",
        "Immutable records of practice sessions for consistent improvement."
      ]
    },
    {
      icon: <LucideLetterText className="w-full h-full" />,
      title: "Write Standout Essays & SOPs with AI Assistance",
      description:
        "Get real-time feedback on structure, tone, and grammar to craft compelling essays and SOPs.",
      detailedDescription:
        "Writing the perfect SOP or personal statement can be daunting. Our AI assistant helps by providing real-time feedback on tone, grammar, structure, and much more, ensuring your application essays are polished and compelling.",
      miniStatements: [
        "Blockchain ensures the originality and authenticity of your essays.",
        "Immutable feedback history for continuous improvement."
      ]
    },
    {
      icon: <GroupIcon className="w-full h-full" />,
      title: "Collaborate with a Community of Like-Minded Students",
      description:
        "Join a community of aspiring students, share resources, and prepare for your dream universities together.",
      detailedDescription:
        "Join our community of like-minded students who are on the same journey. Share tips, resources, and study materials. Collaborate on essays, interview prep, and more to enhance your application experience.",
      miniStatements: [
        "Blockchain ensures secure and transparent collaboration.",
        "Immutable records of shared resources and contributions."
      ]
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering your application journey with cutting-edge tools and guidance tailored to
            your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>

        {/* DaisyUI Modal */}
        {selectedService && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">{selectedService.title}</h3>
              <p className="py-4">{selectedService.detailedDescription}</p>
              <ul className="list-disc list-inside mb-4">
                {selectedService.miniStatements.map((statement, idx) => (
                  <li key={idx} className="text-gray-600">{statement}</li>
                ))}
              </ul>
              <div className="modal-action">
                <button
                  onClick={() => setSelectedService(null)}
                  className="btn btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Service;
