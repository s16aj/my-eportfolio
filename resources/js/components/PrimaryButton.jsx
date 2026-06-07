export default function PrimaryButton({
    children,
    type = "button",
    disabled = false,
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            className="inline-flex items-center justify-center rounded-2xl bg-[#1456B8] px-8 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-[#0B2A5B] disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {children}
        </button>
    );
}