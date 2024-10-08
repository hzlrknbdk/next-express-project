import { useState } from "react";
import Search from "./Search";

interface Friend {
    id: number;
    name: string;
    profilePic: string;
    lastActive: number | null;
}

const initialFriends: Friend[] = [
    { id: 1, name: "Hazal Budak", profilePic: "/john.jpg", lastActive: null },
    { id: 2, name: "Hazal Budak", profilePic: "/jane.jpg", lastActive: 10 },
    { id: 3, name: "Hazal Budak", profilePic: "/emily.jpg", lastActive: 25 },
];

export default function RightSidebar() {
    const [friends, setFriends] = useState<Friend[]>(initialFriends);


    return (
        <aside className="w-64 rounded-sm bg-white text-gray-500 p-4 mt-2">
            <Search />
            <div className="mt-5 font-semibold">FRIENDS </div>
            <ul className="mt-3 space-y-3">
                {friends.length > 0 ? (
                    friends.map((friend) => (
                        <li key={friend.id} className="flex items-center space-x-3">
                            <img
                                src="/assets/images/pexels-2.jpg"
                                alt={`${friend.name}'s profile`}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="text-gray-700">{friend.name}</div>
                                <div className="text-sm text-gray-400">
                                    {friend.lastActive === null ? (
                                        <span className="flex items-center space-x-1 text-green-500">
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                            <span>Active now</span>
                                        </span>
                                    ) : (
                                        `${friend.lastActive} minutes ago`
                                    )}
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>Loading friends...</li>
                )}
            </ul>
        </aside>
    );
}
