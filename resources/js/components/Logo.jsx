export default function Logo({ size = 44, className = '' }) {
    return (
        <img
            src="/images/logo-mark.png"
            alt="MyE-Portfolio"
            className={`shrink-0 object-contain ${className}`}
            style={{ width: size, height: size }}
        />
    );
}
