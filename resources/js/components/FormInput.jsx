export default function FormInput({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder,
    options,
}) {
    const fieldClassName = "w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:bg-white focus:border-[#1456B8] focus:ring-4 focus:ring-blue-100";

    return (
        <div>

            {/* Input label */}
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>

            {/* Reusable input or select field */}
            {options ? (
                <select
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    className={fieldClassName}
                >
                    <option value="" disabled>
                        {placeholder || `Select ${label}`}
                    </option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={fieldClassName}
                />
            )}
        </div>
    );
}