import AppLayout from '../../Layouts/AppLayout';
import { Users, FolderKanban, LayoutTemplate, Globe } from 'lucide-react';

export default function Dashboard({
    totalUsers,
    totalPortfolios,
    totalTemplates,
    publishedPortfolios
}) {
    const cards = [
        {
            title: 'Total Users',
            value: totalUsers,
            description: 'All registered users in the system.',
            icon: Users,
            accent: 'bg-teal-50 text-teal-600',
            valueColor: 'text-teal-600',
        },
        {
            title: 'Total Portfolios',
            value: totalPortfolios,
            description: 'All created portfolios.',
            icon: FolderKanban,
            accent: 'bg-blue-50 text-[#1456B8]',
            valueColor: 'text-[#1456B8]',
        },
        {
            title: 'Total Templates',
            value: totalTemplates,
            description: 'Available portfolio templates.',
            icon: LayoutTemplate,
            accent: 'bg-purple-50 text-purple-600',
            valueColor: 'text-purple-600',
        },
        {
            title: 'Published Portfolios',
            value: publishedPortfolios,
            description: 'Portfolios published by students.',
            icon: Globe,
            accent: 'bg-blue-50 text-[#1456B8]',
            valueColor: 'text-[#1456B8]',
        },
    ];

    return (
        <AppLayout>
            <div className="space-y-6 pb-10">
                <div className="relative overflow-hidden bg-gradient-to-br from-[#1456B8] to-[#0B2A5B] rounded-3xl shadow-xl p-8 md:p-10 text-white">
                    <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
                    <div className="absolute -bottom-24 -right-6 w-72 h-72 rounded-full bg-white/5" />

                    <div className="relative">
                        <p className="text-blue-100/90 font-semibold tracking-widest uppercase text-xs mb-3">
                            Admin Dashboard
                        </p>

                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                            Welcome, Admin
                        </h1>

                        <p className="mt-4 text-blue-100/90">
                            Manage users, templates, and portfolio activity from one place.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {cards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-gray-500 font-medium text-sm">
                                        {card.title}
                                    </h2>
                                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.accent}`}>
                                        <Icon className="w-5 h-5" />
                                    </span>
                                </div>

                                <p className={`text-4xl font-bold mt-4 ${card.valueColor}`}>
                                    {card.value || 0}
                                </p>

                                <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
