import AppLayout from '../Layouts/AppLayout';
import { useForm, usePage, router } from '@inertiajs/react';

import FormSection from '../components/FormSection';
import FormInput from '../components/FormInput';
import FormTextarea from '../components/FormTextarea';
import PrimaryButton from '../components/PrimaryButton';

export default function Profile({ user, profile, educations = [], skills = [], projects = [] }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        full_name: user?.name || '',
        email: user?.email || '',
        phone: profile?.phone || '',
        location: profile?.location || '',
        bio: profile?.bio || '',
        linkedin_url: profile?.linkedin_url || '',
        github_url: profile?.github_url || '',
        website_url: profile?.website_url || '',
    });

    const educationForm = useForm({
        institution: '',
        degree: '',
        field_of_study: '',
        start_date: '',
        end_date: '',
    });

    const skillForm = useForm({
        skill_name: '',
        skill_level: '',
    });

    const projectForm = useForm({
        title: '',
        description: '',
        project_url: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/profile');
    };

    const handleEducationSubmit = (e) => {
        e.preventDefault();

        educationForm.post('/educations', {
            onSuccess: () => educationForm.reset(),
        });
    };

    const deleteEducation = (id) => {
        router.delete(`/educations/${id}`);
    };

    const handleSkillSubmit = (e) => {
        e.preventDefault();

        skillForm.post('/skills', {
            onSuccess: () => skillForm.reset(),
        });
    };

    const deleteSkill = (id) => {
        router.delete(`/skills/${id}`);
    };

    const handleProjectSubmit = (e) => {
        e.preventDefault();

        projectForm.post('/projects', {
            onSuccess: () => projectForm.reset(),
        });
    };

    const deleteProject = (id) => {
        router.delete(`/projects/${id}`);
    };

    return (
        <AppLayout>
            <div className="space-y-8 pb-10">
                <div>
                    <h1 className="text-4xl font-bold text-[#0B2A5B]">
                        My Profile
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage the information that will appear in your portfolio.
                    </p>
                </div>

                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-2xl">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gradient-to-r from-[#1456B8] to-[#0B2A5B] rounded-3xl p-8 text-white shadow-lg">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full bg-white text-[#1456B8] flex items-center justify-center text-4xl font-bold">
                                {data.full_name
                                    ? data.full_name.charAt(0).toUpperCase()
                                    : 'S'}
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold">
                                    {data.full_name || 'Student Name'}
                                </h2>

                                <p className="text-blue-100 mt-1">
                                    Student Portfolio
                                </p>

                                <p className="text-blue-200 text-sm mt-2">
                                    Build your professional portfolio and showcase your achievements.
                                </p>
                            </div>
                        </div>
                    </div>

                    <FormSection
                        title="Personal Information"
                        description="This information will be used as the main identity in your portfolio."
                    >
                        <FormInput
                            label="Full Name"
                            name="full_name"
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            placeholder="Enter your full name"
                        />

                        <FormTextarea
                            label="Professional Bio"
                            name="bio"
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            placeholder="Write a short professional bio..."
                        />
                    </FormSection>

                    <FormSection
                        title="Contact Information"
                        description="Add your contact details for your portfolio visitors."
                    >
                        <FormInput
                            label="Email Address"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter your email"
                        />

                        <FormInput
                            label="Phone Number"
                            name="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="Enter your phone number"
                        />

                        <FormInput
                            label="Location"
                            name="location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            placeholder="City, Country"
                        />
                    </FormSection>

                    <FormSection
                        title="Social Links"
                        description="Add links that can appear in your portfolio."
                    >
                        <FormInput
                            label="LinkedIn"
                            name="linkedin_url"
                            value={data.linkedin_url}
                            onChange={(e) => setData('linkedin_url', e.target.value)}
                            placeholder="https://linkedin.com/in/yourname"
                        />

                        <FormInput
                            label="GitHub"
                            name="github_url"
                            value={data.github_url}
                            onChange={(e) => setData('github_url', e.target.value)}
                            placeholder="https://github.com/yourname"
                        />

                        <FormInput
                            label="Personal Website"
                            name="website_url"
                            value={data.website_url}
                            onChange={(e) => setData('website_url', e.target.value)}
                            placeholder="https://yourwebsite.com"
                        />
                    </FormSection>

                    <div className="flex justify-end">
                        <PrimaryButton type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Profile'}
                        </PrimaryButton>
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl">
                            Please check the form fields and try again.
                        </div>
                    )}
                </form>

                <div className="bg-white/90 backdrop-blur rounded-3xl shadow-sm border border-gray-100 p-7">
                    <div className="mb-6 border-b border-gray-100 pb-4">
                        <h2 className="text-xl font-bold text-[#0B2A5B]">
                            Education
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Add your education history. This will appear later in your portfolio.
                        </p>
                    </div>

                    <form onSubmit={handleEducationSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput
                                label="Institution"
                                name="institution"
                                value={educationForm.data.institution}
                                onChange={(e) => educationForm.setData('institution', e.target.value)}
                                placeholder="Libyan International University"
                            />

                            <FormInput
                                label="Degree"
                                name="degree"
                                value={educationForm.data.degree}
                                onChange={(e) => educationForm.setData('degree', e.target.value)}
                                placeholder="Bachelor"
                            />

                            <FormInput
                                label="Field of Study"
                                name="field_of_study"
                                value={educationForm.data.field_of_study}
                                onChange={(e) => educationForm.setData('field_of_study', e.target.value)}
                                placeholder="Software Engineering"
                            />

                            <FormInput
                                label="Start Date"
                                name="start_date"
                                type="date"
                                value={educationForm.data.start_date}
                                onChange={(e) => educationForm.setData('start_date', e.target.value)}
                            />

                            <FormInput
                                label="End Date"
                                name="end_date"
                                type="date"
                                value={educationForm.data.end_date}
                                onChange={(e) => educationForm.setData('end_date', e.target.value)}
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={educationForm.processing}
                                className="rounded-2xl bg-[#1456B8] px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-[#0B2A5B] disabled:opacity-60"
                            >
                                {educationForm.processing ? 'Adding...' : 'Add Education'}
                            </button>
                        </div>
                    </form>

                    {educations.length > 0 && (
                        <div className="mt-8 space-y-4">
                            <h3 className="text-lg font-bold text-[#0B2A5B]">
                                Education History
                            </h3>

                            {educations.map((education) => (
                                <div
                                    key={education.id}
                                    className="border border-gray-200 rounded-2xl p-5 bg-gray-50"
                                >
                                    <div className="flex justify-between gap-4">
                                        <div>
                                            <h4 className="font-bold text-[#0B2A5B]">
                                                {education.institution}
                                            </h4>

                                            <p className="text-gray-600">
                                                {education.degree}
                                                {education.field_of_study &&
                                                    ` • ${education.field_of_study}`}
                                            </p>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {education.start_date}
                                                {education.end_date
                                                    ? ` - ${education.end_date}`
                                                    : ' - Present'}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => deleteEducation(education.id)}
                                            className="text-sm font-semibold text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="bg-white/90 backdrop-blur rounded-3xl shadow-sm border border-gray-100 p-7">
                        <div className="mb-6 border-b border-gray-100 pb-4">
                            <h2 className="text-xl font-bold text-[#0B2A5B]">
                                Skills
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Add your technical and professional skills.
                            </p>
                        </div>

                        <form onSubmit={handleSkillSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    label="Skill Name"
                                    name="skill_name"
                                    value={skillForm.data.skill_name}
                                    onChange={(e) => skillForm.setData('skill_name', e.target.value)}
                                    placeholder="Laravel"
                                />

                                <FormInput
                                    label="Skill Level"
                                    name="skill_level"
                                    value={skillForm.data.skill_level}
                                    onChange={(e) => skillForm.setData('skill_level', e.target.value)}
                                    placeholder="Beginner, Intermediate, Advanced"
                                />
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={skillForm.processing}
                                    className="rounded-2xl bg-[#1456B8] px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-[#0B2A5B] disabled:opacity-60"
                                >
                                    {skillForm.processing ? 'Adding...' : 'Add Skill'}
                                </button>
                            </div>
                        </form>

                        {skills.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-[#0B2A5B] mb-4">
                                    Skills List
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {skills.map((skill) => (
                                        <div
                                            key={skill.id}
                                            className="flex items-center gap-3 rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3"
                                        >
                                            <div>
                                                <p className="font-semibold text-[#0B2A5B]">
                                                    {skill.skill_name}
                                                </p>

                                                {skill.skill_level && (
                                                    <p className="text-xs text-gray-500">
                                                        {skill.skill_level}
                                                    </p>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => deleteSkill(skill.id)}
                                                className="text-xs font-semibold text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-sm border border-gray-100 p-7">
                            <div className="mb-6 border-b border-gray-100 pb-4">
                                <h2 className="text-xl font-bold text-[#0B2A5B]">
                                    Projects
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Add your academic, personal, or professional projects.
                                </p>
                            </div>

                            <form onSubmit={handleProjectSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormInput
                                        label="Project Title"
                                        name="title"
                                        value={projectForm.data.title}
                                        onChange={(e) => projectForm.setData('title', e.target.value)}
                                        placeholder="MyE-Portfolio System"
                                    />

                                    <FormInput
                                        label="Project URL"
                                        name="project_url"
                                        value={projectForm.data.project_url}
                                        onChange={(e) => projectForm.setData('project_url', e.target.value)}
                                        placeholder="https://github.com/username/project"
                                    />

                                    <FormTextarea
                                        label="Project Description"
                                        name="description"
                                        value={projectForm.data.description}
                                        onChange={(e) => projectForm.setData('description', e.target.value)}
                                        placeholder="Briefly describe your project..."
                                    />
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={projectForm.processing}
                                        className="rounded-2xl bg-[#1456B8] px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-[#0B2A5B] disabled:opacity-60"
                                    >
                                        {projectForm.processing ? 'Adding...' : 'Add Project'}
                                    </button>
                                </div>
                            </form>

                            {projects.length > 0 && (
                                <div className="mt-8 space-y-4">
                                    <h3 className="text-lg font-bold text-[#0B2A5B]">
                                        Projects List
                                    </h3>

                                    {projects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="border border-gray-200 rounded-2xl p-5 bg-gray-50"
                                        >
                                            <div className="flex justify-between gap-4">
                                                <div>
                                                    <h4 className="font-bold text-[#0B2A5B]">
                                                        {project.title}
                                                    </h4>

                                                    {project.description && (
                                                        <p className="text-gray-600 mt-1">
                                                            {project.description}
                                                        </p>
                                                    )}

                                                    {project.project_url && (
                                                        <a
                                                            href={project.project_url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-block mt-2 text-sm font-semibold text-[#1456B8] hover:underline"
                                                        >
                                                            View Project
                                                        </a>
                                                    )}
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => deleteProject(project.id)}
                                                    className="text-sm font-semibold text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}