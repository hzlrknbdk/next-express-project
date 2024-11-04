import PostList from "@/app/[locale]/posts/list/page";
import Story from "@/app/[locale]/story/page";
import Profile from "@/app/[locale]/profile/page";
import Events from "../../events/page";

interface MainContentProps {
    activeMenu: string;
}

export default function MainContent({ activeMenu }: MainContentProps) {
    return (
        <main className="flex-1 p-6 bg-gray-100">
            {activeMenu === 'profile' ? (
                <Profile />
            ) : activeMenu === 'events' ? (
                <Events />
            ) : (
                <>
                    <Story />
                    <PostList />
                </>
            )}
        </main>
    );
}
