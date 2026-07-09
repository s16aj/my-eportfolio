import Logo from '../components/Logo';

export default function GuestLayout({ title, description, children }) {
    return (
        <div className="min-h-screen flex bg-white">
            {/* Branded panel */}
            <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden bg-gradient-to-br from-[#1456B8] to-[#0B2A5B] text-white flex-col justify-between p-12">
                <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5" />
                <div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-white/5" />

                <div className="relative flex items-center gap-3">
                    <Logo size={48} />
                    <span className="text-xl font-extrabold tracking-tight">
                        MyE-Portfolio
                    </span>
                </div>

                <div className="relative">
                    <h2 className="text-4xl font-bold leading-tight">
                        Showcase. Connect. Succeed.
                    </h2>
                    <p className="mt-4 text-blue-100 max-w-sm leading-relaxed">
                        Build a professional portfolio that highlights your education, skills, and projects — all in one place.
                    </p>
                </div>

                <p className="relative text-xs text-blue-200">
                    &copy; {new Date().getFullYear()} MyE-Portfolio
                </p>
            </div>

            {/* Form panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50 lg:bg-white">
                <div className="w-full max-w-md">
                    <div className="flex lg:hidden justify-center mb-6">
                        <Logo size={56} />
                    </div>

                    <h1 className="text-3xl font-bold text-[#0B2A5B] text-center lg:text-left">
                        {title}
                    </h1>

                    {description && (
                        <p className="text-gray-500 mt-2 text-center lg:text-left">
                            {description}
                        </p>
                    )}

                    {children}
                </div>
            </div>
        </div>
    );
}
