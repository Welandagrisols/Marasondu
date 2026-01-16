# MaraSondu Stakeholders Forum

## Overview

A full-stack website for MaraSondu WRUAS Forum - a network of 30 Water Resource Users Associations in Kenya's Lake Victoria Basin working with Water Resources Authority. The platform serves as a comprehensive hub for water conservation efforts, featuring project portfolios, WRUA network management, blog/news content, funding opportunities, and community engagement tools.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables
- **Maps**: Leaflet for interactive WRUA network mapping
- **Charts**: Recharts for impact visualization

The frontend follows a page-based architecture with shared components. Public pages include Home, About, Portfolio, Network, Impact, Funding, News, and Contact. Admin pages provide a dashboard for content management.

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Design**: RESTful endpoints under `/api/*` prefix
- **Authentication**: JWT-based admin authentication with bcryptjs for password hashing
- **File Uploads**: Multer for image uploads with file type validation
- **Development**: Separate entry points for dev (`index-dev.ts`) and production (`index-prod.ts`)

The server uses a storage abstraction layer (`storage.ts`) that interfaces with the database through Drizzle ORM, making it easier to swap storage implementations if needed.

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: Neon Serverless PostgreSQL
- **Schema Location**: `shared/schema.ts` - shared between frontend and backend
- **Migrations**: Managed via `drizzle-kit push`

Key entities include: Users (admin auth), Projects, WRUAs, BlogPosts, FundingOpportunities, ContactMessages, NewsletterSubscribers, and SiteSettings.

### Path Aliases
- `@/*` → `./client/src/*`
- `@shared/*` → `./shared/*`
- `@assets/*` → `./attached_assets/*`

### Design System
The application uses a custom color palette focused on water/environmental themes:
- Primary Blue (#0D5C7D) for trust and water association
- Secondary Green (#2D5F3F) for conservation
- Accent Orange (#E67E22) for calls-to-action
- Typography: Inter font for headings, system font stack for body text

## External Dependencies

### Database
- **Neon Serverless PostgreSQL**: Cloud-hosted PostgreSQL with WebSocket support for serverless environments
- Requires `DATABASE_URL` environment variable

### Authentication
- **JWT**: JSON Web Tokens for admin session management
- Requires `SESSION_SECRET` environment variable (falls back to default in development)

### Third-Party Services
- **Google Fonts**: Inter font family loaded via CDN
- **Unsplash**: Stock images used for project/content placeholders

### Key NPM Packages
- `@neondatabase/serverless`: Neon database driver
- `drizzle-orm` / `drizzle-kit`: Database ORM and migration tools
- `jsonwebtoken` / `bcryptjs`: Authentication utilities
- `multer`: File upload handling
- `slugify`: URL slug generation for content
- `zod`: Schema validation for API inputs
- `date-fns`: Date formatting utilities
- `leaflet` / `react-leaflet`: Interactive maps for WRUA network
- `recharts`: Data visualization charts