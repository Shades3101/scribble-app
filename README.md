<div align="center">

# 🎨 Scribble
### The Ultimate Real-Time Collaborative Canvas
*Where ideas take shape, together.*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

[Explore the Docs](#-getting-started) · [Report Bug](https://github.com/Shades3101/scribble-app/issues) · [Request Feature](https://github.com/Shades3101/scribble-app/issues)

</div>

---

## 📖 Table of Contents
- [✨ Key Features](#-key-features)
- [🖼️ Project Gallery](#️-project-gallery)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Project Architecture](#️-project-architecture)
- [🧭 Roadmap](#-roadmap)
- [🚀 Getting Started](#-getting-started)
- [🤝 Contributing](#-contributing)

---

## ✨ Key Features

-   🚀 **Real-Time Collaboration**: Multi-user drawing with sub-50ms synchronization via custom WebSockets.
-   🤝 **Smart Rooms**: Unique room slugs with persistent history and state management.
-   🎨 **Infinite Expression**: Hand-drawn style aesthetics with support for shapes, arrows, and freehand.
-   🏗️ **Monorepo Power**: Blazing fast builds and type-safety across the entire stack using Turborepo.
-   🔐 **Enterprise-Grade Auth**: Secure session management using JWT and Google OAuth.
-   💾 **Cloud Sync**: PostgreSQL-backed drawing persistence—pick up exactly where you left off.

---

## 🖼️ Project Gallery

<div align="center">
  
  ### 🚀 Landing Page
  <kbd>
    <img src="apps/scribble-fe/public/Landing Page.png" width="800" alt="Scribble Landing Page">
  </kbd>
  
  <br/>
  <br/>

  ### 📊 User Dashboard
  <kbd>
    <img src="apps/scribble-fe/public/Dashboard.png" width="800" alt="Scribble Dashboard">
  </kbd>

  <br/>
  <br/>

  ### 🎨 Collaborative Canvas
  <kbd>
    <img src="apps/scribble-fe/public/Canvas Page.png" width="800" alt="Scribble Canvas Interface">
  </kbd>

  <p><i>From first click to final brushstroke—real-time collaboration at its finest.</i></p>
</div>

---

## 🛠️ Tech Stack

<details>
<summary><b>Click to see the full technical breakdown</b></summary>

### 💻 Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/)
- **State**: React Context API + Custom Hooks
- **Icons**: [Lucide React](https://lucide.dev/)

### ⚙️ Backend
- **REST API**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **Real-Time Engine**: Custom [WebSocket](https://github.com/websockets/ws) Server
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Validation**: [Zod](https://zod.dev/)

### 🛠️ DevOps & Tooling
- **Monorepo**: [Turborepo](https://turbo.build/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Package Manager**: [pnpm](https://pnpm.io/)
</details>

---

## 🏗️ Project Architecture

```mermaid
graph TD
    A[Scribble-FE] -->|REST| B[HTTP-Backend]
    A -->|WS| C[WS-Backend]
    B -->|Prisma| D[(PostgreSQL)]
    C -->|Prisma| D
    B -.->|Share Types| E{Common Package}
    C -.->|Share Types| E
    A -.->|Share UI| F{UI Package}
```

This project uses a specialized monorepo structure to ensure high cohesion and low coupling:
-   `apps/scribble-fe`: The Next.js client.
-   `apps/ws-backend`: Lightweight, high-speed WebSocket broadcaster.
-   `apps/http-backend`: Robust API for user management and room logic.
-   `packages/db`: A single source of truth for your database schema.
-   `packages/common`: Shared Zod validators and TypeScript contracts.

---

## 🧭 Roadmap

We are constantly evolving! Here’s what we’re working on next:

- [x] **Core Real-Time Engine**: Basic shape sync & room management.
- [x] **Google Auth Integration**: Secure social login flow.
- [ ] **Layered Canvas Rendering**: Performance optimization for 1000+ shapes.
- [ ] **Exponential Backoff Reconnection**: Improved WS stability on flaky networks.
- [ ] **Asymmetric Key Auth (RS256)**: Enhanced security for service-to-service auth.
- [ ] **Collaborator Presence**: Visual indicators (cursors) of other active users.

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js**: v18.0.0 or higher
- **pnpm**: v9.0.0 or higher
- **PostgreSQL**: A running instance (local or hosted)

### 🛠️ Local Installation

1. **Clone & Enter**:
   ```bash
   git clone https://github.com/Shades3101/scribble-app.git
   cd scribble
   ```

2. **Install Deep Relations**:
   ```bash
   pnpm install
   ```

3. **Configure Environment**:
   *Create `.env` files in `apps/scribble-fe`, `http-backend`, and `ws-backend`.*
   ```env
   DATABASE_URL="postgresql://user:pass@localhost:5432/scribble"
   JWT_SECRET="your-super-secret"
   ```

4. **Prepare the Vault**:
   ```bash
   pnpm db:generate
   pnpm db:push
   ```

5. **Engage Engines**:
   ```bash
   pnpm dev
   ```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout -b feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

[Back to top](#-scribble)

</div>