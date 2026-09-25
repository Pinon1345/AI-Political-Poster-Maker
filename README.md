# 🗳️ PoliticAI Studio

### AI-Powered Political Poster & Campaign Studio

**PoliticAI Studio** is a modern full-stack AI-powered platform for creating professional political campaign assets, poster designs, campaign content, and visual communication materials.

The platform combines **Next.js, React, TypeScript, Express.js, MongoDB, Google GenAI, Cloudinary, and JWT authentication** to provide a complete workflow for creating, managing, and exporting campaign assets from a single platform.

> ⚡ **Live Demo:** [PoliticAI Studio](https://ai-political-poster-maker.vercel.app/)

---

## 🌐 Live Application

🚀 **Production Website:**
https://ai-political-poster-maker.vercel.app/

### Source Code

**Frontend / Client**

https://github.com/Pinon1345/AI-Political-Poster-Maker

**Backend / Server**

https://github.com/Pinon1345/AI-Political-Poster-Maker-Server-Side

---

# ✨ Highlights

* 🤖 AI-powered campaign content generation
* 🎨 Professional political poster generation
* 🖼️ High-resolution poster export
* 🔐 Secure authentication with JWT
* 👤 User registration and login
* ☁️ Cloudinary-powered image storage
* 🧠 Google GenAI integration
* 📊 Campaign analytics dashboard
* 📈 Visual reporting with interactive charts
* 🗂️ Generated content history
* 🛡️ Security middleware and API rate limiting
* 🌙 Modern responsive interface
* ⚡ Fast Next.js App Router architecture
* 📱 Responsive design for desktop, tablet, and mobile
* 🔄 RESTful API architecture
* 🧩 Modular frontend and backend structure

---

# 🎯 What Can You Do With PoliticAI Studio?

### 📝 AI Campaign Content

Generate structured campaign content such as:

* Campaign slogans
* Manifesto-style content
* Policy briefs
* Political messaging
* Campaign descriptions
* Structured communication materials

The live platform presents AI-assisted campaign generation as one of its core workflows.

---

### 🎨 AI Poster Studio

Create professional visual campaign assets using a structured poster-generation workflow.

Users can work with campaign information such as:

* Candidate name
* Designation
* Campaign slogan
* Campaign message
* Poster style
* Visual assets

Generated posters can then be exported as publication-ready PNG assets using the frontend's image-generation/export tooling.

---

### 📊 Campaign Dashboard

PoliticAI Studio provides a modern dashboard experience for monitoring campaign-related information and visualizing metrics through interactive reporting components.

The live application includes campaign analytics and visual reporting sections.

---

### 🗂️ Content & Asset History

Keep previously generated campaign materials organized so users can revisit and manage their generated assets.

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────────┐
                         │       User / Client     │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │   Next.js Frontend      │
                         │   React + Tailwind CSS   │
                         │   HeroUI + Framer Motion│
                         └────────────┬────────────┘
                                      │
                              REST API / Axios
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │   Express.js Backend    │
                         │       TypeScript        │
                         └────────────┬────────────┘
                                      │
                  ┌───────────────────┼───────────────────┐
                  │                   │                   │
                  ▼                   ▼                   ▼
          ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
          │ Google GenAI │    │   MongoDB    │    │  Cloudinary  │
          │ AI Generation│    │   Database   │    │ Image Storage│
          └──────────────┘    └──────────────┘    └──────────────┘
```

---

# 🛠️ Tech Stack

## 🎨 Frontend

| Technology          | Purpose                                    |
| ------------------- | ------------------------------------------ |
| **Next.js 16**      | React framework & application architecture |
| **React 19**        | UI development                             |
| **TypeScript**      | Type-safe development                      |
| **Tailwind CSS 4**  | Styling & responsive layouts               |
| **HeroUI**          | Modern UI components                       |
| **Framer Motion**   | Animations & interactions                  |
| **Lucide React**    | Interface icons                            |
| **React Icons**     | Additional icon library                    |
| **Axios**           | API communication                          |
| **React Hook Form** | Form management                            |
| **Zod**             | Schema validation                          |
| **Recharts**        | Data visualization                         |
| **html-to-image**   | Poster/image export                        |
| **React Hot Toast** | User notifications                         |
| **next-themes**     | Theme management                           |

The current frontend package configuration confirms these dependencies, including Next.js 16, React 19, Tailwind CSS 4, HeroUI, Framer Motion, Recharts, Zod, and html-to-image.

---

## ⚙️ Backend

| Technology             | Purpose                       |
| ---------------------- | ----------------------------- |
| **Node.js**            | Server runtime                |
| **Express.js 5**       | REST API framework            |
| **TypeScript**         | Backend development           |
| **MongoDB**            | Database                      |
| **Mongoose**           | MongoDB ODM                   |
| **Google GenAI**       | AI-powered content generation |
| **Cloudinary**         | Cloud image storage           |
| **JWT**                | Authentication                |
| **bcrypt**             | Password hashing              |
| **Multer**             | File upload handling          |
| **Helmet**             | HTTP security                 |
| **Express Rate Limit** | API abuse protection          |
| **Pino**               | Application logging           |
| **CORS**               | Cross-origin request handling |
| **dotenv**             | Environment configuration     |

These backend technologies are reflected in the project's current server dependency configuration.

---

# 🔐 Security

Security is an important part of the application architecture.

### Authentication

* JWT-based authentication
* Secure password hashing with bcrypt
* Protected API resources
* Token-based user identification

### API Security

* Helmet security middleware
* CORS configuration
* Express rate limiting
* Environment-based secrets
* Structured server-side error handling

### Data Protection

Sensitive credentials and API keys are managed through environment variables rather than being committed to the repository.

---

# 📁 Project Structure

## Frontend

```text
AI-Political-Poster-Maker/
│
├── app/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   └── ...
│
├── components/
│   └── reusable UI components
│
├── public/
│   └── static assets
│
├── utils/
│   └── helper functions
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

The current frontend repository uses an App Router-based Next.js structure with `app`, `components`, `public`, and `utils` directories.

---

## Backend

```text
AI-Political-Poster-Maker-Server-Side/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.ts
│
├── package.json
├── tsconfig.json
├── vercel.json
└── .gitignore
```

---

# 🚀 Getting Started

Follow the steps below to run PoliticAI Studio locally.

## 📋 Prerequisites

Make sure you have the following installed:

* **Node.js 18+**
* **npm**
* **MongoDB Atlas account** or a local MongoDB instance
* **Google AI API key**
* **Cloudinary account**

---

# 1️⃣ Clone the Frontend

```bash
git clone https://github.com/Pinon1345/AI-Political-Poster-Maker.git

cd AI-Political-Poster-Maker

npm install
```

---

# 2️⃣ Configure Frontend Environment

Create a `.env.local` file in the frontend root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

If your backend uses a different port or URL, update the value accordingly.

---

# 3️⃣ Clone the Backend

Open another terminal:

```bash
git clone https://github.com/Pinon1345/AI-Political-Poster-Maker-Server-Side.git

cd AI-Political-Poster-Maker-Server-Side

npm install
```

---

# 4️⃣ Configure Backend Environment

Create a `.env` file inside the backend project:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_AI_API_KEY=your_google_ai_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> ⚠️ Never commit `.env` or `.env.local` files to GitHub.

---

# 5️⃣ Run the Backend

```bash
npm run dev
```

The API server should now be available at:

```text
http://localhost:5000
```

---

# 6️⃣ Run the Frontend

Open another terminal:

```bash
cd AI-Political-Poster-Maker

npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🌍 Deployment

PoliticAI Studio uses a decoupled frontend/backend architecture.

```text
Frontend
   │
   └── Next.js
          │
          ▼
       Vercel


Backend
   │
   └── Express + TypeScript
          │
          ├── MongoDB Atlas
          ├── Google GenAI
          └── Cloudinary
```

### Frontend

The Next.js application is deployed on **Vercel**.

### Backend

The Express/TypeScript API is deployed separately and configured for Vercel deployment.

The backend repository includes a `vercel.json` configuration file.

---

# 📸 Application Preview

### 🏠 Landing Page

The platform provides a modern AI-focused landing experience with campaign generation, poster creation, analytics, and other platform capabilities.

### 🎨 Poster Generation

Create campaign-ready visual assets through the poster studio.

### 📊 Analytics Dashboard

Visualize campaign-related information through interactive dashboard components.

---

# 🧠 Key Engineering Concepts

This project demonstrates practical experience with:

* Full-stack application architecture
* REST API development
* Authentication & authorization
* JWT-based security
* Password hashing
* MongoDB data modeling
* AI API integration
* Cloud image storage
* File upload handling
* API rate limiting
* Security middleware
* Form validation
* Responsive UI development
* Data visualization
* Image generation/export
* Environment configuration
* Vercel deployment
* Frontend/backend separation

---

# 📈 Future Improvements

Potential future improvements include:

* [ ] Advanced AI campaign assistant
* [ ] More poster templates
* [ ] Drag-and-drop poster editor
* [ ] Custom typography controls
* [ ] Multi-language campaign generation
* [ ] Advanced analytics
* [ ] Campaign asset sharing
* [ ] PDF export
* [ ] Social media publishing integrations
* [ ] Role-based administration
* [ ] Campaign collaboration
* [ ] AI-assisted visual recommendations

---

# ⚖️ Responsible Use

PoliticAI Studio is a software project demonstrating AI-assisted campaign communication and visual asset generation.

Users are responsible for ensuring that content created through the platform complies with applicable laws, regulations, platform policies, copyright requirements, and election-related rules in their jurisdiction.

The application should not be used to create deceptive, fraudulent, or unlawful political content.

---

# 📄 License

This project is distributed under the **MIT License**.

See the `LICENSE` file for more information.

---

# 👨‍💻 Developer

### Fourkan Bin Ilias

**Full Stack Web Developer**

Interested in building modern, scalable web applications using JavaScript/TypeScript, React, Next.js, Node.js, Express.js, MongoDB, and AI technologies.

### 🔗 Connect

* 🌐 **Live Project:** https://ai-political-poster-maker.vercel.app/
* 💻 **Frontend:** https://github.com/Pinon1345/AI-Political-Poster-Maker
* ⚙️ **Backend:** https://github.com/Pinon1345/AI-Political-Poster-Maker-Server-Side
* 🐙 **GitHub:** https://github.com/Pinon1345

---

<div align="center">

### 🗳️ PoliticAI Studio

**Create. Generate. Communicate.**

Built by using modern full-stack technologies and AI.

⭐ If you find this project interesting, consider giving the repository a star!

</div>
