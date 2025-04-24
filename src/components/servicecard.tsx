"use client"
import { useState, useRef, MouseEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard = ({ icon, title, description, features }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    cardRef.current.style.setProperty('--x', `${x}%`);
    cardRef.current.style.setProperty('--y', `${y}%`);
  };

  return (
    <Card 
      ref={cardRef}
      className={`card-glow py-6 shadow-xl shadow-black/10 border-white/50 rounded-3xl transition-all duration-300 h-full ${
        isHovered ? 'transform scale-[1.02] border-white/30' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <CardHeader>
        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-black/10  mb-4 text-yellow-500">
          {icon}
        </div>
        <CardTitle className={`text-xl transition-colors duration-300 text-black/90`}>
          {title}
        </CardTitle>
        <CardDescription className="text-slate-500">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className='px-6'>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-slate-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {/* <Button variant="ghost" className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 p-0 flex items-center group">
          <span>Learn more</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button> */}
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
