import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useScrollFadeIn } from '@/hooks/useScrollFadeIn';
import { motion } from 'framer-motion';
import Map from '@/components/Map';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, MapPin, Users } from 'lucide-react';

const GeographicalCoverage = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollFadeIn();
  const { ref: mapRef, isVisible: mapVisible } = useScrollFadeIn();
  const { ref: regionsRef, isVisible: regionsVisible } = useScrollFadeIn();

  const regions = [
    {
      title: "Southern Africa",
      countries: ["South Africa", "Botswana", "Namibia", "Zimbabwe", "Zambia", "Lesotho", "Eswatini"],
      description: "Primary focus region with extensive research and community partnerships"
    },
    {
      title: "East Africa",
      countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Ethiopia", "Burundi"],
      description: "Growing network of collaborations and knowledge exchange programs"
    },
    {
      title: "West Africa",
      countries: ["Nigeria", "Ghana", "Senegal", "Mali", "Burkina Faso", "Benin"],
      description: "Strategic partnerships for cross-regional knowledge documentation"
    },
    {
      title: "Central Africa",
      countries: ["Cameroon", "Democratic Republic of Congo", "Central African Republic"],
      description: "Emerging collaborations in forest-based traditional knowledge systems"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-primary">
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold text-white text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Geographical Coverage
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={titleVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AIIKS operations span across the African continent and beyond
          </motion.p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            ref={mapRef}
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={mapVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title mb-8">AIIKS Location</h2>
            <Map />
          </motion.div>

          {/* Regional Coverage */}
          <motion.div
            ref={regionsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={regionsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title mb-12">Regional Coverage</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {regions.map((region, index) => (
                <motion.div
                  key={region.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={regionsVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="feature-card h-full">
                    <CardHeader className="text-center">
                      <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                      <CardTitle className="text-xl text-primary">{region.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{region.description}</p>
                      <div className="space-y-1">
                        {region.countries.map((country) => (
                          <div key={country} className="text-xs text-muted-foreground flex items-center">
                            <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                            {country}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Global Partnerships */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={regionsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="feature-card">
              <CardHeader className="text-center">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl text-primary">Global Partnerships</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  AIIKS collaborates with international institutions, universities, and organizations 
                  across continents to promote Indigenous Knowledge Systems globally.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold text-primary">UNESCO Network</h4>
                    <p className="text-sm text-muted-foreground">Category II Centre under UNESCO auspices</p>
                  </div>
                  <div className="text-center">
                    <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold text-primary">International Universities</h4>
                    <p className="text-sm text-muted-foreground">Research collaborations worldwide</p>
                  </div>
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold text-primary">Indigenous Communities</h4>
                    <p className="text-sm text-muted-foreground">Direct partnerships globally</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GeographicalCoverage;