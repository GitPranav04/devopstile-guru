
import React, { useState, useRef } from 'react';
import { Send, Image } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string, image?: File) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (message.trim() || image) {
      onSendMessage(message, image || undefined);
      setMessage('');
      setImage(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  return (
    <div className="chat-input-container p-3 animate-fade-in">
      {image && (
        <div className="mb-2 p-2 bg-white/20 rounded-md flex items-center justify-between">
          <span className="text-sm text-theme-dark truncate max-w-[200px]">{image.name}</span>
          <button 
            onClick={() => setImage(null)}
            className="text-theme-dark/80 hover:text-theme-dark"
          >
            &times;
          </button>
        </div>
      )}
      <div className="flex items-end">
        <button 
          onClick={handleImageSelect}
          className="p-2 text-theme-dark/80 hover:text-theme-dark transition-colors"
          aria-label="Upload image"
        >
          <Image size={20} />
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*" 
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your DevOps query here..."
          className="w-full resize-none bg-transparent border-0 focus:ring-0 text-theme-dark placeholder-theme-dark/60 py-3 px-2 max-h-32 overflow-y-auto"
          rows={1}
        />
        <button
          onClick={handleSendMessage}
          disabled={!message.trim() && !image}
          className={`p-2 rounded-md ${
            message.trim() || image
              ? 'text-theme-dark hover:bg-theme-medium/20 transition-colors'
              : 'text-theme-dark/50'
          }`}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
