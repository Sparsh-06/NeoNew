import Sidebar from "./Sidebar.jsx";
import Dashboard from "../pages/Dashboard.jsx";

const DashLayout = () => {
    return (
        <div className="flex flex-row h-screen">
            <Sidebar />
            <div className="w-full">
                <Dashboard />
            </div>
        </div>
    );
};

export default DashLayout;