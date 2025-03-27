
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectForm } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

interface ProjectUploadModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (project: ProjectForm) => void;
}

const LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'csharp', 
  'ruby', 'go', 'rust', 'cpp', 'c', 'php', 'html', 'css', 
  'swift', 'kotlin'
];

const ProjectUploadModal: React.FC<ProjectUploadModalProps> = ({ open, onClose, onSubmit }) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState<ProjectForm>({
    title: '',
    description: '',
    code: '',
    language: '',
    authorName: ''
  });
  
  const [fileContent, setFileContent] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setForm((prev) => ({ ...prev, language: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        setFileContent(content);
        setForm((prev) => ({ ...prev, code: content }));
        
        // Try to auto-detect language from file extension
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (extension) {
          const extensionMap: Record<string, string> = {
            'js': 'javascript',
            'ts': 'typescript',
            'py': 'python',
            'java': 'java',
            'cs': 'csharp',
            'rb': 'ruby',
            'go': 'go',
            'rs': 'rust',
            'cpp': 'cpp',
            'c': 'c',
            'php': 'php',
            'html': 'html',
            'css': 'css',
            'swift': 'swift',
            'kt': 'kotlin'
          };
          
          if (extensionMap[extension] && LANGUAGES.includes(extensionMap[extension])) {
            setForm((prev) => ({ ...prev, language: extensionMap[extension] }));
          }
        }
        
        toast({
          title: "File uploaded",
          description: `Successfully uploaded ${file.name}`,
        });
      } catch (error) {
        console.error('Error reading file:', error);
        toast({
          title: "Error",
          description: "Failed to read file. Please try again.",
          variant: "destructive"
        });
      }
    };
    
    reader.readAsText(file);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title || !form.description || !form.code || !form.language || !form.authorName) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulating upload
    setTimeout(() => {
      onSubmit(form);
      setIsUploading(false);
      setForm({
        title: '',
        description: '',
        code: '',
        language: '',
        authorName: ''
      });
      setFileContent(null);
      onClose();
      
      toast({
        title: "Project uploaded",
        description: "Your project has been uploaded successfully!",
      });
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">Upload New Project</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="My Awesome Project"
              value={form.title}
              onChange={handleChange}
              className="input-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Briefly describe your project..."
              value={form.description}
              onChange={handleChange}
              className="h-24 rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="authorName">Your Name</Label>
            <Input
              id="authorName"
              name="authorName"
              placeholder="John Doe"
              value={form.authorName}
              onChange={handleChange}
              className="input-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="language">Programming Language</Label>
            <Select
              value={form.language}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="input-primary capitalize">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((language) => (
                  <SelectItem key={language} value={language} className="capitalize">
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="code">Upload Code File</Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl border-muted-foreground/20 cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  {fileContent ? (
                    <p className="text-sm text-muted-foreground">
                      File uploaded. <span className="text-primary">Change file</span>
                    </p>
                  ) : (
                    <>
                      <p className="mb-1 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Any code file (MAX. 10MB)
                      </p>
                    </>
                  )}
                </div>
                <input 
                  id="file-upload" 
                  type="file" 
                  accept=".js,.ts,.py,.java,.cs,.rb,.go,.rs,.cpp,.c,.php,.html,.css,.swift,.kt"
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="code">Or Paste Code Directly</Label>
            <Textarea
              id="code"
              name="code"
              placeholder="Paste your code here..."
              value={form.code}
              onChange={handleChange}
              className="h-48 font-mono text-sm rounded-xl"
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline"
              className="rounded-full" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="button-primary"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectUploadModal;
