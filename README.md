# Serviq - AI-Native Local Service Discovery

<div align="center">
  <img src="public/logo.png" alt="Serviq Logo" width="120" />
</div>

<p align="center">
  <strong>The first bilingual service matching engine that extracts intent from conversational English, Urdu, or Romanized Urdu voice prompts, connecting you with local technicians.</strong>
</p>

## 🌟 Overview

**Serviq** is an AI-powered service orchestrator that automates localized client-technician matching. By replacing traditional search filters with a unified natural language layer, Serviq enables intelligent, automated regional dispatch using bilingual NLP intent extraction and geofenced Haversine scoring filters.

This project was developed for the **AI Seekho 2026 Hackathon (Round 1)**.

## ✨ Key Features

- **🗣️ Bilingual Intent Parsing**: Categorizes conversational scripts (Urdu, English, Romanized Urdu) instantly into system-valid tags using Google Gemini 3 Flash.
- **📍 Geolocator & GPS Matching**: Maps local professionals within a 10km radius using Haversine distance sorting.
- **💰 Dynamic Travel Surcharges**: Implements dynamic pricing and travel decay based on exact coordinates and distance.
- **🔄 Agentic Pipeline**: Orchestrates workflows asynchronously via n8n webhook workflows and five Gemini 3 Flash agents.
- **📱 Real-time Dynamic Stepper**: Tracks status progression and syncs physical check-in statuses directly into database logs.
- **⚡ High-Fidelity UI/UX**: Built for maximum perceived performance, utilizing Framer Motion, Lenis smooth scrolling, and Shadcn UI.

## 🛠️ Technology Stack

- **Frontend Framework**: [Next.js 16](https://nextjs.org/) & [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Lenis](https://lenis.studiofreight.com/) (Smooth Scrolling)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) & [Lucide React](https://lucide.dev/) (Icons)
- **Database**: [Supabase](https://supabase.com/) (Relational Logs)
- **AI / NLP**: [Google Gemini 3 Flash](https://deepmind.google/technologies/gemini/flash/)
- **Orchestration**: [n8n](https://n8n.io/) API Router

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v20 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahad324/Serviq.git
   cd Serviq
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the necessary API keys and database endpoints (Supabase, Gemini API, n8n webhook URLs).

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Builds and Releases

- **Web Client**: [Live Demo](https://ahad324.github.io/Serviq/)
- **Android APK**: Download the latest release from the [GitHub Releases page](https://github.com/ahad324/Serviq/releases).

## 👥 Engineering Creators

- **AbdulAhad** - Lead Mobile Architect ([@ahad324](https://github.com/ahad324))
- **Moeez Nadeem** - Lead AI/Systems Engineer ([@moeez5251](https://github.com/moeez5251))

## 📄 License

This project is copyrighted &copy; 2026 Serviq. Developed for the Google GDG Live Pakistan presents AI Seekho 2026 Kick-off Event.
