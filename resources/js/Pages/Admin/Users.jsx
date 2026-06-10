import AppLayout from '../../Layouts/AppLayout';

export default function Users({ users }) {
    return (
        <AppLayout>
            <div className="space-y-8">

                {/* Page header */}
                <div className="bg-gradient-to-r from-[#1456B8] to-[#0B2A5B] rounded-3xl shadow-lg p-8 text-white">
                    <h1 className="text-4xl font-bold">
                        User Management
                    </h1>

                    <p className="mt-3 text-blue-100">
                        View and manage registered users.
                    </p>
                </div>

                {/* Users table */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

                    <h2 className="text-2xl font-bold text-[#0B2A5B] mb-6">
                        Registered Users
                    </h2>

                    <div className="overflow-x-auto">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <p className="text-gray-500">Total Users</p>
                            <h2 className="text-4xl font-bold text-[#18B7B0] mt-2">
                                {users.length}
                            </h2>
                        </div>
                        <table className="w-full">

                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-4">Name</th>
                                    <th className="text-left py-4">Email</th>
                                    <th className="text-left py-4">Role</th>
                                    <th className="text-left py-4">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="py-4">
                                            {user.name}
                                        </td>

                                        <td className="py-4">
                                            {user.email}
                                        </td>

                                        <td className="py-4 capitalize">
                                            {user.role}
                                        </td>

                                        <td className="py-4">
                                            {user.is_active ? (
                                                <span className="text-green-600 font-medium">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="text-red-600 font-medium">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>

            </div>
        </AppLayout>
    );
}