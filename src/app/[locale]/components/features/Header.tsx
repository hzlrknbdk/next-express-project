import { Disclosure, DisclosureButton, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import Search from "./Search";

interface HeaderProps {
    onMenuSelect: (menuItem: string) => void;
}

export default function Header({ onMenuSelect }: HeaderProps) {
    const t = useTranslations('header');

    const menuItems = [
        { label: t('profile'), value: 'profile' },
        { label: t('settings'), value: 'settings' },
        { label: t('feeds'), value: 'feeds' },
    ];

    return (
        <Disclosure as="nav" className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src="/assets/images/adesso-logo.png"
                                className="h-16 w-auto"
                            />
                        </div>
                        <div className="hidden sm:ml-8 sm:block mt-3">
                            <Search />
                        </div>
                    </div>

                    <Menu as="div" className="relative ml-3">
                        <div>
                            <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="h-8 w-8 rounded-full"
                                />
                            </MenuButton>
                        </div>
                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            {menuItems.map((item) => (
                                <MenuItem key={item.value}>
                                    <a
                                        onClick={() => onMenuSelect(item.value)}
                                        className="block px-4 py-2 text-sm text-gray-500 data-[focus]:bg-gray-100"
                                    >
                                        {item.label}
                                    </a>
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </Menu>

                    <LocaleSwitcher />

                </div>
            </div>
        </Disclosure>
    );
}