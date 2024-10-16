# WebPro Bus Booking System

## Overview

**WebPro Bus Booking System** is a web application built using modern web technologies like **Svelte**, **Vite**, **Tailwind CSS**, and **Express**. It is designed to manage and streamline bus ticket bookings for users, providing a fast, responsive, and user-friendly interface.

This project leverages Svelte as its frontend framework, Vite for fast builds and hot-reload during development, Tailwind CSS for utility-first styling, and Express for handling the server-side logic and routing.

## Technologies Used

- **[Svelte](https://svelte.dev/):** A component framework for building fast and responsive UIs.
- **[Vite](https://vitejs.dev/):** A next-generation frontend tool for building fast and optimized web applications.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework to build custom designs.
- **[Express](https://expressjs.com/):** A minimal and flexible Node.js web application framework for backend services.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v14+)
- **npm**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BlackBird-Coding/webpro-bus-ticket
   cd webpro-bus-ticket
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Development

To start the development server with hot reload:

```bash
npm run dev
```

This will start the Express server and Vite in development mode with hot module reloading enabled.

### Build for Production

To build the project for production:

```bash
npm run build
```

### Build for Production

To insert mock data to the project for production:
Please remove old main.db before run

```bash
npm run mock
```

This will generate production-ready assets in the `dist` directory for both the client and server.

### Preview the Build

To preview the production build:

```bash
npm run preview
```

This command will run the production build using Node.js and the Express server.

## Vite Configuration

The project is configured to use Vite for both client-side and server-side builds:

- **Client-side build:** Outputs static assets to `dist/client`.
- **Server-side build:** Outputs server-side rendered assets to `dist/server`.

Refer to `vite.config.ts` for specific configuration details.

## Tailwind CSS Configuration

Tailwind CSS is used for styling the application. The configuration file `tailwind.config.cjs` contains all the necessary settings, such as:

- Custom color palettes
- Font settings
- Plugins

You can extend Tailwind to suit your design needs by editing this file.

## Express Server

The backend server is built using Express. It is responsible for:

- Handling API requests.
- Rendering the frontend via SSR (Server-side Rendering).
- Serving static files in production.

## Check the `server` folder for server-related logic.

**Happy coding!**
