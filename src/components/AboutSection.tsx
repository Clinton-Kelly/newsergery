import { Button } from '@/components/ui/button';
import knowledgeSystems from '@/assets/knowledge-systems.jpg';
import researchInnovation from '@/assets/research-innovation.jpg';
import communityEngagement from '@/assets/community-engagement.jpg';

export const AboutSection = () => {
  const images = [
    { src: knowledgeSystems, alt: 'African Knowledge Systems' },
    { src: researchInnovation, alt: 'Research and Innovation' },
    { src: communityEngagement, alt: 'Community Engagement' }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        
        {/* About Us Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h3 className="text-primary font-semibold text-lg mb-2">ABOUT US</h3>
          <h2 className="section-title">
            African Institute in Indigenous Knowledge Systems
          </h2>
          <p className="section-subtitle">
            (AIIKS) is a consortium of more than 20 Higher Education Institutions-based and 
            Autonomous Research Institutions within and outside Africa.
          </p>
          <Button className="mt-6 bg-gradient-primary hover:shadow-elegant transition-all duration-300">
            Read more ...
          </Button>
        </div>

        {/* Images Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden rounded-xl shadow-card group animate-scale-in stagger-${index + 1}`}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* What We Do Section */}
        <div className="text-center animate-fade-in-up">
          <h3 className="text-primary font-semibold text-lg mb-2">WHAT WE DO</h3>
          <h2 className="section-title mb-12">AIIKS Organogram</h2>
          
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            The AIIKS is systematizing African Indigenous Science, Technology and Innovation 
            in the global knowledge economy through advancing a Theory of Change involving 
            the following pillars:
          </p>

          <div className="grid md:grid-cols-5 gap-4 mt-12">
            {[
              'Research, Innovation and Knowledge Creation',
              'Human Capital Development', 
              'Community Engagement',
              'Communication and Marketing',
              'Sustainability'
            ].map((pillar, index) => (
              <div 
                key={index}
                className={`p-6 bg-card rounded-lg shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-fade-in-up stagger-${index + 1}`}
              >
                <p className="font-semibold text-primary text-sm">{pillar}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};