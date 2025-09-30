import { Button } from '@/components/ui/button';
import { 
  Users, 
  BookOpen, 
  Microscope, 
  Building, 
  Calendar, 
  GraduationCap 
} from 'lucide-react';

export const ServicesSection = () => {
  const services = [
    {
      icon: Users,
      title: 'The AIIKS Governing Board',
      description: 'The AIIKS Governing Board is comprised of diversity of prominent representatives of both the private and public sectors...',
      href: '/aiiks-governing-board/'
    },
    {
      icon: Building,
      title: 'The Institute\'s Executive Management Council',
      description: 'The Institute\'s Executive Management Council (EMC) includes the heads of the AIIKS Nodes...',
      href: '/the-institutes-executive-management-council-emc/'
    },
    {
      icon: Microscope,
      title: 'The AIIKS Scientific Committee',
      description: 'The AIIKS Scientific Committee is responsible for the development and coordination of the Institute\'s scientific programmes...',
      href: '/the-aiiks-scientific-committee/'
    },
    {
      icon: BookOpen,
      title: 'The Secretariat of the Institute',
      description: 'The Secretariat of the Institute is based at the Hub, the DSI-NRF Centre of Excellence in Indigenous Knowledge Systems...',
      href: '/the-secretariat-of-the-institute/'
    },
    {
      icon: Calendar,
      title: 'IKS-based Continental and International Research and Science Engagement Events',
      description: 'The AIIKS, through its various Nodes, within and outside Africa, takes cognizance of the fact that in order for AIKS to contribute...',
      href: '/iks-based-continental-and-international-research-and-science-engagement-events'
    },
    {
      icon: GraduationCap,
      title: 'IKS Teaching programmes at AIIKS Nodes',
      description: 'The AIIKS is mitigating the lack of critical mass of IKS human capital through supporting and facilitating the establishment...',
      href: '/iks-teaching-programmes-at-aiiks-nodes/'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-earth">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="section-title">Our Services & Structure</h2>
          <p className="section-subtitle">
            Comprehensive organizational structure designed to advance African Indigenous Knowledge Systems
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className={`feature-card group animate-fade-in-up stagger-${(index % 4) + 1}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-glow transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};