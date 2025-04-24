"use client"
import { Brain, Code, Zap } from 'lucide-react';
import ServiceCard from './servicecard';

const Services = () => {
  const services = [
    {
      icon: <Brain size={24} />,
      title: "AI Powered",
      description: "Generate custom 2D floor plans instantly",
      features: [
        "Natural Language to Layout Conversion",
        "Natural Language Processing",
        "Adaptive Room Arrangement",
        "Real-Time Feedback Loop"
      ]
    },
    {
      icon: <Code size={24} />,
      title: "Web-Based Design",
      description: "Responsive and modern web applications",
      features: [
        "Chat-Based Input Interface",
        "Responsive & Real-Time UI",
        "Fast Rendering of 2D Plans",
        "Secure User Login & History Tracking"
      ]
    },
    {
      icon: <Zap size={24} />,
      title: "Educational & Recommendation Tools",
      description: "Seamless connections between platforms and services",
      features: [
        "RESTful API Development",
        "API Documentation",
        "Third-Party Integrations",
        "Context-Aware Suggestions"
      ]
    },

  ];

  return (
    <section id="services" className="bg-[#111111] py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200/50 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl text-white font-bold mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-slate-400 text-xl">
          We build <span className='text-yellow-700 font-semibold'>intelligent, scalable</span> digital ecosystems with cutting-edge <span className='text-yellow-700 font-semibold'>AI and web development</span> services — transforming your <span className='text-yellow-700 font-semibold'>vision into reality</span>, from idea to impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
