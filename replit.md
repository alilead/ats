# ATS - All Trade Services Website

## Project Overview
This is a React/TypeScript frontend application for ATS (All Trade Services), a home services company offering construction, garden, and maintenance services. The site includes a booking system with Airtable integration via Netlify functions.

## Architecture
- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **Backend**: Netlify Functions (serverless)
- **Database**: Airtable (via API)
- **Routing**: React Router DOM

## Recent Changes
- **2025-09-25**: Configured for Replit environment
  - Updated Vite config to use port 5000 and host 0.0.0.0
  - Added HMR client port configuration for Replit's proxy
  - Set up workflow for frontend development
  - Configured deployment settings for autoscale

## Key Features
- Multi-language support (language selector)
- Service booking system with date/time selection
- Admin panel for viewing bookings
- Contact forms and service information
- Responsive design with dark/light theme support

## Development Setup
- Port: 5000
- Command: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## External Dependencies
- Airtable API for data storage
- Netlify functions for backend API endpoints
- Environment variables needed for production:
  - AIRTABLE_API_KEY
  - AIRTABLE_BASE_ID
  - AIRTABLE_TABLE_NAME
  - ADMIN_TOKEN

## Project Status
✅ Successfully configured for Replit environment
✅ Frontend running on port 5000
✅ Development workflow established
✅ Deployment configuration completed