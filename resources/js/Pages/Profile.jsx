import AppLayout from '../Layouts/AppLayout';
import { useForm, usePage } from '@inertiajs/react';

export default function Profile({ user, profile }) {

    const { data, setData, post, processing, errors } = useForm({
        full_name: user?.name || '',
        email: user?.email || '',
        university: profile?.university || '',
        major: profile?.major || '',
        bio: profile?.bio || '',
        skills: '',
    });

    const { flash } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/profile');
    };

    return (
        <AppLayout>
            <div className="space-y-8">

                <div>
                    <h1 className="text-4xl font-bold text-[#0B2A5B]">
                        My Profile
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your personal information and portfolio details.
                    </p>
                </div>

                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-2xl">
                        {flash.success}
                    </div>
                )}
                
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
                >
                    <div className="flex items-center gap-6 mb-10">
                        <div className="w-24 h-24 rounded-full bg-[#1456B8] text-white flex items-center justify-center text-3xl font-bold">
                            S
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-[#0B2A5B]">
                                Saja Awad
                            </h2>
                            <p className="text-gray-500">
                                Software Engineering Student
                            </p>
                            <button
                                type="button"
                                className="mt-3 px-5 py-2 bg-[#1456B8] text-white rounded-xl hover:bg-[#0B2A5B] transition"
                            >
                                Upload Photo
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="Full Name"
                            type="text"
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            error={errors.full_name}
                            placeholder="Enter your full name"
                        />

                        <InputField
                            label="Email Address"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                            placeholder="Enter your email"
                        />

                        <InputField
                            label="University"
                            type="text"
                            value={data.university}
                            onChange={(e) => setData('university', e.target.value)}
                            error={errors.university}
                            placeholder="Your university"
                        />

                        <InputField
                            label="Major"
                            type="text"
                            value={data.major}
                            onChange={(e) => setData('major', e.target.value)}
                            error={errors.major}
                            placeholder="Your major"
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Professional Bio
                        </label>
                        <textarea
                            rows="5"
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            placeholder="Write a short professional bio..."
                            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1456B8]"
                        />
                        {errors.bio && (
                            <p className="text-red-500 text-sm mt-2">{errors.bio}</p>
                        )}
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Skills
                        </label>
                        <input
                            type="text"
                            value={data.skills}
                            onChange={(e) => setData('skills', e.target.value)}
                            placeholder="Laravel, React, UI/UX..."
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1456B8]"
                        />
                        {errors.skills && (
                            <p className="text-red-500 text-sm mt-2">{errors.skills}</p>
                        )}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#1456B8] hover:bg-[#0B2A5B] disabled:opacity-60 transition text-white px-8 py-3 rounded-xl font-semibold shadow-sm"
                        >
                            {processing ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

function InputField({ label, type, value, onChange, error, placeholder }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1456B8]"
            />

            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </div>
    );
}