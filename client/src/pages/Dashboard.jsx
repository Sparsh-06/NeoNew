import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DashHeader } from "../DashLayout/DashHeader.jsx";
import LoadingSkeleton from "../components/LoadingSkeleton.jsx";

const Dashboard = () => {
  const [loading, setLoading] = useState(true); // loading state
  const location = useLocation(); // Detect route change

  // Effect to simulate loading on route change
  useEffect(() => {
    // Set loading to true when the route changes
    setLoading(true);

    // Simulate a delay (e.g., 2 seconds) for the loading skeleton
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [location]);

  return (
    <div className="flex h-screen ml-[18rem]">
      <div className="flex flex-col flex-1">
        <DashHeader />
        <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        {/* Show Loading Skeleton if loading state is true */}
        {loading ? <LoadingSkeleton /> : <Outlet />}{" "}
        {/* Use Outlet for nested routes */}
      </div>
    </div>
  );
};

export default Dashboard;
