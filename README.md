# ระบบจองตั๋วรถโดยสาร WebPro

**ระบบนี้เป็นส่วนหนึ่งของรายวิชา Fundamental Web Programming**

## Overview

**ระบบจองตั๋วรถโดยสาร WebPro** เป็นแอปพลิเคชันเว็บที่สร้างขึ้นโดยใช้เทคโนโลยีเว็บสมัยใหม่ เช่น **Svelte**, **Vite**, **Tailwind CSS** และ **Express** ออกแบบมาเพื่อจัดการและปรับปรุงการจองตั๋วรถโดยสารสำหรับผู้ใช้ โดยมีอินเตอร์เฟซที่รวดเร็ว ตอบสนองได้ดี และใช้งานง่าย

โปรเจคนี้ใช้ Svelte เป็นเฟรมเวิร์คฝั่งฟรอนต์เอนด์, Vite สำหรับการสร้างและโหลดซ้ำอย่างรวดเร็วในระหว่างการพัฒนา, Tailwind CSS สำหรับการจัดสไตล์แบบ utility-first และ Express สำหรับจัดการตรรกะและการจัดเส้นทางฝั่งเซิร์ฟเวอร์

## Technologies Used

- **[Svelte](https://svelte.dev/):** เฟรมเวิร์คคอมโพเนนต์สำหรับสร้าง UI ที่รวดเร็วและตอบสนองได้ดี
- **[Vite](https://vitejs.dev/):** เครื่องมือฟรอนต์เอนด์รุ่นใหม่สำหรับสร้างแอปพลิเคชันเว็บที่รวดเร็วและมีประสิทธิภาพ
- **[Tailwind CSS](https://tailwindcss.com/):** เฟรมเวิร์ค CSS แบบ utility-first สำหรับสร้างการออกแบบที่ปรับแต่งได้
- **[Express](https://expressjs.com/):** เฟรมเวิร์คแอปพลิเคชันเว็บ Node.js ที่มีความยืดหยุ่นและใช้งานง่าย สำหรับบริการฝั่งแบ็คเอนด์

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

---

### จัดทำโดย

- นายชวัล แซ่ยาง - 66070043
- นายธนดล ดรุณศรี - 66070073
- นางสาวพิมพ์มาดา จิระวัธน์ - 66070135
- นางสาววิมลสิริ ปานมา - 66070187

### อาจารย์ประจำวิชา

- ผศ.ดร.มานพ พันธ์โคกกรวด
