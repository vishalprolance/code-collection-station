
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProjectDetail from '@/components/ProjectDetail';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';

// Sample projects data (would normally come from a database)
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'React Todo App',
    description: 'A simple todo application built with React and TypeScript',
    language: 'typescript',
    code: 'import React, { useState } from "react";\n\nconst TodoApp = () => {\n  const [todos, setTodos] = useState([]);\n  return <div>Todo App</div>;\n};\n\nexport default TodoApp;',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
    authorName: 'Jane Doe',
    stars: 42,
    views: 189
  },
  {
    id: '2',
    title: 'Python Web Scraper',
    description: 'A web scraper that extracts data from e-commerce websites',
    language: 'python',
    code: 'import requests\nfrom bs4 import BeautifulSoup\n\ndef scrape_website(url):\n    response = requests.get(url)\n    soup = BeautifulSoup(response.text, "html.parser")\n    return soup\n\nprint("Scraping complete!")',
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2023-02-25'),
    authorName: 'John Smith',
    stars: 28,
    views: 143
  },
  {
    id: '3',
    title: 'Node.js REST API',
    description: 'A RESTful API built with Node.js and Express',
    language: 'javascript',
    code: 'const express = require("express");\nconst app = express();\n\napp.get("/api/users", (req, res) => {\n  res.json([{ id: 1, name: "User 1" }]);\n});\n\napp.listen(3000, () => {\n  console.log("Server is running on port 3000");\n});',
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-03-15'),
    authorName: 'Alex Johnson',
    stars: 35,
    views: 210
  },
  {
    id: '4',
    title: 'Java Spring Boot API',
    description: 'A RESTful API built with Spring Boot',
    language: 'java',
    code: 'package com.example.demo;\n\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n\n@SpringBootApplication\npublic class DemoApplication {\n\n\tpublic static void main(String[] args) {\n\t\tSpringApplication.run(DemoApplication.class, args);\n\t}\n\n}',
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-04-10'),
    authorName: 'Emily Chen',
    stars: 19,
    views: 92
  },
  {
    id: '5',
    title: 'CSS Animation Library',
    description: 'A collection of CSS animations for web development',
    language: 'css',
    code: '@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.fade-in {\n  animation: fadeIn 0.5s ease-in-out;\n}\n\n@keyframes slideIn {\n  from { transform: translateX(-100%); }\n  to { transform: translateX(0); }\n}\n\n.slide-in {\n  animation: slideIn 0.5s ease-in-out;\n}',
    createdAt: new Date('2023-05-12'),
    updatedAt: new Date('2023-05-15'),
    authorName: 'Michael Brown',
    stars: 56,
    views: 315
  },
  {
    id: '6',
    title: 'Go Web Server',
    description: 'A simple web server built with Go',
    language: 'go',
    code: 'package main\n\nimport (\n\t"fmt"\n\t"net/http"\n)\n\nfunc handler(w http.ResponseWriter, r *http.Request) {\n\tfmt.Fprintf(w, "Hello, World!")\n}\n\nfunc main() {\n\thttp.HandleFunc("/", handler)\n\thttp.ListenAndServe(":8080", nil)\n}',
    createdAt: new Date('2023-06-08'),
    updatedAt: new Date('2023-06-10'),
    authorName: 'David Wilson',
    stars: 31,
    views: 178
  }
];

const ProjectView = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    // Find the project by ID
    const foundProject = sampleProjects.find(p => p.id === id);
    
    if (foundProject) {
      setProject(foundProject);
      
      // Find related projects (same language)
      const related = sampleProjects
        .filter(p => p.id !== id && p.language === foundProject.language)
        .slice(0, 3);
      
      setRelatedProjects(related);
    }
    
    // Scroll to top when project changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/projects">
              <Button className="button-primary">Browse Projects</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-4">
          <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </div>
        
        <ProjectDetail project={project} />
        
        {relatedProjects.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  delay={index}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProjectView;
