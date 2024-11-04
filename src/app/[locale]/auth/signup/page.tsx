"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UserService from "@/pages/api/services/user";
import Loading from "@/app/[locale]/components/core/Loading";
import InputField from "@/app/[locale]/components/common/InputField";
import { useLocale } from "next-intl";

const schema = yup.object().shape({
    username: yup.string().required("Kullanıcı adı gereklidir"),
    email: yup.string().email("Geçersiz e-posta").required("E-posta gereklidir"),
    password: yup.string().required("Şifre gereklidir"),
    passwordAgain: yup
        .string()
        .oneOf([yup.ref("password")], "Şifreler eşleşmiyor")
        .required("Şifre tekrar gereklidir"),
});

export default function SignUp() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const locale = useLocale();
    const router = useRouter();

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: {
        username: string;
        email: string;
        password: string;
    }) => {
        setLoading(true);
        setError(null);

        try {
            const { data: response } = await UserService.createUser(data);

            if (response) {
                await router.push(`/${locale}/auth/login`);
            }
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg p-10 space-y-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center">Kayıt Ol</h1>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm space-y-4">
                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}

                        <InputField
                            name="username"
                            control={control}
                            label="Kullanıcı Adı"
                            placeholder="Kullanıcı Adı"
                            widthSize="w-full"
                            required
                        />
                        <InputField
                            name="email"
                            control={control}
                            label="E-posta"
                            type="email"
                            placeholder="E-posta"
                            widthSize="w-full"
                            required
                        />
                        <InputField
                            name="password"
                            control={control}
                            label="Şifre"
                            type="password"
                            placeholder="Şifre"
                            widthSize="w-full"
                            required
                        />
                        <InputField
                            name="passwordAgain"
                            control={control}
                            label="Şifre Tekrar"
                            type="password"
                            placeholder="Şifre Tekrar"
                            widthSize="w-full"
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Kayıt Ol
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm">
                        Zaten bir hesabınız var mı?{" "}
                        <Link href={`/${locale}/auth/login`}>
                            <span className="font-medium text-indigo-600 hover:text-indigo-500">
                                Giriş Yap
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
