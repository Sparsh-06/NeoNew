export const CommunitySpace = () => {
    const universities = ["Harvard University", "Stanford University", "MIT", "Princeton University"];
    const connectedStudents = [
        { name: "Alice Johnson", university: "Harvard University" },
        { name: "Bob Smith", university: "Stanford University" },
        { name: "Charlie Davis", university: "MIT" },
        { name: "Diana Wells", university: "Princeton University" },
    ];

    const groups = [
        { name: "IELTS Preparation Group", description: "Join us to prepare for the IELTS together!" },
        { name: "GRE Study Circle", description: "Collaborate and study for the GRE with peers." },
        { name: "University Application Support", description: "Get help with your university applications." },
        { name: "Research Projects Network", description: "Connect with others working on research." },
    ];

    return (
        <div className="flex flex-col justify-between h-screen bg-gray-100">
      {/* Header: Community Rule */}
      <div className="bg-white shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-700">Community</h2>
        <p className="text-sm text-gray-500">
          Community rule: You will be matched with students who are preparing for the same university
        </p>
      </div>

      {/* Chat Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {/* Message bubbles (example data) */}
        <div className="self-start bg-gray-200 p-3 rounded-lg max-w-xs">
          <p className="text-sm text-gray-700">Hello! Anyone preparing for XYZ University?</p>
        </div>
        <div className="self-end bg-blue-200 p-3 rounded-lg max-w-xs">
          <p className="text-sm text-gray-700">Yes, I'm applying next year!</p>
        </div>
        <div className="self-start bg-gray-200 p-3 rounded-lg max-w-xs">
          <p className="text-sm text-gray-700">Same here, let's study together.</p>
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-white p-4 shadow-md">
        <input
          type="text"
          className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message here..."
        />
      </div>
    </div>
    );
};
