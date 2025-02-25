type Task = {
    id: number;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    dueDate?: string;
    completed: boolean;
  }