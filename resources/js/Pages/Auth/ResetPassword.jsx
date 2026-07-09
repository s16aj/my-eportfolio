import { useForm } from '@inertiajs/react';
import { Mail, KeyRound } from 'lucide-react';
import GuestLayout from '../../Layouts/GuestLayout';
import IconInput from '../../components/IconInput';
import PasswordInput from '../../components/PasswordInput';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email || '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/reset-password');
    };

    return (
        <GuestLayout title="Reset Password" description="Enter your email and new password.">
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
                    placeholder="New Password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                />

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1456B8] text-white py-3 rounded-xl font-semibold hover:bg-[#0B2A5B] transition disabled:opacity-60"
                >
                    <KeyRound className="w-4 h-4" />
                    {processing ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </GuestLayout>
    );
}
