import AppLayout from '../../Layouts/AppLayout';
import { useForm, router, usePage } from '@inertiajs/react';
import { LayoutTemplate, CheckCircle2, XCircle, Trash2, Plus } from 'lucide-react';

export default function Templates({ templates }) {
    const { errors, flash } = usePage().props;

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
            <div className="space-y-6">

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

                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-10 h-10 rounded-xl bg-blue-50 text-[#1456B8] flex items-center justify-center shrink-0">
                            <LayoutTemplate className="w-5 h-5" />
                        </span>
                        <h2 className="text-2xl font-bold text-[#0B2A5B]">
                            Available Templates
                        </h2>
                    </div>

                    {flash?.success && (
                        <div className="mb-6 flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-xl p-4">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            {flash.success}
                        </div>
                    )}

                    {errors?.template && (
                        <div className="mb-6 flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 rounded-xl p-4">
                            <XCircle className="w-5 h-5 shrink-0" />
                            {errors.template}
                        </div>
                    )}

                    {/* Total templates card */}
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
                        <p className="text-gray-500 text-sm">Total Templates</p>

                        <h2 className="text-4xl font-bold text-[#1456B8] mt-2">
                            {templates.length}
                        </h2>
                    </div>

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
                                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:border-[#1456B8] focus:ring-4 focus:ring-blue-100"
                            />

                            <textarea
                                placeholder="Template Description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:border-[#1456B8] focus:ring-4 focus:ring-blue-100"
                                rows="3"
                            />

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-2xl bg-[#1456B8] px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-[#0B2A5B] disabled:opacity-60"
                            >
                                <Plus className="w-4 h-4" />
                                {processing ? 'Adding...' : 'Add Template'}
                            </button>
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-3 text-sm font-semibold text-gray-500">Name</th>
                                    <th className="text-left py-3 text-sm font-semibold text-gray-500">Description</th>
                                    <th className="text-left py-3 text-sm font-semibold text-gray-500">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {templates.map((template) => (
                                    <tr
                                        key={template.id}
                                        className="border-b border-gray-50 hover:bg-gray-50 transition"
                                    >
                                        <td className="py-4 font-medium text-[#0B2A5B]">
                                            {template.name}
                                        </td>

                                        <td className="py-4 text-gray-600">
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
                                                className="inline-flex items-center gap-1.5 text-red-600 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition text-sm font-semibold"
                                            >
                                                <Trash2 className="w-4 h-4" />
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
