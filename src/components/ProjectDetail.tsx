
import React, { useState } from 'react';
import { Project } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  
  // Function to handle copying code to clipboard
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(project.code);
      setIsCopied(true);
      toast({
        title: "Code copied!",
        description: "The code has been copied to your clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy code to clipboard.",
        variant: "destructive"
      });
    }
  };
  
  const languageColors: Record<string, string> = {
    javascript: 'bg-yellow-500',
    typescript: 'bg-blue-500',
    python: 'bg-green-500',
    java: 'bg-red-500',
    csharp: 'bg-purple-500',
    ruby: 'bg-pink-500',
    go: 'bg-blue-400',
    rust: 'bg-orange-500',
    cpp: 'bg-blue-600',
    c: 'bg-gray-500',
    php: 'bg-indigo-500',
    html: 'bg-orange-600',
    css: 'bg-blue-700',
    swift: 'bg-orange-500',
    kotlin: 'bg-orange-600',
    default: 'bg-gray-400'
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className={`h-3 w-3 rounded-full ${languageColors[project.language] || languageColors.default}`}></div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{project.language}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
        
        <p className="text-muted-foreground mb-6">{project.description}</p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Author:</span>
            <span>{project.authorName}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Created:</span>
            <span>{project.createdAt.toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Views:</span>
            <span>{project.views}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Stars:</span>
            <span>{project.stars}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={handleCopyCode}
          >
            {isCopied ? 'Copied!' : 'Copy Code'}
          </Button>
          
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => {
              toast({
                title: "Coming soon!",
                description: "Download functionality will be available soon.",
              });
            }}
          >
            Download
          </Button>
          
          <Button
            className="rounded-full"
            onClick={() => {
              toast({
                title: "Starred!",
                description: "You've starred this project.",
              });
            }}
          >
            Star Project
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden rounded-xl">
        <div className="bg-secondary/80 px-4 py-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${languageColors[project.language] || languageColors.default}`}></div>
            <span className="text-sm font-medium capitalize">{project.language}</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
            onClick={handleCopyCode}
          >
            {isCopied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        
        <pre className="p-4 overflow-x-auto text-sm font-mono bg-secondary/30">
          <code>{project.code}</code>
        </pre>
      </Card>
    </div>
  );
};

export default ProjectDetail;
