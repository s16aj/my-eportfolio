import { Link } from '@inertiajs/react';
import Logo from '../components/Logo';
import {
    User,
    LayoutTemplate,
    Globe,
    BarChart3,
    ShieldCheck,
    Sparkles,
    ArrowRight,
} from 'lucide-react';

const FEATURES = [
    {
        icon: User,
        title: 'Build Your Profile',
        description: 'Add your bio, contact details, education, skills, and projects — all in one organized place.',
        accent: 'bg-blue-50 text-[#1456B8]',
    },
    {
        icon: LayoutTemplate,
        title: 'Choose a Template',
        description: 'Pick from Modern, Classic CV, or Creative layouts to match how you want to present yourself.',
        accent: 'bg-purple-50 text-purple-600',
    },
    {
        icon: Globe,
        title: 'Publish & Share',
        description: 'Publish your portfolio to a public link you can share with recruiters, professors, or peers.',
        accent: 'bg-teal-50 text-teal-600',
    },
    {
        icon: BarChart3,
        title: 'Track Engagement',
        description: 'See how many people viewed your published portfolio and when it was last visited.',
        accent: 'bg-blue-50 text-[#1456B8]',
    },
    {
        icon: ShieldCheck,
        title: 'Secure Accounts',
        description: 'Your data is protected behind a standard login, with admin oversight for the platform.',
        accent: 'bg-purple-50 text-purple-600',
    },
    {
        icon: Sparkles,
        title: 'Professional Design',
        description: 'Clean, consistent layouts designed to look polished in front of recruiters and reviewers.',
        accent: 'bg-teal-50 text-teal-600',
    },
];

const STEPS = [
    {
        number: '01',
        title: 'Create your account',
        description: 'Sign up and fill in your profile, education, skills, and projects.',
    },
    {
        number: '02',
        title: 'Pick a template',
        description: 'Choose the design that best fits how you want to showcase your work.',
    },
    {
        number: '03',
        title: 'Publish & share',
        description: 'Go live with one click and share your portfolio link with anyone.',
    },
];

export default function Welcome() {
    return (
        <div className="min-h-screen bg-white">
            {/* Top nav */}
            <nav className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Logo size={40} />
                        <span className="text-lg font-extrabold tracking-tight">
                            <span className="text-[#1456B8]">MyE</span>
                            <span className="text-[#0B2A5B]">-Portfolio</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#1456B8] transition"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="px-5 py-2.5 rounded-xl bg-[#1456B8] text-white text-sm font-semibold shadow-sm hover:bg-[#0B2A5B] transition"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-50 rounded-full blur-3xl -z-10" />

                <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
                    <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#1456B8] bg-blue-50 px-4 py-1.5 rounded-full">
                        <Sparkles className="w-4 h-4" />
                        Built for students and graduates
                    </p>

                    <h1 className="mt-6 text-4xl md:text-6xl font-bold text-[#0B2A5B] leading-tight">
                        Showcase your work.<br />Connect with opportunity.
                    </h1>

                    <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        MyE-Portfolio helps students and graduates build a professional online portfolio —
                        your education, skills, and projects, presented the way you choose.
                    </p>

                    <div className="mt-9 flex items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#1456B8] text-white font-semibold shadow-md shadow-blue-200 hover:bg-[#0B2A5B] transition"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <Link
                            href="/login"
                            className="px-7 py-3.5 rounded-xl border border-gray-200 text-[#0B2A5B] font-semibold hover:bg-gray-50 transition"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-[#0B2A5B]">
                        Everything you need to stand out
                    </h2>
                    <p className="mt-3 text-gray-500">
                        A simple set of tools to help you build, publish, and share a portfolio you're proud of.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map(({ icon: Icon, title, description, accent }) => (
                        <div
                            key={title}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                        >
                            <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent}`}>
                                <Icon className="w-5 h-5" />
                            </span>

                            <h3 className="mt-4 font-bold text-[#0B2A5B]">
                                {title}
                            </h3>

                            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-[#0B2A5B]">
                            How it works
                        </h2>
                        <p className="mt-3 text-gray-500">
                            Three simple steps from sign-up to a published portfolio.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {STEPS.map((step) => (
                            <div key={step.number} className="text-center">
                                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1456B8] text-white flex items-center justify-center text-lg font-bold shadow-md shadow-blue-200">
                                    {step.number}
                                </div>

                                <h3 className="mt-5 font-bold text-[#0B2A5B]">
                                    {step.title}
                                </h3>

                                <p className="mt-2 text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="max-w-5xl mx-auto px-6 py-20">
                <div className="relative overflow-hidden bg-gradient-to-br from-[#1456B8] to-[#0B2A5B] rounded-3xl shadow-xl p-10 md:p-14 text-center text-white">
                    <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
                    <div className="absolute -bottom-24 -left-10 w-72 h-72 rounded-full bg-white/5" />

                    <h2 className="relative text-3xl md:text-4xl font-bold">
                        Ready to build your portfolio?
                    </h2>

                    <p className="relative mt-4 text-blue-100 max-w-xl mx-auto">
                        Create your free account and have a shareable portfolio ready in minutes.
                    </p>

                    <Link
                        href="/register"
                        className="relative inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-xl bg-white text-[#1456B8] font-semibold shadow-sm hover:bg-blue-50 transition"
                    >
                        Create Your Account
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Logo size={28} />
                        <span className="text-sm font-semibold text-gray-500">
                            MyE-Portfolio
                        </span>
                    </div>

                    <p className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} MyE-Portfolio. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
