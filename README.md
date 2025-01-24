# Country Data Dashboard

## Overview

The **Country Data Dashboard** is a full-stack web application designed to list and display detailed information about countries. It includes search filters, region filters, a country detail page with an integrated Google Map to show the country’s location and statistical country comparison for population and area. The application is optimized for performance and security, featuring HTTP caching, in-memory caching, rate limiting, and debouncing.

## Features

- **Country List Dashboard:** Displays a list of all countries.
- **Search Filters:** Allows searching by country name or capital city.
- **Filter by Region:** Users can filter countries based on their geographic region.
- **Country Detail Page:** Provides detailed information about a specific country.
- **Google Map Integration:** Shows a Google Map with the country’s location on the country detail page.
- **Chart Integration:** Statistical comparison of Population and Area using Bar chart.
- **CI/CD**: Github action Workflow for automating `build` and `test` on **push** to the repository.
- **Performance Optimization:** Includes HTTP and in-memory caching for better performance.
- **Security Measures:** Features rate limiting and debouncing to prevent abuse and ensure smooth performance.

## Technologies Used

- **Backend:** Express.js (Node.js)
- **Frontend:** Next.js (React.js)
- **Styling:** Tailwind CSS
- **CI/CD:** GitHub Actions Workflow pipelines
- **Map:** Google Maps API
- **Chart:** Chart.js

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A Google Maps API key for map integration.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/country-data-dashboard.git
   cd country-data-dashboard
   ```

2. **Install dependencies:**
   Install in both folders
   
   ```bash
   npm install
   ```
   
3. **Frontend ENV Setup:**
   - Obtain your Google Maps API key from Google Cloud
   - Create a `.env.local` file in the frontend folder of the project with the following content
     
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost
   NEXT_PUBLIC_GOOGLE_MAP_KEY=your_google_map_key
   ```
   
4. **Run the Application:**
   for both frontend and backend
   ```bash
   npm run dev
   ```