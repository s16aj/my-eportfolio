import { Link, useForm } from '@inertiajs/react';

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h1 className="text-3xl font-bold text-[#0B2A5B] text-center">
                    Login
                </h1>

                <p className="text-gray-500 text-center mt-2">
                    Welcome back to MyE-Portfolio.
                </p>

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

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full border border-gray-200 rounded-xl p-3"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#1456B8] text-white py-3 rounded-xl font-semibold hover:bg-[#0B2A5B] transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-6">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-[#1456B8] font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}