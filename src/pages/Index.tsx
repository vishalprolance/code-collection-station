
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import ProjectUploadModal from '@/components/ProjectUploadModal';
import { ProjectForm, Project } from '@/lib/types';
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
  }
];

const Index = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>(sampleProjects);
  
  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };
  
  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };
  
  const handleProjectSubmit = (projectForm: ProjectForm) => {
    const newProject: Project = {
      ...projectForm,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
      stars: 0,
      views: 0
    };
    
    setFeaturedProjects((prev) => [newProject, ...prev]);
  };
  
  return (
    <Layout>
      <Hero onOpenUpload={handleOpenUploadModal} />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={handleOpenUploadModal}
            >
              Upload Your Project
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Showcase Your Code?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join our community of developers and share your projects with the world.
            </p>
            <Button
              className="button-primary"
              onClick={handleOpenUploadModal}
            >
              Upload Project Now
            </Button>
          </div>
        </div>
      </section>
      
      <ProjectUploadModal
        open={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        onSubmit={handleProjectSubmit}
      />
    </Layout>
  );
};

export default Index;
