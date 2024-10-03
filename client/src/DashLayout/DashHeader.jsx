import { FaBars } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const DashHeader = () => {
    const { isAuthenticated, user } = useAuth0();
    const [username, setUsername] = useState({ name: "", picture: "" });

    useEffect(() => {
        if (isAuthenticated && user) {
            setUsername({ name: user.name, picture: user.picture });
        }
    }, [user, isAuthenticated]);

    return (
        <header className="bg-base-100 text-base-content shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="flex items-center justify-center gap-4">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <FaBars />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-3 shadow bg-base-100 rounded-box w-52 text-sm text-base-content z-50"
                    >
                        <li className="my-1">
                            <a className="hover:bg-base-200 px-3 py-2 rounded-md">Profile</a>
                        </li>
                        <li className="my-1">
                            <a className="hover:bg-base-200 px-3 py-2 rounded-md">Edit</a>
                        </li>
                        <li className="my-1">
                            <a className="hover:bg-base-200 px-3 py-2 rounded-md">Settings</a>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center justify-center gap-2">
                    {isAuthenticated && (
                        <span className="hidden md:inline-block font-medium text-base-content">
              Hello, {username.name}
            </span>
                    )}
                </div>
            </div>
        </header>
    );
};
