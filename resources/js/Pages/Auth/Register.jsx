import { Link, useForm } from '@inertiajs/react';
import { User, Mail, UserPlus } from 'lucide-react';
import GuestLayout from '../../Layouts/GuestLayout';
import IconInput from '../../components/IconInput';
import PasswordInput from '../../components/PasswordInput';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <GuestLayout title="Register" description="Create your MyE-Portfolio account.">
            <form onSubmit={submit} className="mt-8 space-y-5">
                <IconInput
                    icon={User}
                    type="text"
                    placeholder="Full Name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                />

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

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1456B8] text-white py-3 rounded-xl font-semibold hover:bg-[#0B2A5B] transition disabled:opacity-60"
                >
                    <UserPlus className="w-4 h-4" />
                    {processing ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>

            <p className="text-center text-gray-500 mt-6">
                Already have an account?{' '}
                <Link href="/login" className="text-[#1456B8] font-semibold hover:underline">
                    Login
                </Link>
            </p>
        </GuestLayout>
    );
}
