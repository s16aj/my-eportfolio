import AppLayout from '../Layouts/AppLayout';

export default function Templates() {
    const templates = [
        {
            name: 'Modern CV',
            description: 'Clean and professional layout for students and graduates.',
            selected: true,
        },
        {
            name: 'Creative Portfolio',
            description: 'A visual design for projects, skills, and achievements.',
            selected: false,
        },
        {
            name: 'Academic Profile',
            description: 'Best for education history, research, and certificates.',
            selected: false,
        },
    ];

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {templates.map((template, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition"
                        >
                            <div className="h-48 bg-gradient-to-br from-[#0B2A5B] via-[#1456B8] to-[#18B7B0]"></div>

                            <div className="p-6">
                                <h2 className="text-xl font-bold text-[#0B2A5B]">
                                    {template.name}
                                </h2>

                                <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                                    {template.description}
                                </p>

                                <button
                                    className={`mt-6 w-full py-3 rounded-xl font-semibold transition ${
                                        template.selected
                                            ? 'bg-[#18B7B0] text-white'
                                            : 'bg-[#1456B8] text-white hover:bg-[#0B2A5B]'
                                    }`}
                                >
                                    {template.selected ? 'Selected' : 'Use Template'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}