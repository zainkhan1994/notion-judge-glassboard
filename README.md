# 🏛️ Notion Judge's Glassboard

*This is a submission for the [Notion MCP Challenge](https://dev.to/challenges/notion-2026-03-04).*

---

## 🚀 What I Built

I built the **Notion Judge's Glassboard** — a premium, cinematic "Evaluation OS" explicitly designed to streamline and elevate the judging experience for the Notion MCP Challenge.

With over 180+ incredible submissions, evaluating every entry across multiple criteria (Originality, Complexity, Practicality) can become overwhelming. The Glassboard ingests live submission data (via DEV.to API & Notion MCP) and transforms it into a highly aesthetic, two-stage React SPA:

1. **The Cinematic Hero:** A sleek, fully animated dark-mode landing page complete with floating ambient particles and interactive SVG badges that instantly make the project feel premium.
2. **The Pastel Gallery:** A smooth, glassmorphism-inspired category dashboard that sorts submissions dynamically, surfacing read times, reaction counts, and direct links natively mapped to the actual DEV.to articles.

This isn't just a basic tracker; it's a bespoke evaluation hub built to make the final judging process as impressive as the projects being evaluated.

---

## 🎥 Video Demo

*(Insert your video link here showing the transition from the Hero page to the Dashboard and clicking on a card)*

---

## 💻 Show us the code

The entire React/Vite front-end and Python data-ingestion pipeline is available here:
*(Insert your GitHub repo link after pushing!)*

---

## 🧠 How I Used Notion MCP

The true magic behind the Glassboard is its autonomous backend. Rather than hardcoding the 180+ projects or connecting directly to a rate-limited front-end API, I used the **Notion MCP (Model Context Protocol)** to turn my actual Notion Workspace into a headless CMS and evaluation engine:

- **The Living Database:** Our central source of truth is [The Notion AI Challenge Database](https://www.notion.so/The-Notion-AI-Challenge-168be06607eb46e7a5518a6a1b686fc6?source=copy_link), which holds every DEV.to submission, reaction stat, and read-time metric.
- **Hourly Autonomous Generation:** Every single hour, our AI agent spins up via the local Notion MCP to read the latest rows from that master Notion database. It dynamically queries for any new entries or updated stats, then instantly builds and pushes those individual glassmorphism React cards directly into the Glassboard UI.
- **Two-Way Evaluation Sync:** When a judge reviews a project and marks it with an implementation score (Originality, Practicality, Complexity), that data safely hits a `securityHumanInLoop: true` verification flag and writes safely back into the exact same Notion Database via MCP—enabling full remote collaboration for multiple judges without ever showing them a boring spreadsheet.

---


<img width="771" height="854" alt="image" src="https://github.com/user-attachments/assets/efe9ca3d-679f-4cdb-be9b-7d49faf6d0cf" />



![Pastel Gallery Dashboard](./image.png)


<img width="936" height="567" alt="image" src="https://github.com/user-attachments/assets/8ca950d3-78fe-4403-8547-0fe8d9c1063f" />


---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Animations | Framer Motion |
| Icons | Lucide React |
| HTTP Client | Axios |
| Data Source | DEV.to API + Notion MCP |
| Styling | CSS (glassmorphism, dark-mode) |

---

## 📦 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

The app will be available at `http://localhost:5173` by default.

---

## 🗂️ Project Structure

```
src/
├── assets/          # Static assets and screenshots
├── App.tsx          # Root application component & routing logic
├── App.css          # Global app styles
├── Hero.tsx         # Cinematic hero landing page
├── Hero.css         # Hero page styles
├── ProjectCard.tsx  # Submission card component for the gallery
├── types.ts         # Shared TypeScript type definitions
├── index.css        # Base CSS reset and variables
└── main.tsx         # Application entry point
```

---

## 📄 License

MIT
