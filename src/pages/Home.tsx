import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Users, Languages, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const disciplines = [
  { name: 'Hadith', desc: 'Prophetic Traditions', icon: '📜' },
  { name: 'Fiqh', desc: 'Jurisprudence', icon: '⚖️' },
  { name: 'Seerah', desc: 'Prophetic Biography', icon: '🕌' },
  { name: 'Tawheed', desc: 'Monotheism', icon: '☝️' },
  { name: 'Lughah', desc: 'Vocabulary', icon: '🔤' },
  { name: 'Sarf', desc: 'Morphology', icon: '🧬' },
  { name: 'Nahw', desc: 'Grammar', icon: '🏗️' },
  { name: 'Anasheed', desc: 'Poetry/Hymns', icon: '🎵' },
  { name: 'Balaghah', desc: 'Rhetoric', icon: '🗣️' },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/7abda175-49d2-44a5-94df-dbe9df365651/hero-heritage-d0663916-1782381064456.webp"
            alt="Heritage Hero"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 italic leading-tight">
              As-Salf: Preserving Sacred Knowledge
            </h1>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              A community-driven hub bridging traditional Islamic education with modern contexts in Nigeria. 
              Connecting learners with native-tongue interpretations in Hausa, Yoruba, and Igbo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link to="/vault">Explore The Vault</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link to="/upload">Upload Material</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-md bg-white">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">9 Disciplines</h3>
              <p className="text-muted-foreground">Comprehensive coverage of the core Madrasah curriculum.</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-white">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="p-3 bg-secondary/20 rounded-full mb-4">
                <Languages className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Native Tongues</h3>
              <p className="text-muted-foreground">Explanations in Hausa, Yoruba, and Igbo for deeper understanding.</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-white">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="p-3 bg-accent/10 rounded-full mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Led</h3>
              <p className="text-muted-foreground">Verified volunteer tutors and scholars preserving our values.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary italic">The Curricular Vault</h2>
            <p className="text-muted-foreground">Browse materials across classic Islamic disciplines</p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/vault" className="flex items-center gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {disciplines.map((discipline, idx) => (
            <motion.div
              key={discipline.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <Link to={`/vault?category=${discipline.name}`}>
                <Card className="hover:shadow-lg transition-all border-primary/10 cursor-pointer overflow-hidden group">
                  <div className="h-2 bg-primary group-hover:bg-secondary transition-colors" />
                  <CardHeader className="text-center pb-2">
                    <span className="text-4xl mb-2">{discipline.icon}</span>
                    <CardTitle className="text-lg">{discipline.name}</CardTitle>
                    <CardDescription>{discipline.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
