export default function FormTextarea({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
}) {
    return (
        <div className="md:col-span-2">

            {/* Textarea label */}
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>

            {/* Reusable textarea field */}
            <textarea
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                rows="5"
                className={`w-full rounded-2xl border ${error ? "border-red-300" : "border-gray-200"} bg-gray-50 px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:bg-white focus:border-[#1456B8] focus:ring-4 focus:ring-blue-100`}
            />

            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}