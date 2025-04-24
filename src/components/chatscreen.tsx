"use client"
import Image from 'next/image';
import AnimatedGridPattern from './ui/animated-grid-pattern';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { leapfrog } from 'ldrs'
import { DownloadIcon } from 'lucide-react';

leapfrog.register()

interface Message {
    text: string;
    isBot: boolean;
    imageUrl?: string; // Optional property for images
  }
  
  interface ChatSession {
    id: string;
    name: string;
    created_at: string; // Or Date if you're using Date objects
    messages: Message[];
  }

  
interface ChatScreenProps {
  activeSession: ChatSession | null;
  isBotTyping: boolean;
  isSidebarOpen: boolean;
}

const ChatScreen = ({ activeSession, isBotTyping, isSidebarOpen }: ChatScreenProps) => {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false); // State for enlarging the image
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null); // Store the selected image URL
  
  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsImageEnlarged(true); // Enlarge the image
  };

  // Function to handle close button click
  const handleClose = () => {
    setIsImageEnlarged(false);
    setSelectedImageUrl(null);
  };

  // Function to handle downloading the image
  const handleDownload = () => {
    if (selectedImageUrl) {
      const link = document.createElement('a');
      link.href = selectedImageUrl;
      link.download = 'arc.png'; // Set the file name
      link.click(); // Trigger the download
    }
  };
  return (
    <div className={`flex-1 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? "ml-0 blur-md opacity-50 pointer-events-none" : "ml-0"} lg:ml-64 mb-12`}>
      <div className="flex-1 overflow-x-hidden p-8">
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] top-10 h-screen fixed skew-y-12",
          )}
        />
        {activeSession ? (
          <>
            {activeSession.messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${message.isBot ? "justify-start" : "justify-end"} mb-4`}
              >
                <div
                  className={`inline-flex ${message.isBot ? "bg-[#f7a94b] rounded-b-2xl rounded-tr-2xl" : "bg-[#F1F1F1] rounded-t-2xl rounded-bl-2xl"} shadow-lg backdrop-blur-md p-3 h-max max-w-[75%]`}
                  style={{ 
                    maxWidth: 'calc(100% - 50px)', 
                    whiteSpace: 'pre-wrap', 
                    wordWrap: 'break-word',  
                    color: message.isBot ? 'white' : '#0c0e0c',
                  }}
                >
                  <div key={i} className="flex flex-col gap-2">
                  {message.imageUrl && (
  <div className="relative">
    {/* Image */}
    <Image
      src={message.imageUrl || ''}  // Ensure a default empty string if undefined
      alt="Generated floor plan"
      className="max-w-xs rounded-md border border-gray-300 cursor-pointer"
      width={300}
      height={300}
      onClick={() => handleImageClick(message.imageUrl!)} // Handle click to enlarge
    />
    
    {/* Download Icon */}
    <button
      onClick={handleDownload}
      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
      aria-label="Download image"
    >
      <DownloadIcon className="w-5 h-5 text-gray-700" />
    </button>
  </div>
)}
  {message.text && (
    <p className='text-xs lg:text-base'>
      {message.text}
    </p>
  )}
</div>
                </div>
              </div>
            ))}
            {isBotTyping && (
              <div className="p-2 max-w-[5rem] items-center flex justify-center text-white  bg-[#f1b263] rounded-lg">
                            <l-leapfrog
  size="20"
  speed="2.5" 
  color="black" 
></l-leapfrog>
              </div>
            )}
          </>
        ) : (
          <p>No active chat session</p>
        )}
{/* Enlarged Image Modal */}
{isImageEnlarged && selectedImageUrl && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative">
              <img
                src={selectedImageUrl}
                alt="Enlarged floor plan"
                className="max-w-[90vw] max-h-[90vh] rounded-md"
              />
              <button
                onClick={handleClose}
                className="absolute w-8 top-2 right-2 bg-white hover:bg-gray-300 rounded-full border border-black text-black hover:text-gray-950 text-3xl font-bold"
              >
                ×
              </button>
              <button
                onClick={handleDownload}
                className="absolute top-2 right-12 bg-white hover:bg-gray-300 px-4 py-2 border border-black rounded-full"
              >
      <DownloadIcon className="w-5 h-5 text-gray-700" />
      </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatScreen;