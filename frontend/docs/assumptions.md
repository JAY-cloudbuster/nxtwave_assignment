# Assumptions & Simulation Transparency

The AI Workshop Growth Engine utilizes simulated data to demonstrate operational competence. This document clarifies the boundaries between official constraints, proposed strategic assumptions, and synthetic demo data.

### 1. Official Challenge Inputs (Facts)
These are immutable constraints provided by NxtWave:
* **Target:** 500 registrations
* **Budget:** ₹2,000
* **Campaign Duration:** 7 days

### 2. Proposed Strategic Assumptions
These are mathematical variables I have hypothesized to build the 500-registration model. They are editable in the Campaign Simulator:
* **Seed CPA (Cost Per Acquisition):** ₹40
* **Active Ambassadors:** 25
* **Average Reach per Ambassador:** 150 students
* **Ambassador Link CTR (Click-Through Rate):** 15%
* **Landing Page Conversion Rate:** 10%
* **Target Communities:** 10 college WhatsApp groups
* **Community Size:** 200 members per group
* **Overlap / Duplication Factor:** 15% (Accounts for students seeing the link from multiple sources)

### 3. Demo Data (Synthetic)
To make the dashboard functional for evaluation, the following data is entirely synthetic. It is explicitly labeled as "Demo Data" in the UI:
* **Current Registrations:** The live counter (e.g., 317) is generated via the "Start Presentation Demo" button.
* **A/B Test Results:** The 8.4% vs 11.2% conversion rates shown in the Experiment Center are fabricated to demonstrate the UX of concluding an experiment.
* **Funnel Drop-offs:** The 3,400 pageviews and 85 link shares shown in the Funnel Analysis tab are hardcoded simulation states.
* **AI Copilot Diagnosis:** The recommendations are deterministic and rule-based based on the current simulation state, not generated via an external LLM API.
