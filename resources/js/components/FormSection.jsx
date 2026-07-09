export default function FormSection({
    title,
    description,
    icon: Icon,
    children
}) {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-7">

            {/* Section header */}
            <div className="mb-6 border-b border-gray-100 pb-4 flex items-center gap-3">

                {Icon && (
                    <span className="w-10 h-10 rounded-xl bg-blue-50 text-[#1456B8] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                    </span>
                )}

                <div>
                    {/* Section title */}
                    <h2 className="text-xl font-bold text-[#0B2A5B]">
                        {title}
                    </h2>

                    {/* Optional section description */}
                    {description && (
                        <p className="text-sm text-gray-500 mt-1">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Section content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {children}
            </div>

        </div>
    );
}