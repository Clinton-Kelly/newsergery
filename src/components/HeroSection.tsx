import { Button } from '@/components/ui/button';
import { ChevronDown, Eye, Target } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';
import backgroundWoman from '@/assets/background-woman.png';
import { FlyingBird } from './FlyingBird';
import { WaveBorder } from './WaveBorder';

export const HeroSection = () => {
  const scrollToNext = () => {
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen bg-gray-200 overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full z-10">
        <img 
          src={backgroundWoman} 
          alt="African Woman" 
          className="w-full h-full object-cover object-left-top"
        />
      </div>

      {/* Large FUNCTIONS OF AIIKS Text Overlay - background text */}
      <div className="absolute inset-0 flex items-center justify-center z-5">
        <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] font-bold text-gray-400 opacity-50 leading-none tracking-wider select-none whitespace-nowrap">
          FUNCTIONS OF AIIKS
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 container mx-auto px-6 min-h-screen flex flex-col">
        
        {/* Top Content Area */}
        <div className="flex-1 flex items-center">
          <div className="max-w-lg lg:max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
              African Indigenous Knowledge
              <br />
              <span className="text-orange-500">Systems</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-md">
              The main objective of AIIKS is to ensure continued IKS relevance and impact by developing,
              preserving, protecting and promoting IKS.
            </p>

            {/* Scroll Down Indicator */}
            <div className="flex items-center text-orange-500">
              <div className="w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center mr-3">
                <ChevronDown className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Scroll Down</span>
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards - positioned at bottom */}
        <div className="pb-20">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Vision Card */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 text-orange-500">
                <svg viewBox="0 0 64 64" className="w-full h-full" fill="currentColor">
                  <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm0 6c9.9 0 18 8.1 18 18s-8.1 18-18 18-18-8.1-18-18 8.1-18 18-18zm0 8c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 6c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Vision</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                An African Indigenous Knowledge hub for the Advancement of African 
                Scholarship and Restoration of African Dignity.
              </p>
              <button 
                onClick={() => window.location.href = '/vision-mission'}
                className="text-orange-500 font-medium text-sm hover:underline flex items-center justify-center"
              >
                View More <span className="ml-1">→</span>
              </button>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-lg p-8 shadow-lg text-center border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 text-orange-500">
                <svg viewBox="0 0 64 64" className="w-full h-full" fill="currentColor">
                  <path d="M12 20v24h40V20H12zm36 20H16V24h32v16zM20 28h16v4H20v-4zm0 8h24v4H20v-4z"/>
                  <circle cx="48" cy="16" r="8"/>
                  <path d="M44 12h8v8h-8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Mission</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                To promote and support the contribution of African Indigenous 
                Knowledge Systems to the global pool of knowledge.
              </p>
              <button 
                onClick={() => window.location.href = '/vision-mission'}
                className="text-orange-500 font-medium text-sm hover:underline flex items-center justify-center"
              >
                View More <span className="ml-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Flying Bird Animation */}
      <FlyingBird />
      
      {/* Wave Border */}
      <WaveBorder />
    </section>
  );
};