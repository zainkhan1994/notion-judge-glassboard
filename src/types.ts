export interface Submission {
  id: string;
  author: string;
  projectTitle: string;
  url: string;
  readTime: number | null;
  reactions: number | null;
  comments: number | null;
  status: 'Pending' | 'Evaluated' | 'Top 3';
  originalityScore: number | null;
  complexityScore: number | null;
  practicalityScore: number | null;
  securityHumanInLoop: boolean;
}

export interface DashboardData {
  submissions: Submission[];
  lastUpdated: string;
}
