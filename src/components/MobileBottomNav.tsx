import React from 'react';
import { Home, Sparkles, Edit3, LayoutGrid, FolderKanban } from 'lucide-react';
import { Screen } from '../types';

interface MobileBottomNavProps {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentScreen,
  setCurrentScreen,
}) => {
  const items = [
    { screen: 'landing' as Screen, label: 'Home', icon: Home },
    { screen: 'builder' as Screen, label: 'AI Build', icon: Sparkles, highlight: true },
    { screen: 'editor' as Screen, label: 'Editor', icon: Edit3 },
    { screen: 'templates' as Screen, label: 'Templates', icon: LayoutGrid },
    { screen: 'projects' as Screen, label: 'My Sites', icon: FolderKanban },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-[#0B0F19]/95 backdrop-blur-lg px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => setCurrentScreen(item.screen)}
              id={`mobile-tab-${item.screen}`}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all ${
                item.highlight && !isActive
                  ? 'text-indigo-400'
                  : isActive
                  ? 'text-indigo-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-md transition ${
                  isActive ? 'bg-indigo-600/20' : item.highlight ? 'bg-indigo-500/10' : ''
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'scale-110 text-indigo-400' : ''}`} />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
