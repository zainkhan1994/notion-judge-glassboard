import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { DashboardData, Submission } from './types';
import { ProjectCard } from './ProjectCard';
import { Hero } from './Hero';

const CATEGORIES = [
  { 
    id: 'eng', grad: 'grad-1', color: '#4b3f8a', name: 'Software Dev & DevOps',
    svgBig: (
      <svg className="cat-card-icon" viewBox="0 0 44 44" fill="none" stroke="#4b3f8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="10" width="32" height="24" rx="3"/>
        <polyline points="14,18 10,22 14,26"/>
        <polyline points="30,18 34,22 30,26"/>
        <line x1="19" y1="28" x2="25" y2="16"/>
      </svg>
    ),
    svgSmall: (
      <svg className="cat-label-icon" viewBox="0 0 14 14" fill="none" stroke="#4b3f8a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3,5 1,7 3,9"/><polyline points="11,5 13,7 11,9"/><line x1="5" y1="11" x2="9" y2="3"/>
      </svg>
    )
  },
  {
    id: 'biz', grad: 'grad-2', color: '#1d4ed8', name: 'Business & Startup',
    svgBig: (
      <svg className="cat-card-icon" viewBox="0 0 44 44" fill="none" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="20" width="8" height="14" rx="1"/>
        <rect x="18" y="14" width="8" height="20" rx="1"/>
        <rect x="28" y="8" width="8" height="26" rx="1"/>
        <line x1="6" y1="36" x2="38" y2="36"/>
      </svg>
    ),
    svgSmall: (
      <svg className="cat-label-icon" viewBox="0 0 14 14" fill="none" stroke="#1d4ed8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="6" width="3" height="7" rx="0.5"/><rect x="5.5" y="4" width="3" height="9" rx="0.5"/><rect x="10" y="2" width="3" height="11" rx="0.5"/>
      </svg>
    )
  },
  {
    id: 'prod', grad: 'grad-3', color: '#9d174d', name: 'Productivity & Personal OS',
    svgBig: (
      <svg className="cat-card-icon" viewBox="0 0 44 44" fill="none" stroke="#9d174d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="22" cy="22" r="13"/>
        <polyline points="22,13 22,22 29,22"/>
        <circle cx="22" cy="22" r="2" fill="#9d174d"/>
      </svg>
    ),
    svgSmall: (
      <svg className="cat-label-icon" viewBox="0 0 14 14" fill="none" stroke="#9d174d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="7" r="5.5"/><polyline points="7,4 7,7 9.5,7"/>
      </svg>
    )
  },
  {
    id: 'content', grad: 'grad-4', color: '#065f46', name: 'Content & Media',
    svgBig: (
      <svg className="cat-card-icon" viewBox="0 0 44 44" fill="none" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="20" height="26" rx="2"/>
        <line x1="13" y1="15" x2="23" y2="15"/>
        <line x1="13" y1="20" x2="23" y2="20"/>
        <line x1="13" y1="25" x2="19" y2="25"/>
        <path d="M28 22 L36 18 L36 34 L28 30 Z"/>
      </svg>
    ),
    svgSmall: (
      <svg className="cat-label-icon" viewBox="0 0 14 14" fill="none" stroke="#065f46" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="2" width="9" height="10" rx="1"/><line x1="4" y1="5" x2="7" y2="5"/><line x1="4" y1="7" x2="7" y2="7"/><polygon points="11,5 13,4 13,10 11,9"/>
      </svg>
    )
  },
  {
    id: 'hr', grad: 'grad-5', color: '#991b1b', name: 'HR & Career Tools',
    svgBig: (
      <svg className="cat-card-icon" viewBox="0 0 44 44" fill="none" stroke="#991b1b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="22" cy="16" r="6"/>
        <path d="M10 36 C10 28 34 28 34 36"/>
        <circle cx="32" cy="14" r="4"/>
        <path d="M36 30 C36 25 44 25 44 30" strokeOpacity="0.4"/>
      </svg>
    ),
    svgSmall: (
      <svg className="cat-label-icon" viewBox="0 0 14 14" fill="none" stroke="#991b1b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="5" r="3"/><path d="M1,13 C1,9.5 11,9.5 11,13"/><circle cx="11" cy="4" r="2"/><path d="M13,11 C13,8.5 9,8.5 9,11" strokeOpacity="0.5"/>
      </svg>
    )
  },
  {
    id: 'edu', grad: 'grad-6', color: '#0e7490', name: 'Education & Academic',
    svgBig: (
      <svg className="cat-card-icon" viewBox="0 0 44 44" fill="none" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22,8 38,16 22,24 6,16"/>
        <path d="M10 18 L10 30 C10 30 15 36 22 36 C29 36 34 30 34 30 L34 18"/>
        <line x1="38" y1="16" x2="38" y2="28"/>
        <circle cx="38" cy="29" r="2" fill="#0e7490"/>
      </svg>
    ),
    svgSmall: (
      <svg className="cat-label-icon" viewBox="0 0 14 14" fill="none" stroke="#0e7490" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="7,2 13,5 7,8 1,5"/><path d="M3,6 L3,10 C3,10 4.5,12 7,12 C9.5,12 11,10 11,10 L11,6"/>
      </svg>
    )
  },
  {
    id: 'sec', grad: 'grad-7', color: '#92400e', name: 'Security & Risk',
    svgBig: (
      <svg className="cat-card-icon" viewBox="0 0 44 44" fill="none" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 8 L36 13 L36 24 C36 31 29 37 22 39 C15 37 8 31 8 24 L8 13 Z"/>
        <polyline points="16,22 20,26 28,18"/>
      </svg>
    ),
    svgSmall: (
      <svg className="cat-label-icon" viewBox="0 0 14 14" fill="none" stroke="#92400e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7,1 L13,3.5 L13,8 C13,11 10,13 7,13.5 C4,13 1,11 1,8 L1,3.5 Z"/><polyline points="4.5,7 6,8.5 9.5,5"/>
      </svg>
    )
  },
  {
    id: 'ai', grad: 'grad-8', color: '#5b21b6', name: 'Specialized AI Agents',
    svgBig: (
      <svg className="cat-card-icon" viewBox="0 0 44 44" fill="none" stroke="#5b21b6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="14" width="20" height="18" rx="3"/>
        <line x1="17" y1="10" x2="17" y2="14"/>
        <line x1="27" y1="10" x2="27" y2="14"/>
        <circle cx="18" cy="21" r="1.5" fill="#5b21b6"/>
        <circle cx="26" cy="21" r="1.5" fill="#5b21b6"/>
        <path d="M17 27 Q22 31 27 27"/>
        <line x1="6" y1="20" x2="12" y2="20"/>
        <line x1="32" y1="20" x2="38" y2="20"/>
        <line x1="6" y1="25" x2="12" y2="25"/>
        <line x1="32" y1="25" x2="38" y2="25"/>
      </svg>
    ),
    svgSmall: (
      <svg className="cat-label-icon" viewBox="0 0 14 14" fill="none" stroke="#5b21b6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="8" height="7" rx="1.5"/><line x1="1" y1="6.5" x2="3" y2="6.5"/><line x1="11" y1="6.5" x2="13" y2="6.5"/><line x1="1" y1="8.5" x2="3" y2="8.5"/><line x1="11" y1="8.5" x2="13" y2="8.5"/><circle cx="5.5" cy="7.5" r="0.8" fill="#5b21b6"/><circle cx="8.5" cy="7.5" r="0.8" fill="#5b21b6"/>
      </svg>
    )
  }
];

