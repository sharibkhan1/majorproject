import { motion } from 'framer-motion';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import addBtn from '../../public/add-30.png';


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

interface SidebarProps {
  chatSessions: ChatSession[];
  activeSessionId: string | null;
  setActiveSessionId: (id: string | null) => void;
  handleNewChat: () => void;
  handleClearStorage: () => void;
  handleEditChat: (id: string) => void;
  handleDeleteChat: (id: string) => void;
  editingSessionId: string | null;
  editedName: string;
  setEditedName: (name: string) => void;
  handleSaveEdit: () => void;
  isSidebarOpen: boolean;
}

const Sidebar = ({
  chatSessions,
  activeSessionId,
  setActiveSessionId,
  handleNewChat,
  handleEditChat,
  handleDeleteChat,
  editingSessionId,
  editedName,
  setEditedName,
  handleSaveEdit,
  isSidebarOpen
}: SidebarProps) => {
  return (
    <div className={`fixed w-64 h-screen bg-[#fcb258] overflow-y-auto z-40 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className='p-5 h-full flex flex-col'>
        <div className='flex mb-15'>
          <span className='text-4xl left-1/2 font-extrabold mt-2' style={{ color: '#4E4E4E' }}>SISU</span>
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
          className="w-full py-2 mb-5 mt-5 rounded-md relative bg-[#FFE0BD]"
        >
          <div className='flex items-center justify-center'>
            <Image src={addBtn} className='h-7 w-7 mr-4' alt="Add button" />
            <p className='text-xl'>New Chat</p>
          </div>
          <span className="block absolute inset-0 rounded-md p-px unique-linear-overlay" />
        </motion.button>

        {/* <motion.button
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
          className="w-full py-2 mb-10 rounded-md relative bg-[#FFE0BD] unique-radial-gradient"
        >
          <div className='flex text-xl items-center justify-center'>
            Clear Storage
          </div>
          <span className="block absolute inset-0 rounded-md p-px unique-linear-overlay" />
        </motion.button> */}

        <div className="space-y-5 mt-10 flex-grow overflow-auto pr-4 mb-24">
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
                onClick={(e) => { e.stopPropagation(); handleEditChat(session.id); }}
              >
                <FontAwesomeIcon icon={faPenToSquare} className="size-6 hover:text-green-500" />
              </button>
              <button
                className="absolute bg-transparent border-none right-2 top-2"
                onClick={(e) => { e.stopPropagation(); handleDeleteChat(session.id); }}
              >
                <FontAwesomeIcon icon={faTrash} className="size-6 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;