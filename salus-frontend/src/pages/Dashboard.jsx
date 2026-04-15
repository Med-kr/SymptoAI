import { useUser } from "../context/UserContext";

export default function Dashboard() {
    const { user, logout } = useUser();

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Bonjour {user?.name || "User"}
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Welcome to Salus dashboard
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className="rounded-lg bg-red-500 px-4 py-2 text-white"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}