function App() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [activeCat, setActiveCat] = useState<typeof CATEGORIES[0] | null>(null);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'INTRO'|'MAIN'>('INTRO');

  const fetchData = async () => {
    try {
      const response = await axios.get<DashboardData>('/data.json');
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div style={{padding: '40px'}}>Loading submissions...</div>;

  // We group projects deterministically into these 8 categories
  const buckets: Submission[][] = CATEGORIES.map(() => []);
  const sorted = [...data.submissions].sort((a, b) => (b.reactions || 0) - (a.reactions || 0));
  sorted.forEach((sub, i) => {
    buckets[i % CATEGORIES.length].push(sub);
  });

  const handleBack = () => {
    setActiveCat(null);
    setSearch('');
  };

  if (view === 'INTRO') {
    return <Hero onEnter={() => setView('MAIN')} />;
  }

  if (activeCat) {
    const catIndex = CATEGORIES.findIndex(c => c.id === activeCat.id);
    const catSubs = buckets[catIndex];
    const filtered = catSubs.filter(s => 
      !search || 
      s.projectTitle.toLowerCase().includes(search.toLowerCase()) || 
      s.author.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <>
        <button className="back-btn" onClick={handleBack}>
          ← Back to Gallery
        </button>
        <div className="page-header" style={{ marginBottom: '24px' }}>
          <div className="page-eyebrow">Category</div>
          <div className="page-title">{activeCat.name}</div>
          <div className="page-sub">{catSubs.length} project submissions</div>
        </div>

        <div className="search-bar" style={{ marginBottom: '24px' }}>
          <div className="search-inner" style={{ margin: 0 }}>
            <span className="search-icon">⌕</span>
            <input 
              type="text" 
              placeholder={`Search in ${activeCat.name}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="divider" style={{ margin: '0 0 24px 0' }}></div>

        <div className="project-grid">
          {filtered.map(s => (
            <ProjectCard key={s.id} project={s} category={activeCat} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{color: '#999', marginTop: '20px'}}>No projects match "{search}" in this category.</div>
        )}
      </>
    );
  }

  // Gallery View
  return (
    <>
      <div className="page-header">
        <div className="page-eyebrow">Notion MCP Challenge 2026</div>
        <div className="page-title">Project Gallery</div>
        <div className="page-sub">{data.submissions.length} submissions across 8 categories</div>
      </div>
      <div className="divider"></div>
      
      <div className="gallery-grid">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="cat-card" onClick={() => setActiveCat(cat)}>
            <div className={`cat-card-top ${cat.grad}`}>
              {cat.svgBig}
            </div>
            <div className="cat-card-bottom">
              {cat.svgSmall}
              <span className="cat-label">{cat.name}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
