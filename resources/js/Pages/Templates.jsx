import AppLayout from '../Layouts/AppLayout';
import { router, usePage } from '@inertiajs/react';

export default function Templates({ templates, portfolio }) {
    const { flash } = usePage().props;

    const selectTemplate = (templateId) => {
        router.post(`/templates/${templateId}/select`);
    };

    return (
        <AppLayout>
            <div className="space-y-8">

                <div>
                    <h1 className="text-4xl font-bold text-[#0B2A5B]">
                        Choose Template
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Select a design for your published portfolio.
                    </p>
                </div>

                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-2xl">
                        {flash.success}
                    </div>
                )}

                {portfolio?.template && (
                    <div className="bg-blue-50 border border-blue-200 text-blue-700 px-5 py-4 rounded-2xl">
                        Current Template:
                        <span className="font-bold ml-2">
                            {portfolio.template.name}
                        </span>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {templates.map((template) => {
                        const isSelected =
                            portfolio?.template_id === template.id;

                        return (
                            <div
                                key={template.id}
                                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition"
                            >
                                <div className="h-48 bg-gradient-to-br from-[#0B2A5B] via-[#1456B8] to-[#18B7B0]"></div>

                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-[#0B2A5B]">
                                        {template.name}
                                    </h2>

                                    <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                                        Portfolio template for students and graduates.
                                    </p>

                                    <button
                                        onClick={() => selectTemplate(template.id)}
                                        className={`mt-6 w-full py-3 rounded-xl font-semibold transition ${
                                            isSelected
                                                ? 'bg-[#18B7B0] text-white'
                                                : 'bg-[#1456B8] text-white hover:bg-[#0B2A5B]'
                                        }`}
                                    >
                                        {isSelected
                                            ? 'Selected'
                                            : 'Use Template'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}