'use client'

import { useState } from 'react';
import Header from "@/app/[locale]/components/features/Header";
import LeftSidebar from "@/app/[locale]/components/features/LeftSidebar";
import MainContent from "@/app/[locale]/components/features/MainContent";
import RightSidebar from "@/app/[locale]/components/features/RightSidebar";

export default function Feeds() {
    const [activeMenu, setActiveMenu] = useState('default');

    const handleMenuSelect = (menuItem: string) => {
        setActiveMenu(menuItem);
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
