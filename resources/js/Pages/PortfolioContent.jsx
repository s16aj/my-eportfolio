import {
    User,
    GraduationCap,
    Wrench,
    FolderKanban,
    Link2,
    Mail,
    Phone,
    MapPin,
    Contact,
    Code2,
    Globe,
    ExternalLink,
} from 'lucide-react';
import { formatMonthYear } from '../utils/formatDate';

function Avatar({ user, profile, className }) {
    return (
        <div className={className}>
            {profile?.profile_image_url ? (
                <img
                    src={profile.profile_image_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            ) : (
                user?.name ? user.name.charAt(0).toUpperCase() : 'S'
            )}
        </div>
    );
}

export default function PortfolioContent({
    user,
    profile,
    educations = [],
    skills = [],
    projects = [],
    portfolio,
}) {
    const templateName = portfolio?.template?.name || 'Modern Portfolio';

    const sharedProps = {
        user,
        profile,
        educations,
        skills,
        projects,
    };

    if (templateName === 'Classic CV') {
        return <ClassicCVTemplate {...sharedProps} />;
    }

    if (templateName === 'Creative Portfolio') {
        return <CreativePortfolioTemplate {...sharedProps} />;
    }

    return <ModernPortfolioTemplate {...sharedProps} />;
}
function ModernPortfolioTemplate({ user, profile, educations, skills, projects }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-12 py-14 border-b border-gray-100 text-center">
                <Avatar
                    user={user}
                    profile={profile}
                    className="w-28 h-28 mx-auto rounded-full bg-[#1456B8] text-white flex items-center justify-center text-5xl font-bold overflow-hidden"
                />

                <h1 className="text-5xl font-bold text-[#0B2A5B] mt-6">
                    {user?.name || 'Student Name'}
                </h1>

                <div className="flex flex-wrap justify-center gap-3 mt-4 text-sm text-gray-500">
                    {profile?.location && <span>{profile.location}</span>}
                    {user?.email && <span>{user.email}</span>}
                    {profile?.phone && <span>{profile.phone}</span>}
                </div>
            </div>

            <div className="p-10 space-y-12">
                <PortfolioSection title="About Me" icon={User}>
                    <p className="text-gray-600 leading-relaxed">
                        {profile?.bio || 'No bio added yet.'}
                    </p>
                </PortfolioSection>

                <PortfolioSection title="Education" icon={GraduationCap}>
                    <EducationList educations={educations} />
                </PortfolioSection>

                <PortfolioSection title="Skills" icon={Wrench}>
                    <SkillTags skills={skills} />
                </PortfolioSection>

                <PortfolioSection title="Projects" icon={FolderKanban}>
                    <ProjectList projects={projects} />
                </PortfolioSection>

                <PortfolioSection title="Links" icon={Link2}>
                    <ContactLinks user={user} profile={profile} />
                </PortfolioSection>
            </div>
        </div>
    );
}

