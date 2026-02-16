# 🎨 Scribble - Real-Time Collaborative Canvas

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

**Scribble** is a high-performance, real-time collaborative drawing platform inspired by Excalidraw. Built with a modern monorepo architecture, it allows multiple users to draw, brainstorm, and collaborate on a shared canvas with lightning-fast synchronization.

---

## ✨ Key Features

-   🚀 **Real-Time Collaboration**: Draw together with your team in real-time using low-latency WebSockets.
-   🤝 **Room-Based Brainstorming**: Create unique rooms via slugs and invite collaborators effortlessly.
-   🎨 **Infinite Canvas**: A smooth, responsive drawing experience with support for various shapes, freehand drawing, and erasers.
-   🏗️ **Scalable Monorepo**: Powered by Turborepo for efficient builds and shared code across apps and packages.
-   🔐 **Secure Auth**: Full authentication system with JWT and Google integration.
-   💾 **Persistent State**: Your drawings are saved automatically to a PostgreSQL database.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Hooks & Context API
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **HTTP Server**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Real-Time**: [WebSockets](https://github.com/websockets/ws)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Validation**: [Zod](https://zod.dev/)

### Shared Infrastructure
- **Build System**: [Turborepo](https://turbo.build/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 🏗️ Project Architecture

This project is structured as a monorepo using Turborepo:

```text
.
├── apps
│   ├── scribble-fe   # Next.js frontend application
│   ├── ws-backend    # WebSocket server for real-time sync
│   └── http-backend  # REST API for users, rooms, and auth
├── packages
│   ├── db            # Prisma schema and shared database client
│   ├── common        # Shared Zod schemas, types, and constants
│   ├── ui            # Shared React component library
│   ├── config        # Shared ESLint and TypeScript configurations
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- pnpm >= 9.0.0
- PostgreSQL instance

### Local Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/Shades3101/draw-app.git
   cd scribble
   ```

2. **Install dependencies**:
   ```sh
   pnpm install
   ```

3. **Environment Setup**:
   Copy `.env.example` to `.env` in the respective apps and fill in your credentials (DATABASE_URL, JWT_SECRET, etc.).

4. **Initialize Database**:
   ```sh
   pnpm db:generate
   pnpm db:push
   ```

5. **Run Development Mode**:
   ```sh
   pnpm dev
   ```

Your apps should now be running:
- Frontend: `http://localhost:3000`
- API Backend: `http://localhost:8080`
- WS Backend: `ws://localhost:8081`

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Shades3101">Karan Narania</a>
</p>
