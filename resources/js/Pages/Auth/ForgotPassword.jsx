import { Link, useForm, usePage } from '@inertiajs/react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import GuestLayout from '../../Layouts/GuestLayout';
import IconInput from '../../components/IconInput';

export default function ForgotPassword() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <GuestLayout title="Forgot Password" description="Enter your email to receive a password reset link.">
            {flash?.success && (
                <div className="mt-6 flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-xl p-4">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    {flash.success}
                </div>
            )}

            <form onSubmit={submit} className="mt-8 space-y-5">
                <IconInput
                    icon={Mail}
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                />

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1456B8] text-white py-3 rounded-xl font-semibold hover:bg-[#0B2A5B] transition disabled:opacity-60"
                >
                    <Send className="w-4 h-4" />
                    {processing ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>

            <p className="text-center text-gray-500 mt-6">
                Remember your password?{' '}
                <Link href="/login" className="text-[#1456B8] font-semibold hover:underline">
                    Login
                </Link>
            </p>
        </GuestLayout>
    );
}
