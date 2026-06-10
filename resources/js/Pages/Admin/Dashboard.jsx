import AppLayout from '../../Layouts/AppLayout';

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
            color: 'text-[#18B7B0]',
        },
        {
            title: 'Total Portfolios',
            value: totalPortfolios,
            description: 'All created portfolios.',
            color: 'text-[#1456B8]',
        },
        {
            title: 'Total Templates',
            value: totalTemplates,
            description: 'Available portfolio templates.',
            color: 'text-[#6B46C1]',
        },
        {
            title: 'Published Portfolios',
            value: publishedPortfolios,
            description: 'Portfolios published by students.',
            color: 'text-[#1456B8]',
        },
    ];

    return (
        <AppLayout>
            <div className="space-y-8 pb-10">
                <div className="bg-gradient-to-r from-[#1456B8] to-[#0B2A5B] rounded-3xl shadow-lg p-10 text-white">
                    <p className="text-blue-100 font-semibold mb-3">
                        Admin Dashboard
                    </p>

                    <h1 className="text-5xl font-bold leading-tight">
                        Welcome, Admin 👋
                    </h1>

                    <p className="mt-5 text-lg text-blue-100">
                        Manage users, templates, and portfolio activity from one place.
                    </p>
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
                                {card.value || 0}
                            </p>

                            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}