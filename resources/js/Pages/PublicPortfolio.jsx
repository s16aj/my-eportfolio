import PortfolioContent from './PortfolioContent';

export default function PublicPortfolio({
    user,
    profile,
    educations = [],
    skills = [],
    projects = [],
    portfolio,
}) {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <PortfolioContent
                    user={user}
                    profile={profile}
                    educations={educations}
                    skills={skills}
                    projects={projects}
                    portfolio={portfolio}
                />
            </div>
        </div>
    );
}