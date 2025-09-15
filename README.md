# NYC Restaurant Inspections Frontend

A modern Angular application for browsing and exploring NYC restaurant inspection data from the Department of Health and Mental Hygiene (DOHMH).

## 🏪 Features

- **Restaurant Search & Filtering**: Search by name, borough, cuisine type
- **Inspection Cards**: Modern, responsive cards displaying restaurant details, grades, and violations
- **Real-time Data**: Fetches live data from NYC Open Data API
- **Responsive Design**: Mobile-first design with Bootstrap 5
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Server-Side Rendering**: Angular SSR for improved performance and SEO

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm start
# or
ng serve
```

Open [http://localhost:4200](http://localhost:4200) to view the application.

### Production Build

```bash
npm run build
```

### SSR Development

```bash
npm run serve:ssr:nyc-inspections-frontend
```

## 🏗️ Architecture

- **Angular 19** with standalone components
- **Bootstrap 5** for responsive UI
- **RxJS** for reactive programming
- **TypeScript** for type safety
- **Docker** support included

## 📁 Project Structure

```
src/app/
├── inspections/list/          # Main inspections listing
│   ├── components/
│   │   ├── filters/          # Search and filter controls
│   │   ├── inspection-card/  # Restaurant card component
│   │   ├── pagination/       # Pagination controls
│   │   ├── loading/          # Loading states
│   │   └── no-data/          # Empty state
│   └── list.component.*      # Main list container
├── models/                   # TypeScript interfaces
├── services/                 # API and business logic
└── app.component.*          # Root component
```

## 🧪 Testing

```bash
# Unit tests
npm test

# Build for production
npm run build
```

## 📊 Data Source

Data provided by [NYC Open Data](https://data.cityofnewyork.us/Health/DOHMH-New-York-City-Restaurant-Inspection-Results/43nn-pn8j) - DOHMH New York City Restaurant Inspection Results.

## 🐳 Docker

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 📱 Features in Detail

- **Smart Filtering**: Filter by borough, cuisine type, and search terms
- **Grade Visualization**: Color-coded grade badges (A=Green, B=Orange, C=Red)
- **Responsive Cards**: Modern card design with hover effects and accessibility features
- **Pagination**: Efficient data loading with pagination controls
- **Loading States**: Smooth loading indicators and empty states
