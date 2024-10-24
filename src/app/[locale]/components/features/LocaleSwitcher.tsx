'use client';

import { usePathname, useRouter } from 'next/navigation';
import { routing } from '../../../../i18n/routing';

export default function LocaleSwitcher() {
    const pathname = usePathname();
    const router = useRouter();
    const currentLocale = pathname?.split('/')[1] || routing.defaultLocale;
    const pathnameWithoutLocale = pathname?.split('/').slice(2).join('/') || '';

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLocale = event.target.value;
        router.push(`/${selectedLocale}/${pathnameWithoutLocale}`);
    };

    return (
        <div className="pl-5">
            <select
                value={currentLocale}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-gray-500 hover:text-blue-700 transition-colors"
            >
                <option value="tr">TR</option>
                <option value="en">EN</option>
            </select>
        </div>
    );
}
