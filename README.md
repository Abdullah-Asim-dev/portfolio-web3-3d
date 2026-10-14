<h1 align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=8B5CF6,22D3EE&height=160&section=header&text=Abdullah%20Asim&fontSize=52&fontColor=ffffff&fontAlignY=38&desc=Full%20Stack%20%7C%20ML%20Engineer%20%7C%20n8n%20Automation&descAlignY=60&descSize=18" alt="Header" width="100%" />
</h1>

<p align="center">
  <a href="https://portfolio-web3-3d-y84m.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Site-Visit%20Portfolio-8B5CF6?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Site" />
  </a>
  <a href="https://github.com/Abdullah-Asim-dev">
    <img src="https://img.shields.io/badge/GitHub-Abdullah--Asim--dev-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.linkedin.com/in/abdullah-asim-dev/">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=22&pause=1000&color=22D3EE&center=true&vCenter=true&width=700&lines=Building+scalable+web+applications;Training+ML+and+deep+learning+models;Designing+n8n+automation+pipelines;Shipping+AI+voice+agents+and+chatbots" alt="Typing SVG" />
</p>

---

## 👋 About Me

I am **Abdullah Asim**, a **Full Stack Developer**, **Machine Learning Engineer** and **n8n Automation Specialist** based in **Lahore, Pakistan**. I build web applications on scalable cloud architecture, train ML and deep learning models that turn complex data into decisions, and design automation pipelines that remove manual work.

- 🚀 Full stack web and SaaS applications
- 🧠 Machine learning and deep learning models
- ⚙️ n8n workflow and automation pipelines
- 🎙️ AI voice and call agents, chatbots and AI agents
- ☁️ Cloud architecture and API / backend development

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 🎨 | **Responsive UI** | Fixed social rail on desktop, stacked layout on mobile |
| 🎞️ | **Smooth Motion** | Framer Motion animations with reduced-motion support |
| ✉️ | **Contact Form** | Validation, spam honeypot and email delivery via Resend |
| 💬 | **WhatsApp Fallback** | One-click pre-filled WhatsApp message |
| 🤖 | **AI Chat Assistant** | Answers visitor questions using the Groq API |
| 🌌 | **Particle Background** | Animated canvas layer behind the content |
| 🔍 | **SEO and GEO Ready** | Metadata, Open Graph, JSON-LD, sitemap, robots and `llms.txt` |
| ⚡ | **Fast Fonts** | Inter and Plus Jakarta Sans via `next/font` |

---

## 🛠️ Tech Stack

<p>
  <img src="https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Groq%20API-F55036?style=for-the-badge&logoColor=white" alt="Groq" />
  <img src="https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white" alt="Resend" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

| Area | Tools |
|---|---|
| 🌐 Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion |
| 🧩 Icons | Lucide React, React Icons |
| 🔌 Backend | Next.js Route Handlers (`/api/contact`, `/api/chat`) |
| 📧 Email | Resend |
| 🤖 AI | Groq API (LLM chat) |
| ☁️ Hosting | Vercel |
| 🔧 Automation | n8n |
| 🧠 ML | Machine learning and deep learning models |

---

## 📂 Project Structure

```text
portfolio-web3-3d/
├── public/                 # Profile photo, gallery, resume, llms.txt
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/       # AI chat route (Groq)
│   │   │   └── contact/    # Contact route (Resend)
│   │   ├── components/     # Hero, About, Services, Projects, Contact, Navbar...
│   │   ├── globals.css     # Design tokens and base styles
│   │   ├── layout.tsx      # Root layout, fonts and metadata
│   │   ├── page.tsx        # Home page
│   │   ├── robots.ts       # robots.txt
│   │   └── sitemap.ts      # sitemap.xml
│   └── lib/
│       └── site.ts         # Site URL, name and shared SEO content
├── .env.local              # Local secrets (not committed)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- ✅ Node.js 20 or later
- ✅ npm
- ✅ Resend API key
- ✅ Groq API key

### Installation

```bash
git clone https://github.com/Abdullah-Asim-dev/portfolio-web3-3d.git
cd portfolio-web3-3d
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=your_email@example.com

# Optional: after verifying your domain in Resend
# CONTACT_FROM_EMAIL=Portfolio Contact <contact@yourdomain.com>
```

| Variable | Required | Purpose |
|---|---|---|
| `GROQ_API_KEY` | ✅ | AI chat route |
| `RESEND_API_KEY` | ✅ | Contact form email |
| `CONTACT_TO_EMAIL` | ✅ | Receives contact messages |
| `CONTACT_FROM_EMAIL` | ❌ | Sender address (defaults to `onboarding@resend.dev`) |

> ⚠️ Never commit `.env.local`. It is already listed in `.gitignore`.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

---

## ☁️ Deployment

Deployed on **Vercel**. Every push to `main` triggers a new production deployment.

1. Push the repository to GitHub.
2. Import it in [Vercel](https://vercel.com).
3. Add `GROQ_API_KEY`, `RESEND_API_KEY` and `CONTACT_TO_EMAIL` under **Settings → Environment Variables**.
4. Deploy.

---

## 🔍 SEO and AI Discoverability

- 🏷️ Metadata and Open Graph tags in `src/app/layout.tsx`
- 🧾 JSON-LD structured data (Person, WebSite, ProfilePage)
- 🗺️ `sitemap.xml` and `robots.txt` generated from `src/app/`
- 🤖 `public/llms.txt` gives AI tools a plain-text summary of my profile and services

---

## 📬 Contact

<p>
  <a href="mailto:abdullahasimoffical4737@gmail.com"><img src="https://img.shields.io/badge/Email-abdullahasimoffical4737%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>
  <a href="https://wa.me/923716386114"><img src="https://img.shields.io/badge/WhatsApp-%2B92%20371%206386114-25D366?style=flat-square&logo=whatsapp&logoColor=white" alt="WhatsApp" /></a>
  <a href="https://www.linkedin.com/in/abdullah-asim-dev/"><img src="https://img.shields.io/badge/LinkedIn-abdullah--asim--dev-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://github.com/Abdullah-Asim-dev"><img src="https://img.shields.io/badge/GitHub-Abdullah--Asim--dev-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>
</p>

---

## 📄 License

Licensed under the terms in the [LICENSE](LICENSE) file.

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=8B5CF6,22D3EE&height=90&section=footer" alt="Footer" width="100%" />
</p>