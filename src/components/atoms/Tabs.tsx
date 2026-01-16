'use client';

import { ReactNode } from 'react';

interface Tab {
    id: string;
    label: string;
    icon?: string;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (tabId: string) => void;
    children: ReactNode;
}

export default function Tabs({ tabs, activeTab, onChange, children }: TabsProps) {
    return (
        <div className="w-full">
            <div className="border-b border-gray-200">
                <nav className="flex -mb-px" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onChange(tab.id)}
                            className={`
                                flex-1 py-2 px-4 text-center border-b-2 font-medium text-sm
                                transition-colors duration-200
                                ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
                            `}
                        >
                            {tab.icon && <span className="mr-2">{tab.icon}</span>}
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="pt-6">
                {children}
            </div>
        </div>
    );
}