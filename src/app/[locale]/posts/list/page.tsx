import PostCard from '../card/page'
import { useTranslations } from 'next-intl';

interface Post {
    id: number;
    image: string;
    userProfile: string;
    userName: string;
    likes: number;
    comments: number;
    desc: string;
}

const posts: Post[] = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=500&q=60",
        userProfile: "/assets/images/pexels-2.jpg",
        userName: "Hazal Budak",
        likes: 120,
        comments: 45,
        desc: "This is a description of the first post. It contains some details about the content.",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=500&q=60",
        userProfile: "/assets/images/pexels-2.jpg",
        userName: "Hazal Budak",
        likes: 89,
        comments: 12,
        desc: "This is a description of the second post. More content details are here.",
    },
];

export default function PostList() {
    const t = useTranslations('postList');

    return (
        <>
            <h1 className="text-xl font-bold text-gray-500 py-5">{t('recentPosts')}</h1>
            <div className="flex flex-wrap justify-start min-h-screen bg-gray-100 pl-5 gap-5">
                {posts.map((post) => (
                    <div key={post.id} className="flex-basis-1/2 max-w-[calc(50%-1rem)]">
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
        </>
    );
}
