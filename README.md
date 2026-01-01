# Minimal Strapi v4 CMS

This is a minimal Strapi v4 CMS project with SQLite database.

## Features
- **Articles & Categories**: Content types pre-configured for a Blog CMS.
- **Auto Admin Creation**: On first run, a default admin user is created.
- **REST API Enabled**: Standard Strapi REST API.
- **SQLite Database**: Validated for local development.

## Setup & Run

### 1. Install Dependencies
(Already installed)
```bash
npm install
```

### 2. Build Admin Panel
(Already built)
```bash
npm run build
```

### 3. Start Server
```bash
npm run develop
```

## Admin Access
- **URL**: [http://localhost:1337/admin](http://localhost:1337/admin)
- **Email**: `admin@example.com`
- **Password**: `StrapiPassword123!`

## Notes
- **Node Version**: This project targets Strapi v4 which supports Node 18-20. If you are running Node 22, you may need to use `nvm use 20` or ignore engine warnings (which are already configured to be ignored by `npm`).
- **Telemetry**: Disabled in `.env`.
