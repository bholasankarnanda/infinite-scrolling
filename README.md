# Infinite Scroll Photo Gallery

A modern, responsive infinite scroll photo gallery built with React, TypeScript, and Material-UI. The application fetches photos from the Unsplash API and implements infinite scroll functionality for seamless browsing.

## 📋 Features

- **Infinite Scroll**: Automatically loads more photos as you scroll down
- **Skeleton Loading**: Beautiful loading states with skeleton screens
- **Responsive Grid**: Adaptive 5-column grid layout with smooth images
- **Unsplash Integration**: Fetches high-quality photos from Unsplash API
- **TypeScript Support**: Fully typed with TypeScript for better development experience
- **Material-UI Components**: Uses MUI for professional UI components

## 🎥 Demo

Check out the demo video to see the infinite scroll in action:

![Infinite Scroll Demo](src/assets/video/infinitescrolling.mp4)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

Check for code quality issues:

```bash
npm run lint
```

## 🏗️ Project Structure

```
src/
├── App.tsx              # Main App component
├── main.tsx             # Application entry point
├── index.css            # Global styles
├── App.css              # App-specific styles
├── components/
│   └── Photos.tsx       # Photo grid and infinite scroll logic
└── assets/
    └── video/
        └── infinitescrolling.mp4  # Demo video
```

## 📦 Dependencies

- **React** (^19.2.0): UI library
- **React DOM** (^19.2.0): DOM rendering
- **TypeScript** (~5.9.3): Type safety
- **Vite** (^7.2.4): Build tool and dev server
- **Material-UI** (^7.3.5): UI component library
- **Emotion** (^11.14.0+): CSS-in-JS styling
- **Axios** (^1.13.2): HTTP client for API requests

## 🔑 API Key

The application uses the Unsplash API to fetch photos. The access key is embedded in the `Photos.tsx` component:

```typescript
const ACCESS_KEY = "vaZ3oP-KoyMbQJ6lWIIglBONmJPfppNUqTRGl6nLa3Y";
```

**Note**: For production use, move this to environment variables for security.

## 🎨 Component Details

### Photos Component (`src/components/Photos.tsx`)

The main component responsible for:
- Fetching photos from Unsplash API
- Managing pagination state
- Implementing infinite scroll logic
- Rendering photo grid with skeleton loaders
- Handling loading states

**Key Features**:
- Fetches 10 photos per page
- Shows 20 skeleton items during initial load
- Displays 10 skeleton loaders during subsequent scrolls
- Triggers fetch when user scrolls within 200px of the bottom
- Prevents duplicate requests during loading

## 🔧 How Infinite Scroll Works

1. User scrolls down the page
2. A scroll event listener calculates if the user has scrolled within 200px of the bottom
3. If at the bottom and not currently loading, the next page is fetched
4. New photos are appended to the existing photos array
5. Skeleton loaders appear while fetching
6. New photos render once data arrives

## 📱 Responsive Design

- 5-column grid layout
- Gap spacing for visual separation
- Images maintain aspect ratio with object-fit: cover
- Smooth transitions and loading states

## 🎬 Demo Video

The project includes a demo video (`src/assets/video/infinitescrolling.mp4`) showcasing the infinite scroll feature in action.

## 🛠️ Development

- **ESLint**: Configured for code quality
- **TypeScript**: Strict type checking enabled
- **Hot Module Replacement**: Vite provides instant updates during development

## 📝 License

This project is open source.
