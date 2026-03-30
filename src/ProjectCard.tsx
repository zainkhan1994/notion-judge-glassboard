import React from 'react';
import type { Submission } from './types.ts';

interface Props {
  project: Submission;
  category: any;
}

export const ProjectCard: React.FC<Props> = ({ project, category }) => {
  return (
    <a className="proj-card" href={project.url} target="_blank" rel="noopener noreferrer">
      <div className="proj-icon-row">
        <div className={`proj-icon ${category.grad}-icon`}>
          {category.svgSmall}
        </div>
        <span className="proj-badge">🔥 {project.reactions || 0} reactions</span>
      </div>
      
      <div className="proj-body">
        <div className="proj-title">{project.projectTitle}</div>
        <div className="proj-author">{project.author}</div>
        <div className="proj-desc">
          Evaluated via Agent: {project.status !== 'Pending' ? `Scores: ${project.originalityScore}, ${project.complexityScore}, ${project.practicalityScore}` : 'Awaiting Processing'} • Read Time: {project.readTime || '-'} min
        </div>
      </div>
      
      <div className="proj-footer">
        <span className="proj-reactions">💬 {project.comments || 0} comments</span>
        <span className="proj-link">View Project →</span>
      </div>
    </a>
  );
};
