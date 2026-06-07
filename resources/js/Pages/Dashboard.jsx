import AppLayout from '../Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function Dashboard({ user, profile, stats }) {
    const profileFields = [
        profile?.bio,
        profile?.phone,
        profile?.location,
        profile?.linkedin_url,
        profile?.github_url,
        profile?.website_url,
    ];

    const completedFields = profileFields.filter(Boolean).length;

    const profileCompletion = Math.round(
        (completedFields / profileFields.length) * 100
    );

    const cards = [
        {
            title: 'Profile Completion',
            value: `${profileCompletion}%`,
            description: 'Complete your personal and contact information.',
            color: 'text-[#18B7B0]',
        },
        {
            title: 'Education Records',
            value: stats?.educations || 0,
            description: 'Education entries added to your profile.',
            color: 'text-[#1456B8]',
        },
        {
            title: 'Skills',
            value: stats?.skills || 0,
            description: 'Skills added to your portfolio profile.',
            color: 'text-[#6B46C1]',
        },
        {
            title: 'Projects',
            value: stats?.projects || 0,
            description: 'Projects ready to appear in your portfolio.',
            color: 'text-[#1456B8]',
        },
    ];

    return (
        <AppLayout>
            <div className="space-y-8 pb-10">
                <div className="bg-gradient-to-r from-[#1456B8] to-[#0B2A5B] rounded-3xl shadow-lg p-10 flex items-center justify-between text-white">
                    <div className="max-w-2xl">
                        <p className="text-blue-100 font-semibold mb-3">
                            Student Dashboard
                        </p>

                        <h1 className="text-5xl font-bold leading-tight">
                            Welcome Back, {user?.name || 'Student'} 👋
                        </h1>

                        <p className="mt-5 text-lg text-blue-100">
                            Manage your profile data, education, skills, and projects from one place.
                        </p>

                        <Link
                            href="/profile"
                            className="inline-block mt-8 bg-white text-[#1456B8] hover:bg-blue-50 transition px-7 py-3 rounded-xl font-semibold shadow-sm"
                        >
                            Improve Your Profile
                        </Link>
                    </div>

                    <div className="hidden lg:block">
                        <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-5xl font-bold">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
                        >
                            <h2 className="text-gray-500 font-medium">
                                {card.title}
                            </h2>

                            <p className={`text-4xl font-bold mt-4 ${card.color}`}>
                                {card.value}
                            </p>

                            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <h2 className="text-2xl font-bold text-[#0B2A5B]">
                        Portfolio Data Summary
                    </h2>

                    <p className="text-gray-500 mt-2">
                        These records will be used later to auto-fill your portfolio templates.
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                            <h3 className="font-bold text-[#0B2A5B]">
                                Education
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Add your academic background and study history.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                            <h3 className="font-bold text-[#0B2A5B]">
                                Skills
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Add your technical and professional skills.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                            <h3 className="font-bold text-[#0B2A5B]">
                                Projects
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Add your academic, personal, or professional projects.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}