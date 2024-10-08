import PostList from "@/pages/posts/postList";
import StoryArea from "@/pages/stories/storyArea";

export default function MainContent() {
    return (
        <main className="flex-1 p-6 bg-gray-100">
            <StoryArea />
            <PostList />
        </main>
    );
}
