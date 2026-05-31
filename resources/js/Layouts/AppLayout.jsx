import { Link } from '@inertiajs/react';
export default function AppLayout({ children }) {
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
// 1. Shows the top navbar with logo and menu links (Dashboard, Profile, Templates, Portfolio).
// 2. Handles navigation using Inertia Link components (so page changes are smooth, no full reload).
// 3. Displays each page’s actual content in the main section through children.