function ClassicCVTemplate({ user, profile, educations, skills, projects }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-12">
            <div className="border-b-2 border-gray-900 pb-6 flex items-center gap-6">
                <Avatar
                    user={user}
                    profile={profile}
                    className="w-24 h-24 rounded-full bg-gray-900 text-white flex items-center justify-center text-4xl font-bold overflow-hidden shrink-0"
                />

                <div>
                    <h1 className="text-4xl font-bold tracking-wide text-gray-900 uppercase">
                        {user?.name || 'Student Name'}
                    </h1>

                    <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-600">
                        {profile?.location && <span>{profile.location}</span>}
                        {user?.email && <span>{user.email}</span>}
                        {profile?.phone && <span>{profile.phone}</span>}
                    </div>
                </div>
            </div>

            <div className="mt-10 space-y-10">
                <CVSection title="Profile">
                    <p className="text-gray-700 leading-relaxed">
                        {profile?.bio || 'No bio added yet.'}
                    </p>
                </CVSection>

                <CVSection title="Education">
                    <EducationList educations={educations} simple />
                </CVSection>

                <CVSection title="Skills">
                    {skills.length > 0 ? (
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            {skills.map((skill) => (
                                <li key={skill.id}>
                                    {skill.skill_name}
                                    {skill.skill_level && ` — ${skill.skill_level}`}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <EmptyText text="No skills added yet." />
                    )}
                </CVSection>

                <CVSection title="Projects">
                    <ProjectList projects={projects} simple />
                </CVSection>

                <CVSection title="Contact">
                    <ContactLinks user={user} profile={profile} simple />
                </CVSection>
            </div>
        </div>
    );
}

function CreativePortfolioTemplate({ user, profile, educations, skills, projects }) {
    return (
        <div className="bg-[#F8FAFC] rounded-3xl border border-gray-100 overflow-hidden">
            <div className="bg-[#0B2A5B] text-white p-12">
                <div className="max-w-3xl flex items-center gap-6">
                    <Avatar
                        user={user}
                        profile={profile}
                        className="w-28 h-28 rounded-full bg-white/20 text-white flex items-center justify-center text-5xl font-bold overflow-hidden border-4 border-white shrink-0"
                    />

                    <div>
                        <h1 className="text-5xl font-bold">
                            {user?.name || 'Student Name'}
                        </h1>

                        <p className="mt-5 text-blue-100 leading-relaxed">
                            {profile?.bio || 'No bio added yet.'}
                        </p>

                        <div className="flex flex-wrap gap-3 mt-6 text-sm text-blue-100">
                            {profile?.location && <span>{profile.location}</span>}
                            {user?.email && <span>{user.email}</span>}
                            {profile?.phone && <span>{profile.phone}</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-8">
                    <CreativeCard title="Skills" icon={Wrench} accent="bg-teal-50 text-teal-600">
                        <SkillTags skills={skills} />
                    </CreativeCard>

                    <CreativeCard title="Education" icon={GraduationCap} accent="bg-blue-50 text-[#1456B8]">
                        <EducationList educations={educations} compact />
                    </CreativeCard>

                    <CreativeCard title="Links" icon={Link2} accent="bg-purple-50 text-purple-600">
                        <ContactLinks user={user} profile={profile} />
                    </CreativeCard>
                </div>

                <div className="lg:col-span-2">
                    <CreativeCard title="Projects" icon={FolderKanban} accent="bg-blue-50 text-[#1456B8]">
                        <ProjectList projects={projects} highlighted />
                    </CreativeCard>
                </div>
            </div>
        </div>
    );
}

function PortfolioSection({ title, icon: Icon, children }) {
    return (
        <section>
            <div className="flex items-center gap-3 mb-5">
                {Icon && (
                    <span className="w-9 h-9 rounded-xl bg-blue-50 text-[#1456B8] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                    </span>
                )}
                <h2 className="text-2xl font-bold text-[#0B2A5B]">
                    {title}
                </h2>
            </div>
            {children}
        </section>
    );
}

function CVSection({ title, children }) {
    return (
        <section>
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
                {title}
            </h2>
            {children}
        </section>
    );
}

function CreativeCard({ title, icon: Icon, accent = 'bg-blue-50 text-[#1456B8]', children }) {
    return (
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7">
            <div className="flex items-center gap-3 mb-5">
                {Icon && (
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${accent}`}>
                        <Icon className="w-4 h-4" />
                    </span>
                )}
                <h2 className="text-xl font-bold text-[#0B2A5B]">
                    {title}
                </h2>
            </div>
            {children}
        </section>
    );
}

function EducationList({ educations, simple = false, compact = false }) {
    if (educations.length === 0) {
        return <EmptyText text="No education records added yet." />;
    }

    return (
        <div className={compact ? 'space-y-4' : 'space-y-5'}>
            {educations.map((education) => (
                <div
                    key={education.id}
                    className={
                        simple || compact
                            ? ''
                            : 'border border-gray-100 rounded-2xl p-6'
                    }
                >
                    <h3 className="text-lg font-semibold text-[#1456B8]">
                        {education.institution}
                    </h3>

                    <p className="text-gray-600 mt-1">
                        {education.degree}
                        {education.field_of_study &&
                            ` • ${education.field_of_study}`}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                        {formatMonthYear(education.start_date)}
                        {education.end_date
                            ? ` - ${formatMonthYear(education.end_date)}`
                            : ' - Present'}
                    </p>
                </div>
            ))}
        </div>
    );
}

function SkillTags({ skills }) {
    if (skills.length === 0) {
        return <EmptyText text="No skills added yet." />;
    }

    return (
        <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
                <span
                    key={skill.id}
                    className="bg-[#EAF2FF] text-[#1456B8] px-4 py-2 rounded-full text-sm font-medium"
                >
                    {skill.skill_name}
                </span>
            ))}
        </div>
    );
}

function ProjectList({ projects, simple = false, highlighted = false }) {
    if (projects.length === 0) {
        return <EmptyText text="No projects added yet." />;
    }

    return (
        <div className="space-y-5">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className={
                        simple
                            ? ''
                            : highlighted
                                ? 'bg-[#F8FAFC] border border-gray-100 rounded-2xl p-6'
                                : 'border border-gray-100 rounded-2xl p-6'
                    }
                >
                    <h3 className="text-xl font-semibold text-[#1456B8]">
                        {project.title}
                    </h3>

                    {project.description && (
                        <p className="text-gray-600 mt-3 leading-relaxed">
                            {project.description}
                        </p>
                    )}

                    {project.project_url && (
                        <a
                            href={project.project_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-3 text-sm font-semibold text-[#1456B8] hover:underline"
                        >
                            View Project
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
}

function ContactLinks({ user, profile, simple = false }) {
    const links = [
        user?.email && { label: 'Email', value: user.email, href: `mailto:${user.email}`, icon: Mail },
        profile?.phone && { label: 'Phone', value: profile.phone, href: `tel:${profile.phone}`, icon: Phone },
        profile?.location && { label: 'Location', value: profile.location, icon: MapPin },
        profile?.linkedin_url && { label: 'LinkedIn', value: profile.linkedin_url, href: profile.linkedin_url, icon: Contact },
        profile?.github_url && { label: 'GitHub', value: profile.github_url, href: profile.github_url, icon: Code2 },
        profile?.website_url && { label: 'Website', value: profile.website_url, href: profile.website_url, icon: Globe },
    ].filter(Boolean);

    if (links.length === 0) {
        return <EmptyText text="No contact details added yet." />;
    }

    return (
        <div className={simple ? 'space-y-2 text-gray-700' : 'space-y-3 text-gray-600'}>
            {links.map(({ label, value, href, icon: Icon }) => (
                <p key={label} className="break-words flex items-center gap-2">
                    {!simple && Icon && <Icon className="w-4 h-4 text-[#1456B8] shrink-0" />}
                    <span className="font-semibold">{label}:</span>
                    {href ? (
                        <a
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noreferrer' : undefined}
                            className="text-[#1456B8] hover:underline break-all inline-flex items-center gap-1"
                        >
                            {value}
                            {href.startsWith('http') && <ExternalLink className="w-3 h-3 shrink-0" />}
                        </a>
                    ) : (
                        <span>{value}</span>
                    )}
                </p>
            ))}
        </div>
    );
}

function EmptyText({ text }) {
    return <p className="text-sm text-gray-500">{text}</p>;
}