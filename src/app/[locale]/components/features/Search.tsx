import { useTranslations } from 'next-intl';

export default function Search() {
    const t = useTranslations('search');


    return (
        <div className="flex items-center">
            <input
                type="text"
                placeholder={t('search')}
                className="w-60 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
        </div>
    );
}
