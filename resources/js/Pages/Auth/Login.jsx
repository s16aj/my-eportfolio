import { Link, useForm } from '@inertiajs/react';
import { Mail, LogIn } from 'lucide-react';
import GuestLayout from '../../Layouts/GuestLayout';
import IconInput from '../../components/IconInput';
import PasswordInput from '../../components/PasswordInput';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <GuestLayout title="Login" description="Welcome back to MyE-Portfolio.">
            <form onSubmit={submit} className="mt-8 space-y-5">
                <IconInput
                    icon={Mail}
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                />

                <PasswordInput
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                />

                <div className="flex justify-end">
                    <Link href="/forgot-password" className="text-sm text-[#1456B8] font-semibold hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1456B8] text-white py-3 rounded-xl font-semibold hover:bg-[#0B2A5B] transition disabled:opacity-60"
                >
                    <LogIn className="w-4 h-4" />
                    {processing ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <p className="text-center text-gray-500 mt-6">
                Don't have an account?{' '}
                <Link href="/register" className="text-[#1456B8] font-semibold hover:underline">
                    Register
                </Link>
            </p>
        </GuestLayout>
    );
}
