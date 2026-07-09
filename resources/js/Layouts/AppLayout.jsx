import { Link, usePage, router } from '@inertiajs/react';
import Logo from '../components/Logo';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const currentUrl = usePage().url;
    const user = auth?.user;

    const isActive = (href) =>
        href === '/dashboard' || href === '/admin'
            ? currentUrl === href
            : currentUrl.startsWith(href);

    const linkClass = (href) =>
        `px-3 py-2 rounded-lg transition ${
            isActive(href)
                ? 'text-[#1456B8] bg-blue-50 font-semibold'
                : 'text-gray-600 hover:text-[#1456B8] hover:bg-gray-50'
        }`;

    const adminNavLinks = [
        { href: '/admin', label: 'Admin Dashboard' },
        { href: '/admin/users', label: 'Users' },
        { href: '/admin/templates', label: 'Templates' },
    ];

    const studentNavLinks = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/profile', label: 'Profile' },
        { href: '/templates', label: 'Templates' },
        { href: '/portfolio', label: 'Portfolio' },
    ];

    const navLinks = user?.role === 'admin' ? adminNavLinks : studentNavLinks;

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    <Link href={user?.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-3 group">
                        <Logo size={44} />

                        <div className="leading-none">
                            <h1 className="text-xl font-extrabold tracking-tight">
                                <span className="text-[#1456B8]">MyE</span>
                                <span className="text-[#0B2A5B]">-Portfolio</span>
                            </h1>
                            <p className="text-[11px] text-gray-400 font-medium tracking-wide mt-1">
                                Student Portfolio Builder
                            </p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2 font-medium">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                                {link.label}
                            </Link>
                        ))}

                        <button
                            type="button"
                            onClick={() => router.post('/logout')}
                            className="ml-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-6">
                {children}
            </main>
        </div>
    );
}
