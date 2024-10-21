"use client"
import React, { useState, useEffect,useRef  } from 'react';
import axios from 'axios';
import addBtn from '../../public/add-30.png';
import gptImgLogo from '../../public/c4dd475a926160c734876937ce9aafe4-removebg-preview.png';
import moment from 'moment';
import { motion } from "framer-motion";
 // Import the paper plane icon from react-icons
 import { FaPaperPlane, FaUpload } from 'react-icons/fa'; // Importing the upload icon
 import Image from 'next/image';
 import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import FileUpload from "@/components/file-upload";
import { v4 as uuidv4 } from 'uuid'; 
import { cn } from "@/lib/utils";
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern';

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

const Chatbotss = () => {
  const [input, setInput] = useState<string>(""); // Typing input state
  const [image, setImage] = useState<File | null>(null); // State for the selected image
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Typing ref for textarea
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    const storedSessions = localStorage.getItem('chatSessions');
    return storedSessions ? JSON.parse(storedSessions) : [{ id: 1, name: 'Chat 1', messages: [{ text: "Hi there! How can I help you?", isBot: true }] }];
  });
  const [activeSessionId, setActiveSessionId] = useState<string | null>(chatSessions[0]?.id || null);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // State for the selected image

  useEffect(() => {
    localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
  }, [chatSessions]);

  const activeSession = chatSessions.find((session) => session.id === activeSessionId);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    // Adjust the height of the textarea to its content
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleNewChat = () => {
    const newSessionId = uuidv4(); // Generate a unique ID
    const newSession: ChatSession = {
      id: newSessionId,
      created_at: new Date().toISOString(), // Add created_at field
      name: `Chat ${chatSessions.length + 1}`, // Name can still be based on the number of chats
      messages: [{ text: "Hi there! How can I help you?", isBot: true }],
    };
    setChatSessions([...chatSessions, newSession]);
    setActiveSessionId(newSessionId);
  };

  const handleDeleteChat = (id: string) => {
    const updatedSessions = chatSessions.filter((session) => session.id !== id);
    setChatSessions(updatedSessions);
    if (id === activeSessionId && updatedSessions.length > 0) {
      setActiveSessionId(updatedSessions[0].id);
    } else if (updatedSessions.length === 0) {
      setActiveSessionId(null);
    }
  };

  const handleEditChat = (id: string) => {
    setEditingSessionId(id);
    const sessionToEdit = chatSessions.find((session) => session.id === id);
    if (sessionToEdit) setEditedName(sessionToEdit.name);
  };

  const handleSaveEdit = () => {
    if (editedName.length > 15) {
      alert("Name cannot exceed 15 characters.");
      return;
    }
    
    const updatedSessions = chatSessions.map(session =>
      session.id === editingSessionId ? { ...session, name: editedName } : session
    );
    setChatSessions(updatedSessions);
    setEditingSessionId(null);
  };

  const handleMessageSend = async () => {
    if (input.trim() !== "" || selectedImage) { // Check if input or image exists
      await sendMessage(input, selectedImage); // Send the current input and selected image
      setInput(""); // Clear input after sending message
      setSelectedImage(null); // Clear the selected image
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height after sending
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline from Enter
      handleMessageSend();
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  
    // Clean up the effect
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSidebarOpen]);
  
  const handleClearStorage = () => {
    localStorage.clear();
    setChatSessions([]);
    setActiveSessionId(null);
    alert('Local storage has been cleared!');
  };

  const sendMessage = async (text: string, image: File | null) => {
    if (!activeSession) return;

    const newMessages = [...activeSession.messages, { text, isBot: false, imageUrl: image ? URL.createObjectURL(image) : undefined }];
    const updatedSession: ChatSession = { ...activeSession, messages: newMessages };

    setChatSessions(chatSessions.map((session) =>
      session.id === activeSessionId ? updatedSession : session
    ));

    console.log("Sending request to Flask API with query:", text);
    setIsBotTyping(true);

    try {
      const res = await axios.post<{ result: string }>('https://4f5f-35-230-57-226.ngrok-free.app/generate', {
        query: text,
      });

      console.log("Received response from Flask API:", res.data);

      const botMessage = { text: res.data.result, isBot: true };
      const updatedSessionWithBotMessage = {
        ...updatedSession,
        messages: [...newMessages, botMessage],
      };

      setChatSessions(chatSessions.map((session) =>
        session.id === activeSessionId ? updatedSessionWithBotMessage : session
      ));
    } catch (error) {
      console.error('Error fetching data from Flask API', error);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]); // Set the selected image
    }
  };

  return (
<div className="min-h-screen flex bg-[#F5F5F5] bg-cover bg-center scrollbar-hidden" style={{ backgroundImage: `url('../../public/96c2e8fda549ae99693e87ffeba899ef.jpg')` }}>
       {/* Sidebar toggle button for small screens */}
       <button
        className="lg:hidden fixed top-4 left-4 z-5 p-2 bg-[#FFA947] text-white rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close Menu" : "Open Menu"}
      </button>
  {/* This is sidebar */}
  <div className={`fixed w-64 h-screen bg-[#FFC989]  overflow-y-auto z-40 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
  <div className='p-5 h-full flex flex-col'>
      <div className='flex mb-15'>
        {/* <img src={gptImgLogo} className='w-24 h-24 mx-4' alt="Chatbot Logo" /> */}
        <span className='text-4xl left-1/2 font-medium  mt-2' style={{ color: '#4E4E4E' }}>Sekiro</span>
        </div>
        <motion.button
                      initial={{ "--x": "100%", scale: 1 }}
                      animate={{ "--x": "-100%" }}
                      whileHover={{ scale: 1.06 }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 0.1,
                        type: "spring",
                        stiffness: 20,
                        damping: 15,
                        mass: 2,
                        scale: {
                          type: "spring",
                          stiffness: 10,
                          damping: 5,
                          mass: 0.1,
                        },
                      }}
                      onClick={handleNewChat}
                      className="w-full py-4 mb-5 mt-5 rounded-md relative bg-[#FFE0BD]"
                    >
                      <div className='flex items-center justify-center'>
                      <Image src={addBtn} className='h-7 w-7 mr-4' alt="Add button" /><p className='text-xl'>New Chat</p>

                      </div>
                    <span className="block absolute inset-0 rounded-md p-px unique-linear-overlay" />
                    </motion.button> 
      <motion.button
                      initial={{ "--x": "100%", scale: 1 }}
                      animate={{ "--x": "-100%" }}
                      whileHover={{ scale: 1.06 }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 0.1,
                        type: "spring",
                        stiffness: 20,
                        damping: 15,
                        mass: 2,
                        scale: {
                          type: "spring",
                          stiffness: 10,
                          damping: 5,
                          mass: 0.1,
                        },
                      }}
                      onClick={handleClearStorage}
                      className="w-full py-4 mb-10 rounded-md relative bg-[#FFE0BD] unique-radial-gradient"
                    >
                      <div className='flex text-xl items-center justify-center'>
                      Clear Storage
                      </div>
                    <span className="block absolute inset-0 rounded-md p-px unique-linear-overlay" />
                    </motion.button>
      <div className="space-y-5 flex-grow overflow-auto pr-4 mb-24">
        {chatSessions.map(session => (
     <div
     key={session.id}
     className={`relative p-3 rounded-lg border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200 cursor-pointer ${session.id === activeSessionId ? 'bg-[#FFE0BD] font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0)]' : 'hover:bg-[#FFE0BD]'}`}
     onClick={() => setActiveSessionId(session.id)}
   >
   
            {session.id === editingSessionId ? (
              <input
                type="text"
                className='w-full bg-transparent text-black outline-none whitespace-nowrap overflow-hidden text-ellipsis'
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onBlur={handleSaveEdit}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSaveEdit();
                  }
                }}
                autoFocus
                maxLength={15}
              />
            ) : (
              <span className="text-red-400">{session.name}</span>
            )}
            <div className='mt-2 text-[0.9rem] opacity-70'>
              {moment(session.created_at).calendar(null, {
                sameDay: '[Today]',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] dddd',
                sameElse: 'MMMM Do YYYY',
              })}
            </div>
            <button
  className="absolute z-40 bg-transparent border-none right-12 top-2"
  onClick={(e) => { e.stopPropagation(); handleEditChat(session.id); }}>
  <FontAwesomeIcon icon={faPenToSquare} className="size-6 hover:text-green-500" />
</button>
<button
  className="absolute bg-transparent border-none right-2 top-2"
  onClick={(e) => { e.stopPropagation(); handleDeleteChat(session.id); }}>
  <FontAwesomeIcon icon={faTrash} className="size-6 hover:text-red-500" />
</button>
          </div>
        ))}
      </div>
    </div>
  </div>
  {/* This is ChatScreen */}
  <div className={`flex-1  flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? "ml-0 blur-md opacity-50 pointer-events-none" : "ml-0"} lg:ml-64 mb-12`}>
  <div className="flex-1  overflow-x-hidden  p-4 ">
  <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] top-10 h-screen  fixed skew-y-12",
        )}
      />
    {activeSession ? (
      <>
        {activeSession.messages.map((message, i) => (
          <div
            key={i}
            className={`flex ${message.isBot ? "justify-start" : "justify-end"} mb-4`}
          >
            {message.isBot && (
              <Image
                className='chatImg w-7 h-7 mr-3 lg:w-14 lg:h-14'
                src={gptImgLogo}
                alt="Chatbot avatar"
              />
            )}
            <div
              className={`inline-flex ${message.isBot ? "bg-[#FFC989] rounded-t-2xl rounded-br-2xl" : "bg-[#F1F1F1] rounded-t-2xl rounded-bl-2xl"} shadow-lg backdrop-blur-md p-3 max-w-[75%]`}
              style={{ 
                maxWidth: 'calc(100% - 50px)', 
                whiteSpace: 'pre-wrap', 
                wordWrap: 'break-word',  
                color: message.isBot ? 'white' : '#0c0e0c',
              }}
            >
              <div key={i}>
                {message.imageUrl && (
                  <img src={message.imageUrl} alt="User uploaded" className="max-w-xs rounded-md mb-2" />
                )}
                <p className='text-xs lg:text-xl'>{message.text}</p>
              </div>
            </div>
          </div>
        ))}
        {isBotTyping && (
          <div className="p-2 max-w-[5rem] bg-[#f1b263] rounded-lg"><p  >...</p></div>
        )}
      </>
    ) : (
      <p>No active chat session</p>
    )}
  </div>
    {/* This is input */}
    <div className="fixed z-50 bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center px-4">
  <div
    className={`w-full max-h-32 max-w-4xl p-1.5 mb-3 text-black bg-[#d3d0d0] flex items-center rounded-3xl ${isSidebarOpen ? 'opacity-50 pointer-events-none' : ''}`}
  >
    <label className="ml-2 cursor-pointer">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        className="hidden" // Hiding the input element
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
      onKeyPress={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleMessageSend();
        }
      }}
      className='flex-grow px-3 py-2 text-lg text-black bg-transparent border-none resize-none focus:outline-none overflow-y-auto'
      style={{
        caretColor: 'black',
        maxHeight: '8rem', // Set maximum height
        overflowY: 'auto', // Show scrollbar when needed
        transition: 'height 0.2s ease',
        height: textareaRef.current ? `${textareaRef.current.scrollHeight}px` : 'auto',
      }}
      disabled={isSidebarOpen}  // Disable the textarea when sidebar is open
    />
{selectedImage && ( // Conditionally render the selected image and cross icon
  <div className="absolute top-[-4rem] flex items-center">
    <img 
      src={URL.createObjectURL(selectedImage)} // Display selected image
      alt="Selected"
      className="w-16 h-16 object-cover rounded-md mr-2" // Adjust width/height as needed
    />
    <button
      type="button"
      onClick={() => setSelectedImage(null)} // Function to remove image
      className="text-red-500 hover:text-red-700"
    >
      &times; {/* Cross icon */}
    </button>
  </div>
)}
    {!isSidebarOpen && ( // Conditionally render the send button
      <button
        onClick={handleMessageSend}
        className={`bg-transparent border-none flex items-center justify-center p-2 ${input.trim() ? 'text-white' : 'text-gray-500'}`}
        disabled={!input.trim()} // Disable button if there's no input
      >
        <FaPaperPlane className={`text-lg ${input.trim() ? ' text-[#FFA947] ' : 'text-gray-600'}`} />
      </button>
    )}
  </div>
</div>




  </div>
</div>

  );
};

export default Chatbotss;
