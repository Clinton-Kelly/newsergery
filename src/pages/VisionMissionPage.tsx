import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import researchLab from '@/assets/research-lab.jpg';
import humanCapital from '@/assets/human-capital.jpg';
import { Eye, Target, Lightbulb } from 'lucide-react';

const VisionMissionPage = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollFadeIn();
  const { ref: visionRef, isVisible: visionVisible } = useScrollFadeIn();
  const { ref: missionRef, isVisible: missionVisible } = useScrollFadeIn();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-earth">
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold text-primary text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Vision, Mission & Objectives
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our strategic direction and commitment to advancing Indigenous Knowledge Systems
          </motion.p>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Vision Card */}
            <motion.div
              ref={visionRef}
              initial={{ opacity: 0, x: -30 }}
              animate={visionVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full feature-card">
                <CardHeader className="text-center">
                  <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-3xl text-primary">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To be a leading global center of excellence for Indigenous Knowledge Systems, 
                    fostering innovation, preservation, and application of traditional wisdom for 
                    sustainable development and cultural restoration across Africa and beyond.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              ref={missionRef}
              initial={{ opacity: 0, x: 30 }}
              animate={missionVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full feature-card">
                <CardHeader className="text-center">
                  <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-3xl text-primary">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To develop, preserve, protect, and promote Indigenous Knowledge Systems 
                    through research, education, policy advocacy, and community engagement, 
                    ensuring their continued relevance and impact in addressing contemporary challenges.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Strategic Areas with Images */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={visionVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img 
                src={researchLab} 
                alt="Research and Innovation" 
                className="w-full h-64 object-cover rounded-lg shadow-card"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={visionVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="feature-card">
                <CardHeader>
                  <Lightbulb className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-2xl text-primary">Research & Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Conducting cutting-edge research to document, analyze, and validate Indigenous 
                    Knowledge Systems while fostering innovation through the integration of traditional 
                    wisdom with modern scientific approaches.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              animate={missionVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="feature-card">
                <CardHeader>
                  <Target className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-2xl text-primary">Human Capital Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Building capacity and expertise in Indigenous Knowledge Systems through education, 
                    training, and mentorship programs that prepare the next generation of knowledge 
                    holders and researchers.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 30 }}
              animate={missionVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img 
                src={humanCapital} 
                alt="Human Capital Development" 
                className="w-full h-64 object-cover rounded-lg shadow-card"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VisionMissionPage;