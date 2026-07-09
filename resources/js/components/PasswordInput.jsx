import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({ value, onChange, placeholder = 'Password', error }) {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type={visible ? 'text' : 'password'}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-11 py-3 text-gray-800 outline-none transition focus:bg-white focus:border-[#1456B8] focus:ring-4 focus:ring-blue-100"
                />
                <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    tabIndex={-1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
}
