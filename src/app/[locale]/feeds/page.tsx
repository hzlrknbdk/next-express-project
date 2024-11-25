'use client'

import { useState } from 'react';
import Header from "@/app/[locale]/components/features/Header";
import LeftSidebar from "@/app/[locale]/components/features/LeftSidebar";
import MainContent from "@/app/[locale]/components/features/MainContent";
import RightSidebar from "@/app/[locale]/components/features/RightSidebar";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function Feeds() {
    const [activeMenu, setActiveMenu] = useState('default');
    const locale = useLocale();
    const router = useRouter();

    const onLogout = () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        localStorage.removeItem("accessToken");
        router.push(`/${locale}/auth/login`);
    };

    const handleMenuSelect = (menuItem: string) => {
        setActiveMenu(menuItem);

        if (menuItem === 'logout') {
            onLogout()
        }
    };

    return (
        <>
            <Header onMenuSelect={handleMenuSelect} />
            <div className="flex h-screen">
                <LeftSidebar onMenuSelect={handleMenuSelect} />
                <MainContent activeMenu={activeMenu} />
                <RightSidebar />
            </div>
        </>
    );
}
