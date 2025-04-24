"use client"
import React, { useState, useEffect,useRef  } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import Sidebar from '@/components/Sidebar.tsx';
import ChatScreen from '@/components/chatscreen';
import ChatInput from '@/components/ChatInput';

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
      const res = await fetch('/api/generate-floorplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });
  
      if (!res.ok) throw new Error("Failed to generate floor plan");
      const data = await res.json(); // Response should be { image: 'data:image/png;base64,...' }

      const botMessage = {
        text: "Here's your generated floor plan:",
        isBot: true,
        imageUrl: data.image, // directly use base64
      };
  
      const updatedSessionWithBotMessage = {
        ...updatedSession,
        messages: [...newMessages, botMessage],
      };
  
      setChatSessions(chatSessions.map((session) =>
        session.id === activeSessionId ? updatedSessionWithBotMessage : session
      ));
    } catch (error) {
      console.error('Error fetching data from Flask API', error);
      
      // Add error message to chat
      const errorMessage = { 
        text: "Sorry, I couldn't generate the floor plan. Please try again later.", 
        isBot: true 
      };
      
      const updatedSessionWithError = {
        ...updatedSession,
        messages: [...newMessages, errorMessage],
      };
  
      setChatSessions(chatSessions.map((session) =>
        session.id === activeSessionId ? updatedSessionWithError : session
      ));
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

    <Sidebar
      chatSessions={chatSessions}
      activeSessionId={activeSessionId}
      setActiveSessionId={setActiveSessionId}
      handleNewChat={handleNewChat}
      handleClearStorage={handleClearStorage}
      handleEditChat={handleEditChat}
      handleDeleteChat={handleDeleteChat}
      editingSessionId={editingSessionId}
      editedName={editedName}
      setEditedName={setEditedName}
      handleSaveEdit={handleSaveEdit}
      isSidebarOpen={isSidebarOpen}
    />

    <ChatScreen 
      activeSession={activeSession ?? null}
      isBotTyping={isBotTyping}
      isSidebarOpen={isSidebarOpen}
    />

    <ChatInput
      input={input}
      setInput={setInput}
      handleMessageSend={handleMessageSend}
      handleImageChange={handleImageChange}
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
      isSidebarOpen={isSidebarOpen}
    />
  </div>
);
};
export default Chatbotss;
