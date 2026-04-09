# SPB Erode Water Optimization Engine

A modern React + Vite frontend for the Industrial Water Management & Optimization System at SPB Erode mill.

## Overview

This project provides an interactive dashboard for monitoring and optimizing water consumption in industrial settings, with real-time data visualization and conservation strategy management.

## Features

- **Real-time Dashboard**: Track water consumption across plant sections
- **Analytics & Insights**: Performance metrics and trend analysis
- **Optimization Strategies**: Detailed conservation initiatives with ROI calculations
- **Interactive Charts**: Visual representations of consumption patterns and projections
- **Admin Control Panel**: System configuration and monitoring

## Technology Stack

- **React 19**: UI framework
- **Vite 7**: Build tool with HMR
- **Recharts**: Data visualization
- **Tailwind CSS 4**: Styling
- **Lucide React**: Icons

## Setup

```bash
npm install
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Deployment

This app is deployed to GitHub Pages at [khalandars.github.io/SPB](https://khalandars.github.io/SPB)

## Data Files

The app loads data from JSON files in `/public`:
- `visualization_data.json` - Dashboard metrics and charts
- `insights.json` - AI-generated insights and recommendations
- `data.json` - Monthly consumption data
- `consumption_breakup.json` - Departmental breakdown
- `norms.json` - Target consumption norms
- `conservation_strategies.json` - Conservation initiatives

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
