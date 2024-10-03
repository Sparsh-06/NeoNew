export const Home = () => {
    return (
        <div className="p-6 flex-1 overflow-y-auto bg-base-200">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
            <p className="text-base-content">
                This is your dashboard where you can manage your activities. Here, you
                can track your progress, manage your applications, and access all
                relevant tools.
            </p>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="card bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-2">
                        Track Your Applications
                    </h2>
                    <p className="text-sm text-gray-500">
                        Keep track of your application status and important dates.
                    </p>
                </div>

                <div className="card bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-2">Manage Documents</h2>
                    <p className="text-sm text-gray-500">
                        Upload and organize your application documents effortlessly.
                    </p>
                </div>

                <div className="card bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-2">Connect with Peers</h2>
                    <p className="text-sm text-gray-500">
                        Join discussions, ask questions, and collaborate with other
                        students.
                    </p>
                </div>
            </div>
        </div>
    );
};
