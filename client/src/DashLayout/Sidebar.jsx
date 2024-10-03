import {
    FaHome,
    FaClipboardList,
    FaFileAlt,
    FaPenFancy,
    FaUserFriends,
    FaUniversity,
    FaQuestionCircle,
    FaCalendarAlt,
    FaUserShield,
    FaTools, // Importing the Tools icon
    FaConnectdevelop,
    FaNetworkWired
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from "react";
import {useAuth0} from "@auth0/auth0-react";

const Sidebar = () => {

    const {logout} = useAuth0();

    return (
        <div className="h-screen w-72 bg-base-100 text-base-content shadow-lg flex flex-col justify-between border-r border-base-300 fixed">
            {/* Sidebar Top Section */}
            <div>
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-base-content">IvySphere</h1>
                </div>
                {/* Sidebar Menu */}
                <ul className="menu p-4">
                    <SidebarItem icon={<FaHome />} text="Home" linksTo='' />
                    <SidebarItem icon={<FaFileAlt />} text="Document Manager" linksTo='document-manager' />
                    <SidebarItem icon={<FaClipboardList />} text="Application Tracker" linksTo='application-tracker' />
                    <SidebarItem icon={<FaUniversity />} text="Community Space" linksTo='community-space' />
                    <SidebarItem icon={<FaNetworkWired />} text="Practice" linksTo='mock' />
                    <SidebarItem icon={<FaQuestionCircle />} text="Add University" linksTo='university-list' />

                    {/* Tools Dropdown */}
                    <SidebarDropdown icon={<FaTools />} text="AI Tools">
                        <SidebarItem icon={<FaPenFancy />} text="SOP Writer" linksTo='Statement-Writer' />
                        <SidebarItem icon={<FaUserFriends />} text="Essay Assistant" linksTo='essay' />
                    </SidebarDropdown>

                    <SidebarItem icon={<FaConnectdevelop />} text="Alumni Portal" linksTo='alumni' />
                    <SidebarItem icon={<FaCalendarAlt />} text="Calendar" linksTo='' />
                </ul>
            </div>
            {/* Sidebar Bottom Section */}
            <div className="p-4">
                <button className="btn btn-error w-full" onClick={() => logout().then(() => window.location.href = "/")}>
                    Logout
                </button>
            </div>
        </div>
    );
};

const SidebarItem = ({ icon, text, linksTo }) => {
    return (
        <li className="my-1">
            <Link to={linksTo}
                  className="flex items-center px-4 py-3 rounded-md text-base-content hover:bg-base-200 transition-all duration-150"
            >
                <span className="text-lg mr-3 text-base-content">{icon}</span>
                <span className="font-medium">{text}</span>
            </Link>
        </li>
    );
};

const SidebarDropdown = ({ icon, text, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="my-1">
            <div
                className="flex items-center px-4 py-3 rounded-md text-base-content hover:bg-base-200 transition-all duration-150 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg mr-3 text-base-content">{icon}</span>
                <span className="font-medium flex-1">{text}</span>
                <span className={`transition-all duration-150 ${isOpen ? 'rotate-90' : '-rotate-90'}`}>▼</span>
            </div>
            {isOpen && (
                <ul className="ml-6">
                    {children}
                </ul>
            )}
        </li>
    );
};

export default Sidebar;