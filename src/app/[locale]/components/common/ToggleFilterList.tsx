import { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";

interface ListItem extends Record<string, any> {
    header: string;
    isVisible: boolean;
}

interface ToggleFilterListProps {
    list: ListItem[];
    onVisibilityChange: (header: string, isVisible: boolean) => void;
}

function ToggleFilterList({ list, onVisibilityChange }: ToggleFilterListProps) {
    const [isOpen, setIsOpen] = useState(false);

    const [columnActiveItems, setColumnActiveItems] = useState(
        list.map((item) => ({ ...item, isVisible: item.isVisible || false }))
    );

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (index: number) => {
        const updatedItems = columnActiveItems.map((item, i) =>
            i === index ? { ...item, isVisible: !item.isVisible } : item
        );
        setColumnActiveItems(updatedItems);

        const updatedItem = updatedItems[index];
        onVisibilityChange(updatedItem.header, updatedItem.isVisible);
    };

    return (
        <div className="relative inline-block text-left">
            <FunnelIcon
                onClick={toggleMenu}
                data-testid="funnel-icon"
                className="w-6 h-6 cursor-pointer border border-gray-400 rounded-md p-1 text-gray-600 hover:bg-gray-100"
            />
            {isOpen && (
                <ul role="list" className="absolute left-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-md p-2 z-10 transition-all duration-200 transform origin-top-right">
                    {columnActiveItems.map((item, index) => (
                        <li
                            key={index}
                            role="listitem"
                            className="flex items-center justify-between gap-x-2 py-1 pl-2 text-xs text-gray-700 font-medium"
                        >
                            <span>{item.header}</span>
                            <input
                                type="checkbox"
                                checked={item.isVisible}
                                onChange={() => handleCheckboxChange(index)}
                                className="cursor-pointer"
                                aria-label={item.header}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ToggleFilterList;
