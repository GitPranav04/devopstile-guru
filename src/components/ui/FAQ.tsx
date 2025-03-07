
import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ items }) => {
  return (
    <div className="w-full mt-8">
      <h3 className="text-white font-semibold mb-4 text-xl">Frequently Asked Questions</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="rounded-lg p-4 bg-white/20 backdrop-blur-sm border border-white/20 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h4 className="font-medium text-white mb-2">{item.question}</h4>
            <p className="text-white/90 text-sm">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
