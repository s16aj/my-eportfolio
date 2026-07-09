import AppLayout from '../../Layouts/AppLayout';
import { Users as UsersIcon, CheckCircle2, XCircle } from 'lucide-react';

export default function Users({ users }) {
    return (
        <AppLayout>
            <div className="space-y-6">

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

                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-10 h-10 rounded-xl bg-blue-50 text-[#1456B8] flex items-center justify-center shrink-0">
                            <UsersIcon className="w-5 h-5" />
                        </span>
                        <h2 className="text-2xl font-bold text-[#0B2A5B]">
                            Registered Users
                        </h2>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6">
                        <p className="text-gray-500 text-sm">Total Users</p>
                        <h2 className="text-4xl font-bold text-[#18B7B0] mt-2">
                            {users.length}
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-3 text-sm font-semibold text-gray-500">Name</th>
                                    <th className="text-left py-3 text-sm font-semibold text-gray-500">Email</th>
                                    <th className="text-left py-3 text-sm font-semibold text-gray-500">Role</th>
                                    <th className="text-left py-3 text-sm font-semibold text-gray-500">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-gray-50 hover:bg-gray-50 transition"
                                    >
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="w-9 h-9 rounded-full bg-blue-50 text-[#1456B8] flex items-center justify-center font-bold text-sm shrink-0">
                                                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                                </span>
                                                <span className="font-medium text-[#0B2A5B]">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-4 text-gray-600">
                                            {user.email}
                                        </td>

                                        <td className="py-4">
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                                    user.role === 'admin'
                                                        ? 'bg-purple-50 text-purple-600'
                                                        : 'bg-blue-50 text-[#1456B8]'
                                                }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="py-4">
                                            {user.is_active ? (
                                                <span className="inline-flex items-center gap-1.5 text-green-600 font-medium text-sm">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-red-600 font-medium text-sm">
                                                    <XCircle className="w-4 h-4" />
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
