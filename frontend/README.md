# NxtWave AI Workshop Growth Engine

A fully functional, simulated Growth Operating System built to demonstrate the acquisition of 500 students in 7 days on a ₹2,000 budget.

## 🚀 The Challenge & Strategy
**The Problem:** Acquiring 500 leads with ₹2,000 implies an impossible ₹4 CPA via standard paid marketing.
**The Strategy:** Treat the ₹2,000 strictly as "seed" capital. Build a gamified **Referral Engine** to leverage the highly networked nature of engineering students (WhatsApp groups, college clubs) to manufacture a viral K-factor loop.

## 💻 What Was Built
This repository contains a complete React + Vite application that serves as both the student acquisition channel and the operator's backend.

1. **The Student Experience:** A conversion-optimized landing page, frictionless registration, and a gamified referral dashboard featuring 1-click WhatsApp sharing and unique QR codes.
2. **The Admin Command Center:** A campaign tracking dashboard featuring:
   * Real-time Funnel Analysis
   * A/B Experiment Center
   * AI-Assisted Campaign Diagnosis
   * **The Campaign Simulator:** A mathematical modeling tool that proves exactly how 500 registrations will be achieved based on editable assumptions.

## 📁 Repository Structure
```text
frontend/
├── docs/                      # ALL SUBMISSION MATERIALS
│   ├── growth-plan.md         # 5-Slide presentation content
│   ├── ai-learning-notes.md   # AI judgment examples
│   ├── video-script.md        # 3-minute video script
│   ├── demo-script.md         # Click-by-click demo script
│   ├── decision-log.md        # Strategic rationale
│   └── assumptions.md         # Transparency document
├── src/                       
│   ├── components/            
│   ├── pages/                 
│   ├── store/                 # LocalStorage mock database
│   ├── App.tsx                
│   └── index.css              
└── README.md                  
```

## 🛠️ How to Run Locally
1. Ensure Node.js is installed.
2. Navigate to the project directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`
5. Open `http://localhost:5173` in your browser.

*Note: For the best evaluation experience, navigate to "Growth Admin" and click "Start Presentation Demo" to load the stable Day 4 simulation state.*

## 🧠 Evaluation Checklist Alignment
* **Ownership & Bias to Ship:** Instead of just writing a slide deck, a fully functional React application was built, typed, and deployed.
* **Problem Solving:** Recognized the mathematical impossibility of the budget constraint and engineered a product-led growth solution (the referral engine) to bypass it.
* **Learnability:** Implemented modern Tailwind v4, React Router v7, and a custom reactive state manager using LocalStorage.
* **Judgment:** Transparently labeled all synthetic metrics as "Demo Data" and clearly separated official constraints from proposed assumptions.

## ⚠️ Known Limitations
* Data is persisted via browser `localStorage`. It will reset if you switch browsers or clear cache.
* The WhatsApp share button utilizes the native web intent API; it opens WhatsApp but cannot track actual message sends (only clicks).
* The AI Copilot is a deterministic rule-based engine built for the simulation, rather than an expensive API call to an LLM.
