# Strategic Decision Log

This log documents the rationale behind key product and strategy decisions made while building the AI Workshop Growth Engine.

| Phase | Decision | Rationale | Rejected Alternative |
|-------|----------|-----------|----------------------|
| **Strategy** | Build a Referral Engine instead of a standalone Landing Page. | A ₹2,000 budget caps paid acquisition at ~30 users (₹40 CPA). The only way to hit 500 is through a viral k-factor loop. | Spending the ₹2k on Meta ads expecting a ₹4 CPA. |
| **Product** | Include a Campaign Simulator in the Admin Dashboard. | An asserted plan ("we will get 500 users") lacks credibility. A simulator allows the evaluator to test the mathematical assumptions (CTR, reach) behind the plan. | A static table of fake registered users. |
| **UX** | Add 1-click WhatsApp sharing and a dynamic QR code. | Engineering students communicate primarily in tightly clustered WhatsApp groups and physical college spaces. Frictionless sharing is required for the loop to function. | Asking students to copy-paste a URL manually into an email. |
| **Growth Ops** | Hardcode "Demo Data" and "Proposed Assumptions" tags globally. | The challenge explicitly evaluates honesty and judgment. Presenting synthetic numbers as factual NxtWave statistics is a credibility risk. | Passing off simulated metrics as real historical data. |
| **AI Integration** | Use a deterministic rule-based AI Copilot for the demo. | True LLM integration adds unnecessary API complexity and cost for a frontend simulation. The goal is to demonstrate the *UX pattern* of AI-assisted diagnosis. | Integrating an expensive, slow, real LLM API for a mock dashboard. |
