# Task Manager Frontend

A modern task management application built with React, TypeScript, and Vite.

## Features

- User authentication (login/register)
- Task management (CRUD operations)
- Task filtering and sorting
- Priority levels (High, Medium, Low)
- Task status tracking
- Responsive design
- Toast notifications
- Loading states

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios for API requests
- React Hot Toast for notifications
- Lucide React for icons

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn package manager
- Backend server running (see backend README here:  [https://github.com/FortuneUmubyeyi/TaskManager-BackEnd.git](https://github.com/FortuneUmubyeyi/TaskManager-BackEnd.git) )

## Installation

1. Clone the repository:
```bash
git clone https://github.com/FortuneUmubyeyi/TaskManager-FrontEnd
cd TaskManager-FrontEnd
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`


## Project Structure

```
src/
├── components/
│   └── AuthForm.tsx
├── services/
│   └── api.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```