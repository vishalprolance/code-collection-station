
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className, delay = 0 }) => {
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
    <Link to={`/project/${project.id}`}>
      <Card 
        className={cn(
          "overflow-hidden card-hover h-full", 
          className,
          "animate-slide-in"
        )}
        style={{ animationDelay: `${delay * 0.1}s` }}
      >
        {project.thumbnail ? (
          <div className="h-48 overflow-hidden bg-secondary">
            <img 
              src={project.thumbnail} 
              alt={project.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            />
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center bg-secondary/50">
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <span className="text-3xl gradient-text font-medium mb-2">
                {project.title.substring(0, 2).toUpperCase()}
              </span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {project.language}
              </span>
            </div>
          </div>
        )}
        
        <CardContent className="pt-6">
          <div className="flex items-center mb-3">
            <div className={cn("h-3 w-3 rounded-full mr-2", languageColors[project.language] || languageColors.default)}></div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{project.language}</span>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{project.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {project.description}
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4">
          <div className="flex items-center">
            <span>By {project.authorName}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {project.views}
            </span>
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {project.stars}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
