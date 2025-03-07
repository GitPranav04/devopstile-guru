
import React from 'react';
import { Clock, X } from 'lucide-react';

interface HistoryItem {
  id: string;
  title: string;
  date: Date;
}

interface HistorySidebarProps {
  history: HistoryItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectChat: (id: string) => void;
  activeChat?: string;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ 
  history, 
  isOpen, 
  onClose, 
  onSelectChat,
  activeChat
}) => {
  return (
    <div className={`fixed top-0 left-0 h-full transform transition-transform duration-300 ease-in-out z-20
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="h-full w-64 bg-theme-dark/80 backdrop-blur-md border-r border-white/10 shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h3 className="text-white font-medium flex items-center">
            <Clock size={16} className="mr-2" />
            History
          </h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-60px)] py-2">
          {history.length === 0 ? (
            <div className="text-white/50 text-sm p-4 text-center">
              No conversation history yet
            </div>
          ) : (
            <ul>
              {history.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onSelectChat(item.id)}
                    className={`w-full text-left p-3 hover:bg-white/10 transition-colors ${
                      activeChat === item.id ? 'bg-white/10' : ''
                    }`}
                  >
                    <div className="text-white text-sm truncate">{item.title}</div>
                    <div className="text-white/50 text-xs">
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(item.date)}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-10 md:hidden" 
          onClick={onClose}
        />
      )}
    </div>
  );
};

export default HistorySidebar;
