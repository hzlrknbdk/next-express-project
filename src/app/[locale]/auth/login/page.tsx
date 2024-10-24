'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoginService from '@/pages/api/services/auth';
import InputField from '@/app/[locale]/components/common/InputField';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const schema = yup.object().shape({
    email: yup.string().email('Geçersiz e-posta').required('E-posta gereklidir'),
    password: yup.string().required('Şifre gereklidir')
});

export default function Login() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const t = useTranslations('auth');

    console.log({ t: t("emailLabel") })
    const locale = useLocale();
    const router = useRouter();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: { email: string; password: string }) => {
        setLoading(true);
        setError(null);

        try {
            const { data: response } = await LoginService.login(data);
            if (response?.token) {
                document.cookie = `token=${response.token}; path=/`;
                router.push(`/${locale}/feeds`);
            } else {
                throw new Error('Giriş başarısız, token alınamadı.');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg p-10 space-y-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center">{t("loginTitle")}</h1>
                {error && (
                    <div className="mb-4 text-red-500 text-center">
                        {error}
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <InputField
                            name="email"
                            control={control}
                            label={t("emailLabel")}
                            type="email"
                            placeholder={t("emailPlaceholder")}
                            required
                            error={errors.email?.message}
                        />
                        <InputField
                            name="password"
                            control={control}
                            label={t("passwordLabel")}
                            type="password"
                            placeholder={t("passwordPlaceholder")}
                            required
                            error={errors.password?.message}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                {t("forgotPassword")}
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={loading}
                        >
                            {loading ? t("loading") : t("loginButton")}
                        </button>

                        <div className="text-center">
                            <p className="text-sm pt-5">
                                {t("signupPrompt")}{" "}
                                <Link href={`/${locale}/auth/signup`}>
                                    <span className="font-medium text-indigo-600 hover:text-indigo-500">{t("signupLink")}</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
