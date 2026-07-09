import AppLayout from '../Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import {
    GraduationCap,
    Wrench,
    FolderKanban,
    BarChart3,
    Eye,
    Clock,
    LayoutGrid,
    ArrowRight,
} from 'lucide-react';

export default function Dashboard({
    user,
    profile,
    portfolio,
    stats,
    analytics,
}) {
    // Calculate full portfolio completion percentage
    const portfolioCompletionItems = [
        profile?.bio ? 15 : 0,
        profile?.phone ? 10 : 0,
        profile?.location ? 10 : 0,
        (stats?.educations || 0) > 0 ? 15 : 0,
        (stats?.skills || 0) > 0 ? 15 : 0,
        (stats?.projects || 0) > 0 ? 15 : 0,
        portfolio?.template_id ? 10 : 0,
        portfolio?.is_published ? 10 : 0,
    ];

    const portfolioCompletion = portfolioCompletionItems.reduce(
        (total, value) => total + value,
        0
    );

    const lastViewedDate = analytics?.last_viewed_at
        ? String(analytics.last_viewed_at).split('T')[0]
        : 'No views yet';

    const cards = [
        {
            title: 'Portfolio Completion',
            value: `${portfolioCompletion}%`,
            description:
                'Complete your profile, portfolio content, template, and publishing steps.',
            icon: BarChart3,
            accent: 'bg-teal-50 text-teal-600',
            valueColor: 'text-teal-600',
        },
        {
            title: 'Education Records',
            value: stats?.educations || 0,
            description: 'Education entries added to your profile.',
            icon: GraduationCap,
            accent: 'bg-blue-50 text-[#1456B8]',
            valueColor: 'text-[#1456B8]',
        },
        {
            title: 'Skills',
            value: stats?.skills || 0,
            description: 'Skills added to your portfolio profile.',
            icon: Wrench,
            accent: 'bg-purple-50 text-purple-600',
            valueColor: 'text-purple-600',
        },
        {
            title: 'Projects',
            value: stats?.projects || 0,
            description: 'Projects ready to appear in your portfolio.',
            icon: FolderKanban,
            accent: 'bg-blue-50 text-[#1456B8]',
            valueColor: 'text-[#1456B8]',
        },
    ];

    const dataSummaryItems = [
        {
            title: 'Education',
            description: 'Add your academic background and study history.',
            icon: GraduationCap,
            iconColor: 'text-[#1456B8]',
        },
        {
            title: 'Skills',
            description: 'Add your technical and professional skills.',
            icon: Wrench,
            iconColor: 'text-purple-600',
        },
        {
            title: 'Projects',
            description: 'Add your academic, personal, or professional projects.',
            icon: FolderKanban,
            iconColor: 'text-[#1456B8]',
        },
    ];

    return (
        <AppLayout>
            <div className="space-y-6 pb-10">
                {/* Hero section */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#1456B8] to-[#0B2A5B] rounded-3xl shadow-xl p-8 md:p-10 text-white">
                    <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
                    <div className="absolute -bottom-24 -right-6 w-72 h-72 rounded-full bg-white/5" />

                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="max-w-2xl text-center md:text-left">
                            <p className="text-blue-100/90 font-semibold tracking-widest uppercase text-xs mb-3">
                                Student Dashboard
                            </p>

                            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                Welcome Back, {user?.name || 'Student'}
                            </h1>

                            <p className="mt-4 text-blue-100/90">
                                Manage your profile data, education, skills, and projects from one place.
                            </p>

                            <Link
                                href="/profile"
                                className="inline-flex items-center gap-2 mt-7 bg-white text-[#1456B8] hover:bg-blue-50 transition px-6 py-3 rounded-xl font-semibold shadow-sm"
                            >
                                Improve Your Profile
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="shrink-0">
                            {profile?.profile_image ? (
                                <img
                                    src={`/storage/${profile.profile_image}`}
                                    alt="Profile"
                                    className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white/30 shadow-lg"
                                />
                            ) : (
                                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white/15 flex items-center justify-center text-4xl md:text-5xl font-bold border-4 border-white/30 shadow-lg">
                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Statistics cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
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
                                    {card.value}
                                </p>

                                {card.title === 'Portfolio Completion' && (
                                    <div className="mt-4 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-teal-500 rounded-full transition-all"
                                            style={{ width: `${portfolioCompletion}%` }}
                                        />
                                    </div>
                                )}

                                <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Engagement Analytics */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-blue-50 text-[#1456B8] flex items-center justify-center">
                            <BarChart3 className="w-5 h-5" />
                        </span>
                        <h2 className="text-2xl font-bold text-[#0B2A5B]">
                            Engagement Analytics
                        </h2>
                    </div>

                    <p className="text-gray-500 mt-2">
                        Basic statistics about visits to your published portfolio.
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5 flex items-start gap-4">
                            <span className="w-11 h-11 rounded-xl bg-white text-[#1456B8] flex items-center justify-center shadow-sm shrink-0">
                                <Eye className="w-5 h-5" />
                            </span>
                            <div>
                                <h3 className="text-gray-500 font-medium">
                                    Total Views
                                </h3>
                                <p className="text-4xl font-bold text-[#1456B8] mt-1">
                                    {analytics?.total_views || 0}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5 flex items-start gap-4">
                            <span className="w-11 h-11 rounded-xl bg-white text-[#0B2A5B] flex items-center justify-center shadow-sm shrink-0">
                                <Clock className="w-5 h-5" />
                            </span>
                            <div>
                                <h3 className="text-gray-500 font-medium">
                                    Last Viewed
                                </h3>
                                <p className="text-2xl font-bold text-[#0B2A5B] mt-1">
                                    {lastViewedDate}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Portfolio Data Summary */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-blue-50 text-[#1456B8] flex items-center justify-center">
                            <LayoutGrid className="w-5 h-5" />
                        </span>
                        <h2 className="text-2xl font-bold text-[#0B2A5B]">
                            Portfolio Data Summary
                        </h2>
                    </div>

                    <p className="text-gray-500 mt-2">
                        These records will be used later to auto-fill your portfolio templates.
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {dataSummaryItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className="rounded-2xl bg-gray-50 border border-gray-100 p-5 hover:bg-white hover:shadow-md transition"
                                >
                                    <span className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm ${item.iconColor}`}>
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <h3 className="font-bold text-[#0B2A5B] mt-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
