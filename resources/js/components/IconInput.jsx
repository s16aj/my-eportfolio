export default function IconInput({ icon: Icon, type = 'text', value, onChange, placeholder, error }) {
    return (
        <div>
            <div className="relative">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 py-3 text-gray-800 outline-none transition focus:bg-white focus:border-[#1456B8] focus:ring-4 focus:ring-blue-100"
                />
            </div>
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
}
