import { useEffect, useRef, useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { useForm, usePage, router } from '@inertiajs/react';
import {
    User,
    Phone,
    Link2,
    GraduationCap,
    Wrench,
    FolderKanban,
    Trash2,
    Camera,
} from 'lucide-react';

import FormSection from '../components/FormSection';
import FormInput from '../components/FormInput';
import FormTextarea from '../components/FormTextarea';
import PrimaryButton from '../components/PrimaryButton';
import { formatMonthYear } from '../utils/formatDate';

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const EMPTY_EDUCATION_DRAFT = { institution: '', degree: '', field_of_study: '', start_date: '', end_date: '' };
const EMPTY_SKILL_DRAFT = { skill_name: '', skill_level: '', skill_percentage: '' };
const EMPTY_PROJECT_DRAFT = { title: '', description: '', project_url: '' };

const UNSAVED_CHANGES_MESSAGE = 'You have unsaved changes. If you leave this page, your changes will not be saved.';

function SectionHeader({ icon: Icon, iconColor, title, description }) {
    return (
        <div className="mb-6 border-b border-gray-100 pb-4 flex items-center gap-3">
            <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconColor}`}>
                <Icon className="w-5 h-5" />
            </span>
            <div>
                <h2 className="text-xl font-bold text-[#0B2A5B]">
                    {title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    {description}
                </p>
            </div>
        </div>
    );
}

function UnsavedBadge() {
    return (
        <span className="inline-block text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
            Unsaved
        </span>
    );
}

export default function Profile({ user, profile, educations = [], skills = [], projects = [] }) {
    const { flash } = usePage().props;

    const currentProfileImage = profile?.profile_image
        ? `/storage/${profile.profile_image}`
        : null;

    const [profileImagePreview, setProfileImagePreview] = useState(currentProfileImage);

    const { data, setData, post, processing, errors, isDirty } = useForm({
        full_name: user?.name || '',
        email: user?.email || '',
        phone: profile?.phone || '',
        location: profile?.location || '',
        bio: profile?.bio || '',
        linkedin_url: profile?.linkedin_url || '',
        github_url: profile?.github_url || '',
        website_url: profile?.website_url || '',
        profile_image: null,

        new_educations: [],
        deleted_education_ids: [],
        new_skills: [],
        deleted_skill_ids: [],
        new_projects: [],
        deleted_project_ids: [],
    });

    const [educationDraft, setEducationDraft] = useState(EMPTY_EDUCATION_DRAFT);
    const [educationDraftErrors, setEducationDraftErrors] = useState({});

    const [skillDraft, setSkillDraft] = useState(EMPTY_SKILL_DRAFT);
    const [skillDraftErrors, setSkillDraftErrors] = useState({});

    const [projectDraft, setProjectDraft] = useState(EMPTY_PROJECT_DRAFT);
    const [projectDraftErrors, setProjectDraftErrors] = useState({});

    const tempIdRef = useRef(0);
    const nextTempId = () => {
        tempIdRef.current += 1;
        return `temp-${tempIdRef.current}`;
    };

    // Keep a ref in sync with isDirty so the navigation guards below always
    // see the latest value without having to resubscribe on every render.
    const isDirtyRef = useRef(isDirty);
    isDirtyRef.current = isDirty;

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isDirtyRef.current) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        const removeInertiaGuard = router.on('before', (event) => {
            if (isDirtyRef.current && !window.confirm(UNSAVED_CHANGES_MESSAGE)) {
                event.preventDefault();
            }
        });

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            removeInertiaGuard();
        };
    }, []);

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        setData('profile_image', file);
        setProfileImagePreview(URL.createObjectURL(file));
    };

    const handleFinalSave = (e) => {
        e.preventDefault();

        post('/profile', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setData((currentData) => ({
                    ...currentData,
                    new_educations: [],
                    deleted_education_ids: [],
                    new_skills: [],
                    deleted_skill_ids: [],
                    new_projects: [],
                    deleted_project_ids: [],
                }));
            },
        });
    };

    // Education
    const addEducation = () => {
        const draftErrors = {};

        if (!educationDraft.institution.trim()) draftErrors.institution = 'Institution is required.';
        if (!educationDraft.degree.trim()) draftErrors.degree = 'Degree is required.';
        if (!educationDraft.field_of_study.trim()) draftErrors.field_of_study = 'Field of study is required.';
        if (!educationDraft.start_date) draftErrors.start_date = 'Start date is required.';

        setEducationDraftErrors(draftErrors);

        if (Object.keys(draftErrors).length > 0) {
            return;
        }

        setData('new_educations', [
            ...data.new_educations,
            { ...educationDraft, _tempId: nextTempId() },
        ]);
        setEducationDraft(EMPTY_EDUCATION_DRAFT);
    };

    const removeNewEducation = (tempId) => {
        setData('new_educations', data.new_educations.filter((item) => item._tempId !== tempId));
    };

    const removeSavedEducation = (id) => {
        setData('deleted_education_ids', [...data.deleted_education_ids, id]);
    };

    const educationRows = [
        ...educations
            .filter((item) => !data.deleted_education_ids.includes(item.id))
            .map((item) => ({ ...item, key: `saved-${item.id}`, pending: false })),
        ...data.new_educations.map((item) => ({ ...item, key: item._tempId, pending: true })),
    ];

    // Skills
    const addSkill = () => {
        const draftErrors = {};

        if (!skillDraft.skill_name.trim()) draftErrors.skill_name = 'Skill name is required.';

        setSkillDraftErrors(draftErrors);

        if (Object.keys(draftErrors).length > 0) {
            return;
        }

        setData('new_skills', [
            ...data.new_skills,
            { ...skillDraft, _tempId: nextTempId() },
        ]);
        setSkillDraft(EMPTY_SKILL_DRAFT);
    };

    const removeNewSkill = (tempId) => {
        setData('new_skills', data.new_skills.filter((item) => item._tempId !== tempId));
    };

    const removeSavedSkill = (id) => {
        setData('deleted_skill_ids', [...data.deleted_skill_ids, id]);
    };

    const skillRows = [
        ...skills
            .filter((item) => !data.deleted_skill_ids.includes(item.id))
            .map((item) => ({ ...item, key: `saved-${item.id}`, pending: false })),
        ...data.new_skills.map((item) => ({ ...item, key: item._tempId, pending: true })),
    ];

    // Projects
    const addProject = () => {
        const draftErrors = {};

        if (!projectDraft.title.trim()) draftErrors.title = 'Project title is required.';

        setProjectDraftErrors(draftErrors);

        if (Object.keys(draftErrors).length > 0) {
            return;
        }

        setData('new_projects', [
            ...data.new_projects,
            { ...projectDraft, _tempId: nextTempId() },
        ]);
        setProjectDraft(EMPTY_PROJECT_DRAFT);
    };

    const removeNewProject = (tempId) => {
        setData('new_projects', data.new_projects.filter((item) => item._tempId !== tempId));
    };

    const removeSavedProject = (id) => {
        setData('deleted_project_ids', [...data.deleted_project_ids, id]);
    };

    const projectRows = [
        ...projects
            .filter((item) => !data.deleted_project_ids.includes(item.id))
            .map((item) => ({ ...item, key: `saved-${item.id}`, pending: false })),
        ...data.new_projects.map((item) => ({ ...item, key: item._tempId, pending: true })),
    ];

    return (
        <AppLayout>
            <form onSubmit={handleFinalSave} className="space-y-6 pb-10">
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

                <div className="relative overflow-hidden bg-gradient-to-br from-[#1456B8] to-[#0B2A5B] rounded-3xl p-8 text-white shadow-lg">
                    <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />

                    <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                        <div className="flex flex-col items-center gap-3 shrink-0">
                            <div className="w-24 h-24 rounded-full bg-white/15 border-4 border-white/30 shadow-lg overflow-hidden flex items-center justify-center">
                                {profileImagePreview ? (
                                    <img
                                        src={profileImagePreview}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-4xl font-bold text-white">
                                        {data.full_name
                                            ? data.full_name.charAt(0).toUpperCase()
                                            : 'S'}
                                    </span>
                                )}
                            </div>

                            <label className="inline-flex items-center gap-2 cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-bold text-[#1456B8] shadow-sm hover:bg-blue-50 transition">
                                <Camera className="w-4 h-4" />
                                Change Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleProfileImageChange}
                                />
                            </label>

                            {errors.profile_image && (
                                <p className="text-sm text-red-100">
                                    {errors.profile_image}
                                </p>
                            )}
                        </div>

                        <div>
                            <p className="text-blue-100/90 font-semibold tracking-widest uppercase text-xs mb-2">
                                Student Portfolio
                            </p>

                            <h2 className="text-3xl font-bold">
                                {data.full_name || 'Student Name'}
                            </h2>

                            <p className="text-blue-100 text-sm mt-2 max-w-xl">
                                Build your professional portfolio and showcase your achievements.
                            </p>
                        </div>
                    </div>
                </div>

                <FormSection
                    title="Personal Information"
                    description="This information will be used as the main identity in your portfolio."
                    icon={User}
                >
                    <FormInput
                        label="Full Name"
                        name="full_name"
                        value={data.full_name}
                        onChange={(e) => setData('full_name', e.target.value)}
                        placeholder="Enter your full name"
                        error={errors.full_name}
                    />

                    <FormTextarea
                        label="Professional Bio"
                        name="bio"
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                        placeholder="Write a short professional bio..."
                        error={errors.bio}
                    />
                </FormSection>

                <FormSection
                    title="Contact Information"
                    description="Add your contact details for your portfolio visitors."
                    icon={Phone}
                >
                    <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Enter your email"
                        error={errors.email}
                    />

                    <FormInput
                        label="Phone Number"
                        name="phone"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        error={errors.phone}
                    />

                    <FormInput
                        label="Location"
                        name="location"
                        value={data.location}
                        onChange={(e) => setData('location', e.target.value)}
                        placeholder="City, Country"
                        error={errors.location}
                    />
                </FormSection>

                <FormSection
                    title="Social Links"
                    description="Add links that can appear in your portfolio."
                    icon={Link2}
                >
                    <FormInput
                        label="LinkedIn"
                        name="linkedin_url"
                        value={data.linkedin_url}
                        onChange={(e) => setData('linkedin_url', e.target.value)}
                        placeholder="https://linkedin.com/in/yourname"
                        error={errors.linkedin_url}
                    />

                    <FormInput
                        label="GitHub"
                        name="github_url"
                        value={data.github_url}
                        onChange={(e) => setData('github_url', e.target.value)}
                        placeholder="https://github.com/yourname"
                        error={errors.github_url}
                    />

                    <FormInput
                        label="Personal Website"
                        name="website_url"
                        value={data.website_url}
                        onChange={(e) => setData('website_url', e.target.value)}
                        placeholder="https://yourwebsite.com"
                        error={errors.website_url}
                    />
                </FormSection>

                {/* Education */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7">
                    <SectionHeader
                        icon={GraduationCap}
                        iconColor="bg-blue-50 text-[#1456B8]"
                        title="Education"
                        description="Add your education history. New entries are saved when you click Save Changes below."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Institution"
                            name="institution"
                            value={educationDraft.institution}
                            onChange={(e) => setEducationDraft({ ...educationDraft, institution: e.target.value })}
                            placeholder="Libyan International University"
                            error={educationDraftErrors.institution}
                        />

                        <FormInput
                            label="Degree"
                            name="degree"
                            value={educationDraft.degree}
                            onChange={(e) => setEducationDraft({ ...educationDraft, degree: e.target.value })}
                            placeholder="Bachelor"
                            error={educationDraftErrors.degree}
                        />

                        <FormInput
                            label="Field of Study"
                            name="field_of_study"
                            value={educationDraft.field_of_study}
                            onChange={(e) => setEducationDraft({ ...educationDraft, field_of_study: e.target.value })}
                            placeholder="Software Engineering"
                            error={educationDraftErrors.field_of_study}
                        />

                        <FormInput
                            label="Start Date"
                            name="start_date"
                            type="month"
                            value={educationDraft.start_date}
                            onChange={(e) => setEducationDraft({ ...educationDraft, start_date: e.target.value })}
                            error={educationDraftErrors.start_date}
                        />

                        <FormInput
                            label="End Date"
                            name="end_date"
                            type="month"
                            value={educationDraft.end_date}
                            onChange={(e) => setEducationDraft({ ...educationDraft, end_date: e.target.value })}
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton type="button" onClick={addEducation}>
                            Add Education
                        </PrimaryButton>
                    </div>

                    <div className="mt-8 space-y-4">
                        <h3 className="text-lg font-bold text-[#0B2A5B]">
                            Education History
                        </h3>

                        {educationRows.length > 0 ? (
                            educationRows.map((education) => (
                                <div
                                    key={education.key}
                                    className="border border-gray-200 rounded-2xl p-5 bg-gray-50"
                                >
                                    <div className="flex justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-[#0B2A5B]">
                                                    {education.institution}
                                                </h4>
                                                {education.pending && <UnsavedBadge />}
                                            </div>

                                            <p className="text-gray-600">
                                                {education.degree}
                                                {education.field_of_study &&
                                                    ` • ${education.field_of_study}`}
                                            </p>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {formatMonthYear(education.start_date)}
                                                {education.end_date
                                                    ? ` - ${formatMonthYear(education.end_date)}`
                                                    : ' - Present'}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => education.pending
                                                ? removeNewEducation(education.key)
                                                : removeSavedEducation(education.id)}
                                            className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-800 shrink-0"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400">
                                No education records added yet.
                            </p>
                        )}
                    </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7">
                    <SectionHeader
                        icon={Wrench}
                        iconColor="bg-purple-50 text-purple-600"
                        title="Skills"
                        description="Add your technical and professional skills. New entries are saved when you click Save Changes below."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Skill Name"
                            name="skill_name"
                            value={skillDraft.skill_name}
                            onChange={(e) => setSkillDraft({ ...skillDraft, skill_name: e.target.value })}
                            placeholder="Laravel"
                            error={skillDraftErrors.skill_name}
                        />

                        <FormInput
                            label="Skill Level"
                            name="skill_level"
                            value={skillDraft.skill_level}
                            onChange={(e) => setSkillDraft({ ...skillDraft, skill_level: e.target.value })}
                            placeholder="Select level"
                            options={SKILL_LEVELS}
                        />

                        <FormInput
                            label="Skill Percentage"
                            name="skill_percentage"
                            type="number"
                            value={skillDraft.skill_percentage}
                            onChange={(e) => setSkillDraft({ ...skillDraft, skill_percentage: e.target.value })}
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton type="button" onClick={addSkill}>
                            Add Skill
                        </PrimaryButton>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-bold text-[#0B2A5B] mb-4">
                            Skills List
                        </h3>

                        {skillRows.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {skillRows.map((skill) => (
                                    <div
                                        key={skill.key}
                                        className="flex items-center gap-3 rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3"
                                    >
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold text-[#0B2A5B]">
                                                    {skill.skill_name}
                                                </p>
                                                {skill.pending && <UnsavedBadge />}
                                            </div>

                                            {skill.skill_level && (
                                                <p className="text-xs text-gray-500">
                                                    {skill.skill_level}
                                                </p>
                                            )}

                                            {skill.skill_percentage !== null && skill.skill_percentage !== '' && (
                                                <p className="text-xs text-gray-500">
                                                    {skill.skill_percentage}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => skill.pending
                                                ? removeNewSkill(skill.key)
                                                : removeSavedSkill(skill.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">
                                No skills added yet.
                            </p>
                        )}
                    </div>
                </div>

                {/* Projects */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7">
                    <SectionHeader
                        icon={FolderKanban}
                        iconColor="bg-blue-50 text-[#1456B8]"
                        title="Projects"
                        description="Add your academic, personal, or professional projects. New entries are saved when you click Save Changes below."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput
                            label="Project Title"
                            name="title"
                            value={projectDraft.title}
                            onChange={(e) => setProjectDraft({ ...projectDraft, title: e.target.value })}
                            placeholder="MyE-Portfolio System"
                            error={projectDraftErrors.title}
                        />

                        <FormInput
                            label="Project URL"
                            name="project_url"
                            value={projectDraft.project_url}
                            onChange={(e) => setProjectDraft({ ...projectDraft, project_url: e.target.value })}
                            placeholder="https://github.com/username/project"
                        />

                        <FormTextarea
                            label="Project Description"
                            name="description"
                            value={projectDraft.description}
                            onChange={(e) => setProjectDraft({ ...projectDraft, description: e.target.value })}
                            placeholder="Briefly describe your project..."
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton type="button" onClick={addProject}>
                            Add Project
                        </PrimaryButton>
                    </div>

                    <div className="mt-8 space-y-4">
                        <h3 className="text-lg font-bold text-[#0B2A5B]">
                            Projects List
                        </h3>

                        {projectRows.length > 0 ? (
                            projectRows.map((project) => (
                                <div
                                    key={project.key}
                                    className="border border-gray-200 rounded-2xl p-5 bg-gray-50"
                                >
                                    <div className="flex justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-[#0B2A5B]">
                                                    {project.title}
                                                </h4>
                                                {project.pending && <UnsavedBadge />}
                                            </div>

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
                                            onClick={() => project.pending
                                                ? removeNewProject(project.key)
                                                : removeSavedProject(project.id)}
                                            className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-800 shrink-0"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400">
                                No projects added yet.
                            </p>
                        )}
                    </div>
                </div>

                {isDirty && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-700 px-5 py-4 rounded-2xl">
                        You have unsaved changes. Click Save Changes to keep them.
                    </div>
                )}

                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl">
                        Please check the form fields and try again.
                    </div>
                )}

                <div className="flex justify-end">
                    <PrimaryButton type="submit" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Changes'}
                    </PrimaryButton>
                </div>
            </form>
        </AppLayout>
    );
}
