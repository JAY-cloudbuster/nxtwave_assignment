# AI Learning Notes

This document highlights instances where human judgment superseded AI suggestions during the development of this project.

### Example 1: Strategic Direction (Landing Page vs Referral Engine)
**WHAT I ASKED AI:** "Design a marketing campaign to get 500 engineering students registered for a free AI workshop with a budget of ₹2,000."
**WHAT AI SUGGESTED:** The AI proposed running targeted Facebook and Instagram ads, writing blog posts for SEO, and offering standard certificates.
**WHAT I CHANGED:** I rejected the paid ads strategy for the bulk of the target. Mathematically, 500 leads for ₹2,000 requires a ₹4 CPA, which is impossible. I shifted the strategy entirely to a **Referral Engine**.
**WHY:** The ₹2k must be used strictly for "seed" acquisition, while the remaining 450+ registrations must come through organic product-led growth (WhatsApp loops).

### Example 2: Administrative Tooling (Static Dashboard vs Simulator)
**WHAT I ASKED AI:** "What should the admin dashboard for this campaign include?"
**WHAT AI SUGGESTED:** A standard CRUD (Create, Read, Update, Delete) table showing a list of registered students, their emails, and a static bar chart of signups over time.
**WHAT I CHANGED:** I built a dynamic **Campaign Simulator**.
**WHY:** In an ambiguous 7-day challenge, data is useless without the ability to model the future. I needed a tool that allowed me to edit mathematical assumptions (like CTR and Ambassador Reach) to dynamically prove that the target was achievable.

### Example 3: Landing Page Copy
**WHAT I ASKED AI:** "Write the headline for the workshop landing page."
**WHAT AI SUGGESTED:** "Join NxtWave to learn AI basics from industry experts in just 60 minutes."
**WHAT I CHANGED:** I rewrote the primary variant to: "Build an AI project you can actually show in your portfolio."
**WHY:** Final year students do not care about "learning basics"—they care about getting a job. A portfolio-ready outcome has a significantly higher emotional and practical resonance. (I subsequently modeled this as an A/B test in the Experiment Center).
