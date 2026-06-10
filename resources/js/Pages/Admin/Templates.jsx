import AppLayout from '../../Layouts/AppLayout';
import { useForm, router } from '@inertiajs/react';

export default function Templates({ templates }) {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/admin/templates', {
            onSuccess: () => reset(),
        });
    };


    return (
        <AppLayout>
            <div className="space-y-8">

                {/* Page header */}
                <div className="bg-gradient-to-r from-[#1456B8] to-[#0B2A5B] rounded-3xl shadow-lg p-8 text-white">
                    <h1 className="text-4xl font-bold">
                        Template Management
                    </h1>

                    <p className="mt-3 text-blue-100">
                        View and manage portfolio templates.
                    </p>
                </div>

                {/* Templates section */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

                    <h2 className="text-2xl font-bold text-[#0B2A5B] mb-6">
                        Available Templates
                    </h2>

                    {/* Total templates card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                        <p className="text-gray-500">Total Templates</p>

                        <h2 className="text-4xl font-bold text-[#1456B8] mt-2">
                            {templates.length}
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 mb-8">
                            <h3 className="text-lg font-bold text-[#0B2A5B] mb-4">
                                Add New Template
                            </h3>

                            <form onSubmit={submit} className="space-y-4">

                                <input
                                    type="text"
                                    placeholder="Template Name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full border rounded-xl p-3"
                                />

                                <textarea
                                    placeholder="Template Description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full border rounded-xl p-3"
                                    rows="3"
                                />

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#1456B8] text-white px-5 py-3 rounded-xl"
                                >
                                    Add Template
                                </button>

                            </form>
                        </div>
                        <table className="w-full">

                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-4">Name</th>
                                    <th className="text-left py-4">Description</th>
                                    <th className="text-left py-4">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {templates.map((template) => (
                                    <tr
                                        key={template.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="py-4">
                                            {template.name}
                                        </td>

                                        <td className="py-4">
                                            {template.description}
                                        </td>
                                        <td className="py-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (confirm('Delete this template?')) {
                                                        router.delete(`/admin/templates/${template.id}`);
                                                    }
                                                }}
                                                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
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