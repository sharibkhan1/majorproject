import BackdropGradient from "@/components/bggradiant";
import Hero from "@/components/hero";
import Services from "@/components/service";
import { LogoCarouselDemo } from "@/components/techstack";
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Hero />
      <Services/>
      <BackdropGradient className='w-4/12 h-2/6 mt-[140px] z-[4] opacity-70' container="flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-center mt-20 w-[70%] justify-between p-4">
            <div className=" w-[100%] md:w-[60%] text-secondary text-2xl">
            <span className="text-[#eae270] ml-2 font-semibold">AI-powered floor plan assistant</span>. From conversational design input to intelligent room arrangement,
<span className="text-[#e2bd59]">our smart layout generator understands your spatial needs</span>, preferences, and style to create accurate 2D architectural plans in seconds. Whether you&apos;re planning a cozy studio or a modern villa.
 </div>
          
            <div className="w-[100%] mt-[40px] md:mt-0 md:w-[35%]">
              <Image 
                src="/img.png" 
                alt="Description of image" 
                width={500} 
                height={300}
                objectFit="cover"
              />
            </div>
          </div>
          </BackdropGradient>
      <LogoCarouselDemo/>
      
      
    </div>
  );
}
