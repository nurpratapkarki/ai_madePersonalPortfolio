# 🚀 Deployment & Setup Guide

This guide covers setting up the AI-First Portfolio on both local development and cPanel hosting environments.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup (MongoDB)](#database-setup-mongodb)
5. [cPanel Deployment](#cpanel-deployment)
6. [First-Time Admin Setup](#first-time-admin-setup)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB** (local or MongoDB Atlas)
- **Git** for version control

For cPanel deployment:
- cPanel hosting with Node.js support
- MongoDB Atlas account (recommended for cPanel)
- SSH access (optional but helpful)

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nurpratapkarki/ai_madePersonalPortfolio.git
cd ai_madePersonalPortfolio
```

### 2. Install Dependencies

```bash
# Install root dependencies (optional, for concurrent development)
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Configure Environment Variables

Create environment files:

```bash
# Server environment
cp server/.env.example server/.env

# Client environment  
cp client/.env.example client/.env.local
```

### 4. Start Local MongoDB (or use Atlas)

For local development, you can:
- Install MongoDB locally: `mongodb://localhost:27017/portfolio`
- Or use MongoDB Atlas free tier (see Database Setup section)

### 5. Seed the Database with Demo Data

This populates your local database with sample projects and content so you can see the app in action:

```bash
cd server
npm run seed
```

This will create:
- **6 demo projects** (AI-generated, Hybrid, and Manual categories)
- **Content sections** (Hero, About, Skills, Contact, Settings)
- **Admin user** with credentials:
  - Email: `admin@portfolio.local`
  - Password: `Admin123!`

⚠️ **Important:** Change the admin password in production!

### 6. Start Development Servers

**Option A: Run both together (from root)**
```bash
npm run dev
```

**Option B: Run separately (recommended)**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

Access the app at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/health

### 7. Access Admin Panel

Press `Ctrl+Shift+A` on any page to access the admin login, then use the seeded credentials.

---

## Environment Configuration

### Server Environment (server/.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
# For local: mongodb://localhost:27017/portfolio
# For Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio
MONGODB_URI=mongodb://localhost:27017/portfolio

# JWT Configuration (IMPORTANT: Change these in production!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production-min-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Email Configuration (optional - for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

### Client Environment (client/.env.local)

```env
# API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Optional: Google Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Database Setup (MongoDB)

### Option 1: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Linux/macOS
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```
3. Use `mongodb://localhost:27017/portfolio` as your connection string

### Option 2: MongoDB Atlas (Recommended for Production)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Add your IP to the whitelist (or allow all IPs: 0.0.0.0/0)
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with your credentials

---

## cPanel Deployment

### Step 1: Prepare Production Builds

```bash
# Build the server
cd server
npm run build

# Build the client
cd ../client
npm run build
```

### Step 2: Setup MongoDB Atlas

Since most cPanel hosts don't support local MongoDB, use MongoDB Atlas:

1. Create a MongoDB Atlas cluster (free tier available)
2. Create database user with read/write access
3. Whitelist IP `0.0.0.0/0` to allow connections from cPanel
4. Copy the connection string

### Step 3: Deploy Backend to cPanel

1. **Create Node.js Application in cPanel:**
   - Go to cPanel → Setup Node.js App
   - Click "Create Application"
   - Settings:
     - Node.js version: 18.x or higher
     - Application mode: Production
     - Application root: `server` (or your subfolder)
     - Application URL: your-domain.com/api (or api.your-domain.com)
     - Application startup file: `dist/server.js`
   - Click "Create"

2. **Upload Server Files:**
   - Use File Manager or FTP to upload:
     - `server/dist/` folder
     - `server/package.json`
     - `server/package-lock.json`
   - Do NOT upload `node_modules` - cPanel will install them

3. **Install Dependencies:**
   - In cPanel Node.js App, click "Run NPM Install"

4. **Configure Environment Variables:**
   - In cPanel Node.js App, add environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   JWT_SECRET=your-production-jwt-secret-at-least-32-characters
   JWT_REFRESH_SECRET=your-production-refresh-secret-at-least-32-characters
   FRONTEND_URL=https://your-domain.com
   ```

5. **Start the Application:**
   - Click "Run JS Script" → Start
   - Check logs for any errors

### Step 4: Deploy Frontend to cPanel

**Option A: Static Export (Recommended)**

1. Configure Next.js for static export in `client/next.config.ts`:
   ```typescript
   const nextConfig = {
     output: 'export',
     // ... other config
   };
   ```

2. Build static files:
   ```bash
   cd client
   npm run build
   ```

3. Upload the `client/out/` folder contents to `public_html/`

**Option B: Node.js SSR (if cPanel supports multiple Node apps)**

1. Create another Node.js app for the frontend
2. Upload built Next.js files
3. Set startup file to `.next/standalone/server.js`

### Step 5: Configure Domain & SSL

1. **Point domain to cPanel** via DNS settings
2. **Enable SSL:**
   - cPanel → SSL/TLS → Let's Encrypt
   - Install certificate for your domain
3. **Force HTTPS:**
   - Add to `.htaccess` in public_html:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

### Step 6: Configure API Proxy (if frontend and backend on same domain)

Add to `.htaccess`:
```apache
# Proxy API requests to Node.js backend
RewriteEngine On
RewriteRule ^api/(.*)$ http://localhost:5000/api/$1 [P,L]
```

---

## First-Time Admin Setup

### 1. Register Admin Account

The first user to register becomes the admin. After that, registration is disabled.

1. Navigate to `/admin/login` or press `Ctrl+Shift+A` on any page
2. Click "Register" (only available if no admin exists)
3. Fill in:
   - Username
   - Email
   - Password (min 6 characters)
4. You'll be automatically logged in

### 2. Add Content

1. **Hero Section:**
   - Go to Admin → Content
   - Edit "Hero Section" with your name, tagline, and bio

2. **Add Projects:**
   - Go to Admin → Projects
   - Click "New Project"
   - Fill in project details:
     - Title, description
     - Technologies used
     - Category (AI-Generated, Hybrid, Manual)
     - URLs (live demo, GitHub)
     - Mark as "Featured" to show on homepage

3. **Update Skills:**
   - Go to Admin → Content → Skills
   - Customize skill categories

### 3. Secret Admin Access

You can access admin panel from any page by pressing:
```
Ctrl + Shift + A
```

---

## Troubleshooting

### Common Issues

**1. MongoDB Connection Failed**
```
Error: MongoNetworkError
```
- Check MongoDB is running
- Verify connection string
- For Atlas: Check IP whitelist, username/password

**2. CORS Errors**
```
Access-Control-Allow-Origin error
```
- Ensure `FRONTEND_URL` in server .env matches your domain
- Include protocol: `https://your-domain.com`

**3. JWT Errors**
```
JsonWebTokenError: invalid signature
```
- Ensure JWT secrets are the same after redeployment
- Clear browser cookies and sessionStorage

**4. cPanel Node.js App Won't Start**
- Check application logs in cPanel
- Verify startup file path is correct
- Ensure all dependencies are installed

**5. 404 on Page Refresh (Static Export)**
- Add `.htaccess` rule:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Getting Help

- Check server logs: `cPanel → Metrics → Errors`
- Check Node.js app logs in cPanel
- Open an issue on GitHub with:
  - Error message
  - Steps to reproduce
  - Environment (local/cPanel, Node version)

---

## Production Checklist

Before going live, ensure:

- [ ] JWT secrets are unique and secure (32+ characters)
- [ ] MongoDB connection is secure (Atlas recommended)
- [ ] SSL certificate is installed
- [ ] CORS is properly configured
- [ ] Admin account is created
- [ ] At least one featured project is added
- [ ] Hero content is customized
- [ ] Contact form email is configured
- [ ] Analytics tracking is set up (optional)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                     cPanel / Server                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Next.js Frontend (Static Export)                      │ │
│  │  - public_html/                                        │ │
│  │  - Served via Apache                                   │ │
│  └────────────────────────┬───────────────────────────────┘ │
│                          │                                   │
│                          ▼ /api/*                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Express.js Backend (Node.js App)                      │ │
│  │  - Port 5000                                           │ │
│  │  - JWT Authentication                                  │ │
│  │  - Rate Limiting                                       │ │
│  └────────────────────────┬───────────────────────────────┘ │
└──────────────────────────┼──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Atlas                             │
│  - Users collection                                          │
│  - Projects collection                                       │
│  - Content collection                                        │
│  - Analytics collection                                      │
└─────────────────────────────────────────────────────────────┘
```

---

*This portfolio was 100% AI-generated using GitHub Copilot and Claude. It demonstrates production-quality code through effective prompt engineering.*
