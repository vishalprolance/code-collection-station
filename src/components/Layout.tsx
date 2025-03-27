
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { toast } = useToast();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-medium flex items-center gap-2"
          >
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white">
              CS
            </span>
            <span className="gradient-text font-semibold">CodeStation</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm transition-colors ${isActive('/') 
                ? 'text-primary font-medium' 
                : 'text-foreground/80 hover:text-foreground'}`}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className={`text-sm transition-colors ${isActive('/projects') 
                ? 'text-primary font-medium' 
                : 'text-foreground/80 hover:text-foreground'}`}
            >
              Projects
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden md:flex rounded-full"
              onClick={() => {
                toast({
                  title: "Coming soon!",
                  description: "Sign in functionality will be available soon.",
                });
              }}
            >
              Sign In
            </Button>
            <Button
              className="rounded-full"
              onClick={() => {
                toast({
                  title: "Coming soon!",
                  description: "Sign up functionality will be available soon.",
                });
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-secondary/50 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white">
                  CS
                </span>
                <span className="gradient-text font-semibold">CodeStation</span>
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">
                The best place to showcase your code projects.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              <div>
                <h3 className="font-medium mb-3">Platform</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Browse Projects
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Upload Project
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} CodeStation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
