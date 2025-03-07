
import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/layout/NavBar';
import ChatInput from '../components/ui/ChatInput';
import ChatMessage from '../components/ui/ChatMessage';
import FAQ from '../components/ui/FAQ';
import HistorySidebar from '../components/ui/HistorySidebar';
import { Clock } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  image?: string;
}

interface ChatHistory {
  id: string;
  title: string;
  date: Date;
  messages: Message[];
}

// Mock FAQ data
const initialFaqs = [
  {
    question: "What is DevOps?",
    answer: "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the systems development life cycle while delivering features, fixes, and updates frequently in close alignment with business objectives."
  },
  {
    question: "What are CI/CD pipelines?",
    answer: "CI/CD stands for Continuous Integration and Continuous Delivery/Deployment. These pipelines automate the building, testing, and deployment of applications, enabling teams to release code changes more frequently and reliably."
  },
  {
    question: "What is Infrastructure as Code (IaC)?",
    answer: "Infrastructure as Code is the process of managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools."
  },
  {
    question: "Which tools are commonly used for monitoring in DevOps?",
    answer: "Common monitoring tools include Prometheus, Grafana, Nagios, New Relic, Datadog, and ELK Stack (Elasticsearch, Logstash, and Kibana)."
  }
];

const DevOpsAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [faqs, setFaqs] = useState(initialFaqs);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Initialize a new chat when the component mounts
  useEffect(() => {
    if (!currentChatId) {
      createNewChat();
    }
  }, []);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const createNewChat = () => {
    const newChatId = `chat_${Date.now()}`;
    setCurrentChatId(newChatId);
    setChatHistory(prev => [
      ...prev,
      {
        id: newChatId,
        title: "New Conversation",
        date: new Date(),
        messages: []
      }
    ]);
    setMessages([]);
  };

  const selectChat = (chatId: string) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
      setIsSidebarOpen(false);
    }
  };

  const handleSendMessage = async (text: string, imageFile?: File) => {
    // Process image if exists
    let imageUrl = '';
    if (imageFile) {
      // In a real app, you would upload the image to a server and get a URL
      // Here we're just creating a temporary object URL for demonstration
      imageUrl = URL.createObjectURL(imageFile);
    }

    // Add user message
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      content: text,
      isUser: true,
      timestamp: new Date(),
      image: imageUrl
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // Update chat history
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === currentChatId 
          ? {
              ...chat,
              title: text.substring(0, 30) || "New Conversation",
              messages: updatedMessages
            }
          : chat
      )
    );

    // Mock AI response (in a real app, this would be an API call)
    setTimeout(() => {
      // Generate a response based on the query
      const aiResponse = generateMockResponse(text);
      
      const botMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      
      // Update chat history with bot response
      setChatHistory(prev => 
        prev.map(chat => 
          chat.id === currentChatId 
            ? { ...chat, messages: finalMessages }
            : chat
        )
      );

      // Update FAQs based on the query (simplified logic)
      updateFaqBasedOnQuery(text);
    }, 1000);
  };

  // Mock response generation - in a real app this would be from an AI API
  const generateMockResponse = (query: string): string => {
    // Simple keyword-based response logic
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('docker') || queryLower.includes('container')) {
      return "Docker is a platform for developing, shipping, and running applications in containers. Containers are lightweight and contain everything needed to run the application, so they're portable across different environments.";
    } else if (queryLower.includes('kubernetes') || queryLower.includes('k8s')) {
      return "Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It groups containers into logical units for easy management and discovery.";
    } else if (queryLower.includes('pipeline') || queryLower.includes('ci/cd')) {
      return "CI/CD pipelines automate your software delivery process. The pipeline builds code, runs tests, and safely deploys a new version of the application. By automating this process, you reduce the chance of introducing errors when deploying new code.";
    } else if (queryLower.includes('terraform') || queryLower.includes('iac')) {
      return "Terraform is an infrastructure as code tool that lets you define both cloud and on-prem resources in human-readable configuration files that you can version, reuse, and share. You can then use a consistent workflow to provision and manage all of your infrastructure.";
    } else {
      return "I'm your DevOps assistant. I can help with topics like containerization, Kubernetes, CI/CD pipelines, infrastructure as code, monitoring, and other DevOps practices. What specific information are you looking for?";
    }
  };

  // Update FAQs based on query - simplified version
  const updateFaqBasedOnQuery = (query: string) => {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('docker') || queryLower.includes('container')) {
      // Update FAQs with Docker-related questions
      setFaqs([
        {
          question: "What is Docker?",
          answer: "Docker is a platform for developing, shipping, and running applications in isolated environments called containers."
        },
        {
          question: "What's the difference between Docker and virtual machines?",
          answer: "Docker containers share the host OS kernel, making them more lightweight than VMs, which include a full OS copy."
        },
        {
          question: "What is Docker Compose?",
          answer: "Docker Compose is a tool for defining and running multi-container Docker applications using a YAML file."
        },
        {
          question: "How do I optimize Docker images?",
          answer: "Use multi-stage builds, minimize layers, leverage caching, and use lightweight base images like Alpine."
        }
      ]);
    } else if (queryLower.includes('kubernetes') || queryLower.includes('k8s')) {
      // Update FAQs with Kubernetes-related questions
      setFaqs([
        {
          question: "What is Kubernetes?",
          answer: "Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications."
        },
        {
          question: "What are Kubernetes pods?",
          answer: "Pods are the smallest deployable units in Kubernetes that can be created and managed. A pod contains one or more containers."
        },
        {
          question: "What's the difference between a Deployment and StatefulSet?",
          answer: "Deployments are for stateless applications, while StatefulSets are for applications that require persistent storage and stable network identifiers."
        },
        {
          question: "What is a Kubernetes Ingress?",
          answer: "Ingress is an API object that manages external access to services in a cluster, typically HTTP, providing load balancing and name-based virtual hosting."
        }
      ]);
    } else if (queryLower.includes('ci') || queryLower.includes('cd') || queryLower.includes('pipeline')) {
      // Update FAQs with CI/CD-related questions
      setFaqs([
        {
          question: "What is CI/CD?",
          answer: "CI/CD stands for Continuous Integration and Continuous Delivery/Deployment. It automates building, testing, and deployment, enabling faster releases."
        },
        {
          question: "What are popular CI/CD tools?",
          answer: "Popular tools include Jenkins, GitHub Actions, GitLab CI/CD, CircleCI, Travis CI, and TeamCity."
        },
        {
          question: "What's the difference between Continuous Delivery and Continuous Deployment?",
          answer: "Continuous Delivery ensures code can be deployed at any time but requires manual approval, while Continuous Deployment automatically deploys every change that passes tests."
        },
        {
          question: "What are CI/CD best practices?",
          answer: "Best practices include automated testing, failing fast, maintaining a single source of truth, using infrastructure as code, and keeping builds fast."
        }
      ]);
    } else {
      // Default to general DevOps FAQs
      setFaqs(initialFaqs);
    }
  };

  return (
    <div className="min-h-screen theme-gradient flex flex-col">
      <NavBar />
      
      <main className="flex-grow flex flex-col relative">
        {/* History button for mobile */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-theme-dark/50 text-white hover:bg-theme-dark/70 transition-colors"
          aria-label="Show history"
        >
          <Clock size={20} />
        </button>
        
        {/* History sidebar */}
        <HistorySidebar 
          history={chatHistory.map(chat => ({
            id: chat.id,
            title: chat.title,
            date: chat.date
          }))}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onSelectChat={selectChat}
          activeChat={currentChatId}
        />
        
        <div className="container mx-auto flex-grow flex flex-col p-4 md:p-8 page-transition">
          <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-light text-white mb-6 text-center md:text-left">
              DevOps Assistant
            </h1>
            
            <div className="flex flex-col h-[calc(100vh-240px)] bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
              {/* Chat messages */}
              <div ref={chatWindowRef} className="chat-window flex-grow p-4 overflow-y-auto">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-white/70">
                    <p className="mb-2">Ask me anything about DevOps!</p>
                    <p className="text-sm">Examples: Docker, Kubernetes, CI/CD pipelines, Terraform</p>
                  </div>
                )}
                
                {messages.map((msg) => (
                  <ChatMessage 
                    key={msg.id}
                    content={msg.content}
                    isUser={msg.isUser}
                    timestamp={msg.timestamp}
                    image={msg.image}
                  />
                ))}
              </div>
              
              {/* Chat input */}
              <div className="p-4">
                <ChatInput onSendMessage={handleSendMessage} />
              </div>
            </div>
            
            {/* FAQs section */}
            <FAQ items={faqs} />
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-white/50 text-sm">
        <p>&copy; {new Date().getFullYear()} DevOpsTile. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DevOpsAssistant;
