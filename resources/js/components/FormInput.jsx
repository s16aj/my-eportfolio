export default function FormInput({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder,
}) {
    return (
        <div>

            {/* Input label */}
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>

            {/* Reusable input field */}
            <input
                type={type}
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:bg-white focus:border-[#1456B8] focus:ring-4 focus:ring-blue-100"
            />
        </div>
    );
}