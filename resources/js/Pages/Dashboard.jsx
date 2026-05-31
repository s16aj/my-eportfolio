import AppLayout from '../Layouts/AppLayout';

export default function Dashboard() {
    const cards = [
        {
            title: 'Profile Completion',
            value: '80%',
            description: 'Complete your profile information.',
            color: 'text-[#18B7B0]',
        },
        {
            title: 'Selected Template',
            value: 'Modern CV',
            description: 'You can change your template anytime.',
            color: 'text-[#1456B8]',
        },
        {
            title: 'Portfolio Status',
            value: 'Published',
            description: 'Your portfolio is currently online.',
            color: 'text-[#6B46C1]',
        },
        {
            title: 'Profile Views',
            value: '124',
            description: 'People visited your portfolio.',
            color: 'text-[#1456B8]',
        },
    ];

    return (
        <AppLayout>
            <div className="space-y-8">

                {/* Hero Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 flex items-center justify-between">
                    
                    <div className="max-w-2xl">
                        <h1 className="text-5xl font-bold text-[#0B2A5B] leading-tight">
                            Welcome Back! 👋
                        </h1>

                        <p className="mt-5 text-lg text-gray-500">
                            Manage your portfolio, templates, profile,
                            and showcase your professional journey easily.
                        </p>

                        <button className="mt-8 bg-[#1456B8] hover:bg-[#0B2A5B] transition text-white px-7 py-3 rounded-xl font-semibold shadow-sm">
                            Improve Your Profile
                        </button>
                    </div>

                    <div className="hidden lg:block">
                        <img
                            src="/images/logo.png"
                            alt="Dashboard"
                            className="w-72 opacity-95"
                        />
                    </div>
                </div>

                {/* Dashboard Cards */}
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

                {/* Recent Activity */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-[#0B2A5B]">
                            Recent Activity
                        </h2>

                        <button className="border border-[#1456B8] text-[#1456B8] px-5 py-2 rounded-xl hover:bg-[#1456B8] hover:text-white transition">
                            View All
                        </button>
                    </div>

                    <div className="mt-8 divide-y divide-gray-100">

                        <div className="py-5 flex items-center justify-between">
                            <span className="text-gray-700">
                                Updated profile information
                            </span>

                            <span className="text-sm text-gray-400">
                                2 hours ago
                            </span>
                        </div>

                        <div className="py-5 flex items-center justify-between">
                            <span className="text-gray-700">
                                Changed portfolio template
                            </span>

                            <span className="text-sm text-gray-400">
                                Yesterday
                            </span>
                        </div>

                        <div className="py-5 flex items-center justify-between">
                            <span className="text-gray-700">
                                Published portfolio successfully
                            </span>

                            <span className="text-sm text-gray-400">
                                3 days ago
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}