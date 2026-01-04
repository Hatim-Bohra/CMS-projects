# Headless CMS Comparison Project

This repository contains two separate implementation of a minimal Blog CMS:
1. **Strapi v4** (Folder: `./cms`)
2. **Payload CMS v2** (Folder: `./payload-blog-cms`)

Both projects implement the same core features:
- **Collections**: Posts (Title, Slug, Content, Published Date)
- **Database**: Local (SQLite for Strapi, In-Memory Mongo for Payload)
- **API**: Publicly accessible REST API (GET /posts)

---

## 🚀 Quick Start Guide

### 1. Run Strapi CMS
A "batteries-included" CMS with a robust Admin UI.

```bash
# Open a terminal in the root folder
npm run develop
```
> **Note**: This runs the `develop` script from the root `package.json`, which I have aliased to the `cms` folder for convenience. 
> *Wait, the root package.json currently doesn't have this. I should update root package.json or just instruct user to cd.*

**Correct Instructions:**
```bash
cd cms
npm install  # First time only
npm run develop
```
- **Admin**: [http://localhost:1337/admin](http://localhost:1337/admin)
  - User: `admin@example.com` / `StrapiPassword123!`
- **API**: `http://localhost:1337/api/posts`

### 2. Run Payload CMS
A "code-first" CMS that integrates into an Express server.

```bash
cd payload-blog-cms
npm install  # First time only
npm run dev
```
- **Admin**: [http://localhost:3001/admin](http://localhost:3001/admin)
  - Create your first user when prompted.
- **API**: `http://localhost:3001/api/posts`
- **Database**: Uses an in-memory MongoDB (no installation required).

---

## 🆚 Comparison: Strapi vs Payload

| Feature | Strapi | Payload |
|:---|:---|:---|
| **Philosophy** | **Configuration-First**: Heavy reliance on Admin UI and JSON schemas. | **Code-First**: Schemas are TypeScript configs. You write code to define your content. |
| **Admin UI** | Pre-built, non-customizable core. Excellent for non-technical editors. | Pre-built but easily customizable via React components. |
| **Schema Definition** | JSON files (`schema.json`). Editing requires server restart (in v4). | TypeScript files (`my-collection.ts`). Full type safety and IntelliSense. |
| **Database** | Supports SQL databases (Postgres, SQLite, MySQL). | Primarily MongoDB (v2) or Postgres (v3). |
| **Developer Experience** | **Medium**. Programmatic setup requires verbose JSON manipulation and bootstrap scripts. | **High**, especially for LLMs. Since config is code, AI can generate valid schemas easily. |
| **Deployment** | Standalone Node.js app. | Can be embedded into any Express/Next.js app or run standalone. |

### Which one should you choose?

- **Choose Strapi if:**
  - You want a stable, enterprise-ready CMS out of the box.
  - Your team consists of non-technical content managers who need a powerful UI.
  - You prefer SQL databases (Postgres, MySQL).

- **Choose Payload if:**
  - You are a developer (or using AI) and prefer defining content in code.
  - You want end-to-end type safety with TypeScript.
  - You need to embed the CMS into an existing Node.js application.

---

## 📂 Project Structure

```
/
├── cms/               # Strapi Project
│   ├── config/        # Database & Server config
│   ├── src/api/       # Content Types (JSON schemas)
│   └── public/        # Static assets
│
└── payload-blog-cms/  # Payload Project
    ├── src/collections/ # TypeScript Content Definitions
    ├── src/server.ts    # Express Server Entry Point
    └── payload.config.ts # Main Configuration
```
