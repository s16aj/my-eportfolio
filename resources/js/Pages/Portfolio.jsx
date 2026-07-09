import AppLayout from '../Layouts/AppLayout';
import { router, usePage } from '@inertiajs/react';
import PortfolioContent from './PortfolioContent';
import {
    Rocket,
    EyeOff,
    Sparkles,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    ExternalLink,
    Globe,
} from 'lucide-react';

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
        ? String(portfolio.published_at).split(/[ T]/)[0]
        : null;

    const publishPortfolio = () => {
        router.post('/portfolio/publish');
    };

    const unpublishPortfolio = () => {
        router.post('/portfolio/unpublish');
    };

    return (
        <AppLayout>
            <div className="space-y-6 pb-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div>
                        <h1 className="text-4xl font-bold text-[#0B2A5B]">
                            Portfolio Preview
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Preview your selected portfolio design before publishing.
                        </p>

                        <p className="inline-flex items-center gap-1.5 text-sm text-[#1456B8] font-semibold mt-2">
                            <Sparkles className="w-4 h-4" />
                            Selected Template: {templateName}
                        </p>
                    </div>

                    {isPublished ? (
                        <button
                            type="button"
                            onClick={unpublishPortfolio}
                            className="inline-flex items-center justify-center gap-2 transition text-red-600 bg-red-50 hover:bg-red-100 px-6 py-3 rounded-xl font-semibold shrink-0"
                        >
                            <EyeOff className="w-4 h-4" />
                            Unpublish
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={publishPortfolio}
                            className="inline-flex items-center justify-center gap-2 transition text-white bg-[#1456B8] hover:bg-[#0B2A5B] px-6 py-3 rounded-xl font-semibold shadow-sm shrink-0"
                        >
                            <Rocket className="w-4 h-4" />
                            Publish Portfolio
                        </button>
                    )}
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-2xl">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        {flash.success}
                    </div>
                )}

                {flash?.error && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl">
                        <XCircle className="w-5 h-5 shrink-0" />
                        {flash.error}
                    </div>
                )}

                <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <span
                                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                                    isPublished
                                        ? 'bg-green-50 text-green-600'
                                        : 'bg-gray-100 text-gray-500'
                                }`}
                            >
                                <Globe className="w-5 h-5" />
                            </span>

                            <div>
                                <p className="text-sm font-semibold text-gray-500">
                                    Publish Status
                                </p>

                                <p className="text-lg font-bold text-[#0B2A5B]">
                                    {isPublished ? 'Published' : 'Not Published'}
                                </p>

                                {publishedDate && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        {isPublished ? 'Published on' : 'Previously published on'}: {publishedDate}
                                    </p>
                                )}
                            </div>
                        </div>

                        {publicUrl && isPublished && (
                            <a
                                href={publicUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1456B8] hover:underline shrink-0"
                            >
                                View Public Portfolio
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>

                {!portfolio?.template && (
                    <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 px-5 py-4 rounded-2xl">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
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