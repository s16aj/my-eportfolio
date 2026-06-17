import { Link, useForm, usePage } from '@inertiajs/react';

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h1 className="text-3xl font-bold text-[#0B2A5B] text-center">
                    Forgot Password
                </h1>

                <p className="text-gray-500 text-center mt-2">
                    Enter your email to receive a password reset link.
                </p>

                {flash?.success && (
                    <div className="mt-6 bg-green-50 text-green-700 border border-green-200 rounded-xl p-4">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={submit} className="mt-8 space-y-5">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full border border-gray-200 rounded-xl p-3"
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#1456B8] text-white py-3 rounded-xl font-semibold hover:bg-[#0B2A5B] transition"
                    >
                        Send Reset Link
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-6">
                    Remember your password?{' '}
                    <Link href="/login" className="text-[#1456B8] font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}