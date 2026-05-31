import AppLayout from '../Layouts/AppLayout';

export default function Portfolio() {
    return (
        <AppLayout>
            <div className="space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-[#0B2A5B]">
                            Portfolio Preview
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Preview your portfolio before publishing.
                        </p>
                    </div>

                    <button className="bg-[#1456B8] hover:bg-[#0B2A5B] transition text-white px-6 py-3 rounded-xl font-semibold shadow-sm">
                        Publish Portfolio
                    </button>
                </div>

                {/* Portfolio Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-[#0B2A5B] via-[#1456B8] to-[#18B7B0] p-12 text-white">
                        
                        <div className="flex items-center gap-8">
                            
                            {/* Avatar */}
                            <div className="w-28 h-28 rounded-full bg-white text-[#1456B8] flex items-center justify-center text-5xl font-bold">
                                S
                            </div>

                            {/* Info */}
                            <div>
                                <h1 className="text-5xl font-bold">
                                    Saja Awad
                                </h1>

                                <p className="mt-3 text-xl text-blue-100">
                                    Software Engineering Student
                                </p>

                                <div className="flex gap-6 mt-5 text-sm text-blue-100">
                                    <span>📍 Benghazi, Libya</span>
                                    <span>✉️ saja@example.com</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Left Side */}
                        <div className="space-y-8">

                            {/* Skills */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#0B2A5B] mb-4">
                                    Skills
                                </h2>

                                <div className="flex flex-wrap gap-3">
                                    {[
                                        'Laravel',
                                        'React',
                                        'UI/UX',
                                        'Flutter',
                                        'MySQL',
                                    ].map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-[#EAF2FF] text-[#1456B8] px-4 py-2 rounded-full text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Contact */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#0B2A5B] mb-4">
                                    Contact
                                </h2>

                                <div className="space-y-3 text-gray-600">
                                    <p>📧 saja@example.com</p>
                                    <p>📱 +218 91 0000000</p>
                                    <p>🌐 linkedin.com/in/saja</p>
                                </div>
                            </div>

                        </div>

                        {/* Right Side */}
                        <div className="lg:col-span-2 space-y-10">

                            {/* About */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#0B2A5B] mb-4">
                                    About Me
                                </h2>

                                <p className="text-gray-600 leading-relaxed">
                                    Passionate software engineering student interested
                                    in web development, UI/UX design, and modern
                                    technologies. Experienced in building academic
                                    and portfolio-based systems using Laravel,
                                    React, and Flutter.
                                </p>
                            </div>

                            {/* Projects */}
                            <div>
                                <h2 className="text-2xl font-bold text-[#0B2A5B] mb-6">
                                    Projects
                                </h2>

                                <div className="space-y-5">

                                    <div className="border border-gray-100 rounded-2xl p-6">
                                        <h3 className="text-xl font-semibold text-[#1456B8]">
                                            MyE-Portfolio Platform
                                        </h3>

                                        <p className="text-gray-500 mt-3">
                                            Smart e-portfolio builder and hosting
                                            platform for students.
                                        </p>
                                    </div>

                                    <div className="border border-gray-100 rounded-2xl p-6">
                                        <h3 className="text-xl font-semibold text-[#1456B8]">
                                            University Archive System
                                        </h3>

                                        <p className="text-gray-500 mt-3">
                                            Digital archive management system with
                                            imports, dashboards, and hierarchy management.
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}