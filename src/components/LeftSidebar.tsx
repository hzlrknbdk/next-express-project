import React from 'react';
import { HomeIcon, UsersIcon, CalendarIcon, VideoCameraIcon, PhotoIcon, FolderIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
    const menuItems = [
        { name: 'Feed', icon: <HomeIcon className="w-6 h-6 mr-2 text-gray-500" /> },
        { name: 'Friends', icon: <UsersIcon className="w-6 h-6 mr-2 text-gray-500" /> },
        { name: 'Events', icon: <CalendarIcon className="w-6 h-6 mr-2 text-gray-500" /> },
        { name: 'Watch Videos', icon: <VideoCameraIcon className="w-6 h-6 mr-2 text-gray-500" /> },
        { name: 'Photos', icon: <PhotoIcon className="w-6 h-6 mr-2 text-gray-500" /> },
        { name: 'Files', icon: <FolderIcon className="w-6 h-6 mr-2 text-gray-500" /> },
    ];

    return (
        <div className="flex">
            <div className="w-64 h-screen bg-white text-gray-500 overflow-y-auto">
                <div className="p-4">
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.name} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
                                {item.icon}
                                <span className='ml-3'>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
