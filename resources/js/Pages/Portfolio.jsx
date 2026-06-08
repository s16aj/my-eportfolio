import AppLayout from '../Layouts/AppLayout';
import { router, usePage } from '@inertiajs/react';
import PortfolioContent from './PortfolioContent';

export default function Portfolio({
    user,
    profile,
    educations = [],
    skills = [],
    projects = [],
    portfolio,
}) {
    const { flash } = usePage().props;

    const templateName = portfolio?.template?.name || 'Modern Portfolio';
    const isPublished = portfolio?.is_published === 1 || portfolio?.is_published === true;

    const publicUrl = portfolio?.slug
        ? `/portfolio/${portfolio.slug}`
        : null;

    const publishedDate = portfolio?.published_at
        ? String(portfolio.published_at).split(' ')[0]
        : null;

    const publishPortfolio = () => {
        router.post('/portfolio/publish');
    };

    return (
        <AppLayout>
            <div className="space-y-8 pb-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-[#0B2A5B]">
                            Portfolio Preview
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Preview your selected portfolio design before publishing.
                        </p>

                        <p className="text-sm text-[#1456B8] font-semibold mt-2">
                            Selected Template: {templateName}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={publishPortfolio}
                        disabled={isPublished}
                        className={`transition text-white px-6 py-3 rounded-xl font-semibold shadow-sm ${
                            isPublished
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#1456B8] hover:bg-[#0B2A5B]'
                        }`}
                    >
                        {isPublished ? 'Published' : 'Publish Portfolio'}
                    </button>
                </div>

                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-2xl">
                        {flash.success}
                    </div>
                )}

                {flash?.error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl">
                        {flash.error}
                    </div>
                )}

                <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-gray-500">
                                Publish Status
                            </p>

                            <p className="text-lg font-bold text-[#0B2A5B]">
                                {isPublished ? 'Published' : 'Not Published'}
                            </p>

                            {publishedDate && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Published on: {publishedDate}
                                </p>
                            )}
                        </div>

                        {publicUrl && isPublished && (
                            <a
                                href={publicUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-semibold text-[#1456B8] hover:underline"
                            >
                                View Public Portfolio
                            </a>
                        )}
                    </div>
                </div>

                {!portfolio?.template && (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-5 py-4 rounded-2xl">
                        Please select a template before publishing your portfolio.
                    </div>
                )}

                <PortfolioContent
                    user={user}
                    profile={profile}
                    educations={educations}
                    skills={skills}
                    projects={projects}
                    portfolio={portfolio}
                />
            </div>
        </AppLayout>
    );
}