// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import MainContent from "@/components/MainContent";
import RightSidebar from "@/components/RightSidebar";

export default function Feeds() {
    // const router = useRouter();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         router.push('/auth/login');
    //     }
    // }, [router]);

    return (
        <>
            <Header />
            <div className="flex h-screen">
                <LeftSidebar />
                <MainContent />
                <RightSidebar />
            </div>
        </>
    );
}
