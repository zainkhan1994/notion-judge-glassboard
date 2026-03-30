import React, { useEffect, useRef } from 'react';
import './Hero.css';

interface HeroProps {
  onEnter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 55;
    const particles: any[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.4 + 0.05,
        gold: Math.random() > 0.7,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.pulse += p.pulseSpeed;
        const a = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        if (p.gold) {
          ctx.fillStyle = `rgba(201,168,76,${a})`;
        } else {
          ctx.fillStyle = `rgba(180,180,180,${a * 0.4})`;
        }
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      animFrame = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const handleAction = (e: React.MouseEvent, isTrophy: boolean) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position:fixed;
      left:${rect.left + rect.width/2}px;
      top:${rect.top + rect.height/2}px;
      width:10px;height:10px;
      border-radius:50%;
      background:${isTrophy ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.15)'};
      transform:translate(-50%,-50%) scale(1);
      pointer-events:none;
      z-index:9998;
      animation:rippleOut 0.6s ease forwards;
    `;
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
      onEnter();
    }, 400); // 400ms delay to enjoy animation
  };

  return (
    <div className="hero-wrapper">
      <canvas id="particles" ref={canvasRef}></canvas>

      <section className="hero-section">

        <div className="top-label">Notion × DEV.to · 2026</div>

        <h1 className="headline">
          The MCP<br/><em>Challenge</em>
        </h1>

        <p className="subline">
          <span>118 projects</span> &nbsp;·&nbsp; <span>8 categories</span> &nbsp;·&nbsp; <span>one winner</span>
        </p>

        <div className="badge-row">

          {/* BOXES BADGE */}
          <div className="badge-wrap boxes" onClick={(e) => handleAction(e, false)}>
            <div className="badge-svg-wrap">
              <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="120" cy="120" r="115" stroke="#333" strokeWidth="1" strokeDasharray="4 3" className="outer-ring"/>
                <circle cx="120" cy="120" r="108" stroke="#222" strokeWidth="1.5"/>
                <circle cx="120" cy="120" r="105" fill="#0f0f0f"/>
                <circle cx="120" cy="120" r="105" fill="url(#halftone)" opacity="0.4"/>

                <ellipse cx="122" cy="178" rx="52" ry="8" fill="#000" opacity="0.6"/>
                <polygon points="75,178 165,178 158,185 82,185" fill="#111" opacity="0.5"/>

                <g className="box-main">
                  <rect x="74" y="138" width="90" height="40" rx="1" fill="#1e1e1e" stroke="#555" strokeWidth="1.2"/>
                  <rect x="74" y="138" width="90" height="40" rx="1" fill="url(#boxShade)"/>
                  <polygon points="164,138 180,128 180,168 164,178" fill="#2a2a2a" stroke="#555" strokeWidth="1"/>
                  <rect x="88" y="150" width="30" height="14" rx="1" fill="none" stroke="#555" strokeWidth="1"/>
                  <circle cx="144" cy="157" r="6" fill="none" stroke="#555" strokeWidth="1"/>
                </g>

                <g className="box-main" style={{ animationDelay: '0.3s' }}>
                  <rect x="88" y="108" width="64" height="32" rx="1" fill="#191919" stroke="#4a4a4a" strokeWidth="1.2"/>
                  <polygon points="152,108 166,100 166,132 152,140" fill="#242424" stroke="#4a4a4a" strokeWidth="1"/>
                  <rect x="100" y="118" width="24" height="10" rx="1" fill="none" stroke="#4a4a4a" strokeWidth="1"/>
                </g>

                <g className="lid-group">
                  <rect x="96" y="82" width="52" height="28" rx="1" fill="#141414" stroke="#3d3d3d" strokeWidth="1.2"/>
                  <polygon points="148,82 160,75 160,103 148,110" fill="#1e1e1e" stroke="#3d3d3d" strokeWidth="1"/>
                  <rect x="92" y="72" width="60" height="14" rx="1" fill="#222" stroke="#555" strokeWidth="1.2"/>
                  <polygon points="152,72 166,65 166,79 152,86" fill="#2d2d2d" stroke="#555" strokeWidth="1"/>
                </g>

                <g className="chip1"><rect x="113" y="52" width="8" height="8" rx="1" fill="none" stroke="#555" strokeWidth="1.2" transform="rotate(20,117,56)"/></g>
                <g className="chip2"><rect x="130" y="45" width="6" height="6" rx="0.5" fill="none" stroke="#444" strokeWidth="1" transform="rotate(-15,133,48)"/></g>
                <g className="chip3"><polygon points="123,38 128,44 118,44" fill="none" stroke="#444" strokeWidth="1"/></g>
                <g className="chip1" style={{ animationDelay: '1s' }}><rect x="142" y="55" width="5" height="5" rx="0.5" fill="none" stroke="#3d3d3d" strokeWidth="1" transform="rotate(35,144,57)"/></g>
                <g className="chip2" style={{ animationDelay: '1.4s' }}>
                  <line x1="105" y1="48" x2="111" y2="53" stroke="#3d3d3d" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="111" y1="48" x2="105" y2="53" stroke="#3d3d3d" strokeWidth="1.2" strokeLinecap="round"/>
                </g>

                <g transform="translate(68, 192)">
                  <rect width="104" height="26" rx="4" fill="#111" stroke="#2a2a2a" strokeWidth="1"/>
                  <rect x="8" y="5" width="16" height="16" rx="2" fill="white"/>
                  <text x="12" y="16.5" fontSize="10" fontWeight="700" fill="black" fontFamily="monospace">N</text>
                  <text x="30" y="12" fontSize="7" fill="#555" fontFamily="sans-serif">Made for</text>
                  <text x="30" y="21" fontSize="9" fill="#999" fontFamily="sans-serif" fontWeight="500">Notion</text>
                </g>

                <defs>
                  <radialGradient id="halftone" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.02"/>
                    <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
                  </radialGradient>
                  <linearGradient id="boxShade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.03"/>
                    <stop offset="100%" stopColor="#000" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="badge-label">
              <div className="badge-label-title">Project Gallery</div>
              <div className="badge-label-sub">118 submissions</div>
            </div>

            <button className="badge-cta">
              Browse All &nbsp;→
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '80px', opacity: 0.15 }}>
            <div style={{ width: '1px', height: '120px', background: 'linear-gradient(to bottom,transparent,#888,transparent)' }}></div>
          </div>

          {/* TROPHY BADGE */}
          <div className="badge-wrap trophy" onClick={(e) => handleAction(e, true)}>
            <div className="badge-svg-wrap">
              <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="120" cy="120" r="115" stroke="#3a2e0e" strokeWidth="1" strokeDasharray="4 3" className="outer-ring"/>
                <circle cx="120" cy="120" r="108" stroke="#c9a84c" strokeWidth="0.8" className="pulse-ring"/>
                <circle cx="120" cy="120" r="105" fill="#0a0800"/>

                <ellipse cx="120" cy="90" rx="50" ry="80" fill="url(#spotGrad)" className="spotlight" opacity="0.2"/>

                <ellipse cx="120" cy="182" rx="38" ry="6" fill="#000" opacity="0.7"/>
                <polygon points="90,182 150,182 145,188 95,188" fill="#0a0800" opacity="0.6"/>

                <g className="trophy-body">
                  <rect x="92" y="170" width="56" height="10" rx="2" fill="#1a1400" stroke="#8a6f28" strokeWidth="1.2"/>
                  <rect x="98" y="165" width="44" height="8" rx="1" fill="#111000" stroke="#7a6020" strokeWidth="1"/>

                  <rect x="113" y="145" width="14" height="22" rx="1" fill="#1a1400" stroke="#8a6f28" strokeWidth="1.2"/>
                  <line x1="110" y1="165" x2="130" y2="165" stroke="#8a6f28" strokeWidth="1.2"/>

                  <path d="M88 95 L96 145 L144 145 L152 95 Z" fill="#141000" stroke="#c9a84c" strokeWidth="1.4"/>
                  <path d="M96 100 L98 140 L104 140 L103 100 Z" fill="url(#cupShine)" opacity="0.15"/>

                  <path d="M88 105 C78 105 72 112 72 120 C72 128 78 135 88 135" stroke="#c9a84c" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                  <path d="M152 105 C162 105 168 112 168 120 C168 128 162 135 152 135" stroke="#c9a84c" strokeWidth="1.4" fill="none" strokeLinecap="round"/>

                  <path d="M88 112 C82 112 78 116 78 120 C78 124 82 128 88 128" stroke="#8a6f28" strokeWidth="1" fill="none" strokeLinecap="round"/>
                  <path d="M152 112 C158 112 162 116 162 120 C162 124 158 128 152 128" stroke="#8a6f28" strokeWidth="1" fill="none" strokeLinecap="round"/>

                  <line x1="88" y1="95" x2="152" y2="95" stroke="#c9a84c" strokeWidth="1.5"/>
                  <line x1="92" y1="115" x2="148" y2="115" stroke="#8a6f28" strokeWidth="0.8" opacity="0.6"/>

                  <path d="M115 118 L117 113 L119 118 L124 118 L120 121 L122 126 L117 123 L112 126 L114 121 L110 118 Z" fill="none" stroke="#8a6f28" strokeWidth="0.8" opacity="0.5"/>
                </g>

                <g className="frag1"><rect x="106" y="58" width="7" height="7" rx="1" fill="none" stroke="#c9a84c" strokeWidth="1.2" transform="rotate(25,109,61)"/></g>
                <g className="frag2"><polygon points="132,52 137,60 127,60" fill="none" stroke="#a8893e" strokeWidth="1.1"/></g>
                <g className="frag3">
                  <line x1="95" y1="60" x2="103" y2="66" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round"/>
                  <line x1="103" y1="60" x2="95" y2="66" stroke="#c9a84c" strokeWidth="1.3" strokeLinecap="round"/>
                </g>
                <g className="frag4"><rect x="144" y="72" width="6" height="6" rx="0.5" fill="none" stroke="#a8893e" strokeWidth="1" transform="rotate(-20,147,75)"/></g>
                <g className="frag5"><circle cx="88" cy="78" r="3" fill="none" stroke="#8a6f28" strokeWidth="1"/></g>
                <g className="frag1" style={{ animationDelay: '2s' }}><polygon points="150,62 153,68 147,68" fill="none" stroke="#c9a84c" strokeWidth="1"/></g>

                <g transform="translate(68, 192)">
                  <rect width="104" height="26" rx="4" fill="#0d0a00" stroke="#2a2000" strokeWidth="1"/>
                  <rect x="8" y="5" width="16" height="16" rx="2" fill="white"/>
                  <text x="12" y="16.5" fontSize="10" fontWeight="700" fill="black" fontFamily="monospace">N</text>
                  <text x="30" y="12" fontSize="7" fill="#5a4a00" fontFamily="sans-serif">Made for</text>
                  <text x="30" y="21" fontSize="9" fill="#c9a84c" fontFamily="sans-serif" fontWeight="500">Notion</text>
                </g>

                <defs>
                  <radialGradient id="spotGrad" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#c9a84c" stopOpacity="0"/>
                  </radialGradient>
                  <linearGradient id="cupShine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0"/>
                    <stop offset="50%" stopColor="#fff" stopOpacity="1"/>
                    <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="badge-label">
              <div className="badge-label-title" style={{ color: '#c9a84c' }}>Top Submissions</div>
              <div className="badge-label-sub">high engagement picks</div>
            </div>

            <button className="badge-cta">
              View Winners &nbsp;→
            </button>
          </div>

        </div>

        <div className="stat-row">
          <div className="stat-item">
            <div className="stat-num">125</div>
            <div className="stat-label">Total Posts</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-num">118</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-num">8</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-num">$1.5k</div>
            <div className="stat-label">In Prizes</div>
          </div>
        </div>

        <div className="scroll-hint">
          <span>scroll</span>
          <div className="scroll-line"></div>
        </div>

      </section>

      <footer className="footer-bar">
        <div className="footer-left">© 2026 Notion MCP Challenge · DEV Community</div>
        <div className="footer-right">Judging Dashboard v1.0</div>
      </footer>

    </div>
  );
};
