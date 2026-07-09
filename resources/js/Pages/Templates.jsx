import AppLayout from '../Layouts/AppLayout';
import { router, usePage } from '@inertiajs/react';
import { LayoutGrid, FileText, Palette, CheckCircle2, Sparkles } from 'lucide-react';

const TEMPLATE_PRESETS = {
    'Modern Portfolio': {
        icon: LayoutGrid,
        accent: 'text-[#1456B8] bg-blue-50',
        barClass: 'bg-gradient-to-r from-[#1456B8] to-[#18B7B0]',
        fallbackDescription: 'A clean, balanced layout with a centered profile header — great for a well-rounded portfolio.',
        preview: (
            <div className="h-48 bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#1456B8] shadow-lg shadow-blue-200" />
                <div className="w-24 h-2.5 rounded-full bg-[#0B2A5B]/80" />
                <div className="w-32 h-2 rounded-full bg-gray-200" />
                <div className="flex gap-2 mt-1">
                    <div className="w-10 h-6 rounded-lg bg-white border border-blue-100 shadow-sm" />
                    <div className="w-10 h-6 rounded-lg bg-white border border-blue-100 shadow-sm" />
                    <div className="w-10 h-6 rounded-lg bg-white border border-blue-100 shadow-sm" />
                </div>
            </div>
        ),
    },
    'Classic CV': {
        icon: FileText,
        accent: 'text-gray-700 bg-gray-100',
        barClass: 'bg-gray-900',
        fallbackDescription: 'A formal, print-style resume layout with clear sections — ideal for a traditional CV look.',
        preview: (
            <div className="h-48 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_23px,rgba(0,0,0,0.05)_24px)] flex flex-col items-center justify-center gap-4 px-8">
                <div className="w-full border-b-2 border-gray-900 pb-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-900 shrink-0" />
                    <div className="space-y-1.5 w-full">
                        <div className="w-28 h-2.5 bg-gray-900" />
                        <div className="w-20 h-1.5 bg-gray-400" />
                    </div>
                </div>
                <div className="w-full space-y-1.5">
                    <div className="w-full h-1.5 bg-gray-300" />
                    <div className="w-3/4 h-1.5 bg-gray-300" />
                </div>
            </div>
        ),
    },
    'Creative Portfolio': {
        icon: Palette,
        accent: 'text-purple-600 bg-purple-50',
        barClass: 'bg-gradient-to-r from-[#0B2A5B] via-[#1456B8] to-purple-500',
        fallbackDescription: 'A bold, colorful layout with a highlighted projects grid — great for standing out visually.',
        preview: (
            <div className="h-48 flex flex-col">
                <div className="h-20 bg-gradient-to-r from-[#0B2A5B] to-[#1456B8] flex items-center gap-3 px-6 relative overflow-hidden">
                    <div className="absolute -right-4 -top-6 w-20 h-20 rounded-full bg-white/10" />
                    <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/50" />
                    <div className="w-24 h-2.5 rounded-full bg-white/80" />
                </div>
                <div className="flex-1 bg-[#F8FAFC] grid grid-cols-3 gap-2 p-4">
                    <div className="rounded-lg bg-teal-100 border border-teal-200" />
                    <div className="rounded-lg bg-white border border-gray-100 col-span-2 shadow-sm" />
                    <div className="rounded-lg bg-purple-100 border border-purple-200 col-span-2" />
                    <div className="rounded-lg bg-blue-100 border border-blue-200" />
                </div>
            </div>
        ),
    },
};

const DEFAULT_PRESET = {
    icon: Sparkles,
    accent: 'text-[#1456B8] bg-blue-50',
    barClass: 'bg-gradient-to-r from-[#0B2A5B] via-[#1456B8] to-[#18B7B0]',
    fallbackDescription: 'Portfolio template for students and graduates.',
    preview: (
        <div className="h-48 bg-gradient-to-br from-[#0B2A5B] via-[#1456B8] to-[#18B7B0]" />
    ),
};

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

                        const preset = TEMPLATE_PRESETS[template.name] || DEFAULT_PRESET;
                        const Icon = preset.icon;

                        return (
                            <div
                                key={template.id}
                                className={`relative bg-white rounded-3xl border shadow-sm overflow-hidden transition hover:shadow-lg hover:-translate-y-0.5 ${
                                    isSelected
                                        ? 'border-[#18B7B0] ring-2 ring-[#18B7B0]/40'
                                        : 'border-gray-100'
                                }`}
                            >
                                {isSelected && (
                                    <div className="absolute top-4 right-4 z-10 bg-[#18B7B0] text-white rounded-full p-1 shadow-md">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                )}

                                <div className={`h-1 ${preset.barClass}`} />
                                {preset.preview}

                                <div className="p-6">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${preset.accent}`}>
                                            <Icon className="w-4 h-4" />
                                        </span>
                                        <h2 className="text-xl font-bold text-[#0B2A5B]">
                                            {template.name}
                                        </h2>
                                    </div>

                                    <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                                        {template.description || preset.fallbackDescription}
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
