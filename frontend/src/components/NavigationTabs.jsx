
import React, { useRef, useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Book, Cpu, Puzzle } from 'lucide-react';

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'solver', label: 'Cube Solver', icon: Puzzle },
    { id: 'notation', label: 'Notation Guide', icon: Book },
    { id: 'methods', label: 'Solving Methods', icon: Cpu }
  ];

  // Animated underline logic
  const tabRefs = useRef([]);
  const underlineRef = useRef(null);

  useEffect(() => {
    const activeIdx = tabs.findIndex(tab => tab.id === activeTab);
    const activeTabEl = tabRefs.current[activeIdx];
    const underline = underlineRef.current;
    if (activeTabEl && underline) {
      const { offsetLeft, offsetWidth } = activeTabEl;
      underline.style.transform = `translateX(${offsetLeft-1}px)`;
      underline.style.width = `${offsetWidth}px`;
    }
  }, [activeTab, tabs]);

  // Theme toggle logic
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className="sticky top-0 left-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="relative flex left-0 items-center justify-center space-x-1 py-4">
          {tabs.map((tab, idx) => {
            const IconComponent = tab.icon;
            return (
              <Button
                key={tab.id}
                ref={el => (tabRefs.current[idx] = el)}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                className={`px-6 py-3 font-medium relative left-0 z-10 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            );
          })}
          {/* Animated underline */}
          <span
            ref={underlineRef}
            className="absolute left-0 bottom-2 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 z-0"
            style={{ width: 10, transform: 'translateX(4px)' }}
            aria-hidden="true"
          />
          {/* Theme toggle button */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 ml-4 p-2 text-yellow-400 hover:text-yellow-500 dark:text-blue-300 dark:hover:text-blue-400 transition-colors"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button> */}
        </div>
      </div>
    </nav>
  );
};

export default NavigationTabs;