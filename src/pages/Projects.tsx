
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const LANGUAGES = ['All', 'javascript', 'typescript', 'python', 'java', 'csharp', 'ruby', 'go', 'rust', 'cpp', 'c', 'php', 'html', 'css', 'swift', 'kotlin'];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'stars', label: 'Most Stars' },
  { value: 'views', label: 'Most Views' }
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [sortOption, setSortOption] = useState('latest');
  
  // Filter projects by search term and language
  const filteredProjects = sampleProjects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLanguage = selectedLanguage === 'All' || project.language === selectedLanguage;
    
    return matchesSearch && matchesLanguage;
  });
  
  // Sort projects based on selected option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortOption) {
      case 'latest':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'oldest':
        return a.createdAt.getTime() - b.createdAt.getTime();
      case 'stars':
        return b.stars - a.stars;
      case 'views':
        return b.views - a.views;
      default:
        return 0;
    }
  });
  
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Projects</h1>
            <p className="text-muted-foreground">
              Discover and explore amazing code projects from developers around the world.
            </p>
          </div>
          
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2">
              <Input
                placeholder="Search projects by title, description, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-primary h-11"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger className="input-primary h-11 capitalize">
                  <SelectValue placeholder="Filter by language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((language) => (
                    <SelectItem key={language} value={language} className="capitalize">
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={sortOption}
                onValueChange={setSortOption}
              >
                <SelectTrigger className="input-primary h-11">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {sortedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  delay={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No matching projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
