import { Link, usePage, router } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-white">
            {/* Top navigation shared across all pages */}
            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Brand logo and app name */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/logo-transparent.png"
                            alt="MyE-Portfolio Logo"
                            className="h-12 w-auto object-contain"
                        />

                        <h1 className="text-2xl font-bold text-[#0B2A5B]">
                            MyE-Portfolio
                        </h1>
                    </div>

                    {/* Primary navigation links */}
                    <div className="flex items-center gap-8 text-gray-600 font-medium">

                        {user?.role === 'admin' ? (
                            <>
                                <Link
                                    href="/admin"
                                    className="hover:text-[#1456B8] transition"
                                >
                                    Admin Dashboard
                                </Link>

                                <Link
                                    href="/admin/users"
                                    className="hover:text-[#1456B8] transition"
                                >
                                    Users
                                </Link>

                                <Link
                                    href="/admin/templates"
                                    className="hover:text-[#1456B8] transition"
                                >
                                    Templates
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/"
                                    className="hover:text-[#1456B8] transition"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    href="/profile"
                                    className="hover:text-[#1456B8] transition"
                                >
                                    Profile
                                </Link>

                                <Link
                                    href="/templates"
                                    className="hover:text-[#1456B8] transition"
                                >
                                    Templates
                                </Link>

                                <Link
                                    href="/portfolio"
                                    className="hover:text-[#1456B8] transition"
                                >
                                    Portfolio
                                </Link>
                            </>
                        )}

                        <button
                            type="button"
                            onClick={() => router.post('/logout')}
                            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                        >
                            Logout
                        </button>

                    </div>
                </div>
            </nav>

            {/* Page-specific content is injected here */}
            <main className="max-w-7xl mx-auto p-6">
                {children}
            </main>
        </div>
    );
}

//is the shared design around every page.

// AppLayout.jsx defines a reusable layout component that wraps around the content of each page.
// It includes a top navigation bar with links to different sections of the application,
// and a main content area where the specific page content will be rendered.
// This layout ensures a consistent look and feel across all pages of the application.
// The navigation links use Inertia's Link component to enable client-side navigation without full page reloads,
// enhancing the user experience.

//It does 3 things:
// 1. Shows the top navbar with logo and menu links.
// 2. Handles navigation using Inertia Link components (so page changes are smooth, no full reload).
// 3. Displays each page’s actual content in the main section through children.