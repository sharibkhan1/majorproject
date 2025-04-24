"use client"
import { useRef } from 'react';
import { FaUpload, FaPaperPlane } from 'react-icons/fa';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleMessageSend: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  isSidebarOpen: boolean;
}

const ChatInput = ({
  input,
  setInput,
  handleMessageSend,
  handleImageChange,
  selectedImage,
  setSelectedImage,
  isSidebarOpen
}: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleMessageSend();
    }
  };

  return (
    <div className="fixed z-50 bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center px-4">
      <div
        className={`w-full max-h-32 max-w-4xl p-1.5 mb-3 text-black bg-[#d3d0d0] flex items-center rounded-3xl ${isSidebarOpen ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <label className="ml-2 cursor-pointer">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="hidden"
          />
          <FaUpload className="text-gray-600 hover:text-gray-800 transition" size={24} />
        </label>

        <textarea
          ref={textareaRef}
          rows={1}
          placeholder={isSidebarOpen ? '' : 'Enter your prompt'}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className='flex-grow px-3 py-2 text-lg text-black bg-transparent border-none resize-none focus:outline-none overflow-y-auto'
          style={{
            caretColor: 'black',
            maxHeight: '8rem',
            overflowY: 'auto',
            transition: 'height 0.2s ease',
            height: textareaRef.current ? `${textareaRef.current.scrollHeight}px` : 'auto',
          }}
          disabled={isSidebarOpen}
        />

        {selectedImage && (
          <div className="absolute top-[-4rem] flex items-center">
            <img 
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-16 h-16 object-cover rounded-md mr-2"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        )}

        {!isSidebarOpen && (
          <button
            onClick={handleMessageSend}
            className={`bg-transparent border-none flex items-center justify-center p-2 ${input.trim() ? 'text-white' : 'text-gray-500'}`}
            disabled={!input.trim()}
          >
            <FaPaperPlane className={`text-lg ${input.trim() ? ' text-[#e29134] ' : 'text-gray-600'}`} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatInput;