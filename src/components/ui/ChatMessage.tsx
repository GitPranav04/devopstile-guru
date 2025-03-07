
import React from 'react';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  image?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, isUser, timestamp, image }) => {
  return (
    <div className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'} animate-scale-in`}>
      <div className={`max-w-[80%] rounded-lg p-3 ${
        isUser 
          ? 'bg-theme-medium/60 text-white'
          : 'bg-theme-light/70 text-theme-dark'
      }`}>
        {image && (
          <div className="mb-2">
            <img 
              src={image} 
              alt="Attached" 
              className="max-w-full rounded-md max-h-64 object-contain"
            />
          </div>
        )}
        <div className="whitespace-pre-wrap">{content}</div>
        <div className={`text-xs mt-1 ${isUser ? 'text-white/70' : 'text-theme-dark/70'}`}>
          {new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          }).format(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
