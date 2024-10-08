const stories = [
    { id: 1, image: '/assets/images/pexels-1.jpg', alt: 'Story 2' },
    { id: 2, image: '/assets/images/pexels-1.jpg', alt: 'Story 2' },
    { id: 3, image: '/assets/images/pexels-1.jpg', alt: 'Story 2' },
    { id: 4, image: '/assets/images/pexels-1.jpg', alt: 'Story 2' },
    { id: 5, image: '/assets/images/pexels-1.jpg', alt: 'Story 2' },

];

const StoryArea = () => {
    return (
        <>
            <h1 className="text-xl font-bold text-gray-500">Stories</h1>
            <div className="flex space-x-4 overflow-x-auto pt-4">
                {stories.map((story) => (
                    <div key={story.id} className="relative w-40 h-auto rounded-lg overflow-hidden">
                        <img
                            src={story.image}
                            alt={story.alt}
                            className="w-40 h-auto object-cover opacity-70"
                        />
                    </div>
                ))}
            </div></>
    );
};

export default StoryArea;
