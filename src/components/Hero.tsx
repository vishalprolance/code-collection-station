
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface HeroProps {
  onOpenUpload: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenUpload }) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block animate-fade-in px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            Introducing CodeStation
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-in">
            Showcase Your <span className="gradient-text">Code Projects</span> in One Place
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-slide-in [animation-delay:200ms]">
            Upload your source code and share your projects with the world. 
            A beautiful platform to collect and showcase all your programming ideas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in [animation-delay:400ms]">
            <Button 
              className="button-primary text-base"
              onClick={onOpenUpload}
            >
              Upload Project
            </Button>
            <Link to="/projects">
              <Button variant="outline" className="rounded-full text-base">
                Browse Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats banner */}
      <div className="w-full py-10 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center animate-slide-in">
              <p className="text-3xl font-bold gradient-text mb-1">100+</p>
              <p className="text-sm text-muted-foreground">Projects Shared</p>
            </div>
            <div className="text-center animate-slide-in [animation-delay:100ms]">
              <p className="text-3xl font-bold gradient-text mb-1">5k+</p>
              <p className="text-sm text-muted-foreground">Users</p>
            </div>
            <div className="text-center animate-slide-in [animation-delay:200ms]">
              <p className="text-3xl font-bold gradient-text mb-1">10k+</p>
              <p className="text-sm text-muted-foreground">Code Views</p>
            </div>
            <div className="text-center animate-slide-in [animation-delay:300ms]">
              <p className="text-3xl font-bold gradient-text mb-1">15+</p>
              <p className="text-sm text-muted-foreground">Languages</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
