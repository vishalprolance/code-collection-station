
export type Project = {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  authorName: string;
  stars: number;
  views: number;
};

export type ProjectForm = Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'stars' | 'views'>;
