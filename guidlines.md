# AI Enterprise Dashboard — Cursor Development Guide

## Project Overview

We are building a modern AI Enterprise Dashboard using:

- Vite
- React
- JavaScript (NOT TypeScript)
- Tailwind CSS
- shadcn/ui
- React Router
- Lucide React icons

IMPORTANT:
- This phase is ONLY frontend/UI.
- No backend yet.
- No API integration yet.
- Use mock data everywhere.
- Create clean reusable components.
- Make everything production-ready from a frontend architecture perspective.

---

# General UI Style

The design should feel like a mix of:
- ChatGPT
- Notion
- Slack
- Linear
- Vercel

Style requirements:
- Minimal
- Modern
- Clean spacing
- Rounded corners
- Soft borders
- Beautiful hover states
- Smooth transitions
- Dark mode first
- Professional AI SaaS look

Use:
- `bg-background`
- `text-foreground`
- `border-border`
- Tailwind utility classes
- shadcn components whenever possible

Avoid:
- Bright random colors
- Heavy gradients everywhere
- Cluttered layouts
- Oversized cards
- Old admin dashboard style

---

# Tech Stack

Install and use:

- react-router-dom
- lucide-react
- class-variance-authority
- clsx
- tailwind-merge

Use shadcn/ui components extensively.

---

# Folder Structure

Use this structure:

src/
│
├── components/
│   ├── layout/
│   ├── sidebar/
│   ├── topbar/
│   ├── chat/
│   ├── tasks/
│   ├── projects/
│   ├── messages/
│   ├── documents/
│   ├── dashboard/
│   └── ui/
│
├── pages/
│   ├── auth/
│   ├── dashboard/
│   ├── ai-chat/
│   ├── messages/
│   ├── tasks/
│   ├── projects/
│   └── documents/
│
├── layouts/
│
├── routes/
│
├── data/
│
├── hooks/
│
├── lib/
│
├── assets/
│
├── App.jsx
│
└── main.jsx

---

# Application Pages

Create these pages:

1. Login Page
2. Dashboard Overview
3. AI Chat
4. Messages
5. Tasks
6. Projects
7. Documents

---

# Login Page

Create a modern login screen.

Layout:
- Split screen
- Left side:
  - Branding
  - AI illustration/glow
  - Short slogan
- Right side:
  - Login card
  - Email input
  - Password input
  - Remember me
  - Login button
  - Google login button
  - Forgot password
  - Smooth animations

Use:
- Card
- Input
- Button
- Separator

Style:
- Elegant dark background
- Glass effect optional
- AI startup feeling

---

# Main Dashboard Layout

After login:
- Persistent sidebar
- Top navbar
- Main content area

Responsive behavior:
- Desktop sidebar fixed
- Mobile sidebar drawer/sheet

---

# Sidebar

Sidebar should contain:

- Logo
- Workspace switcher
- Navigation links
- User profile at bottom

Navigation:
- Overview
- AI Chat
- Messages
- Tasks
- Projects
- Documents

Use:
- Lucide icons
- Active route highlight
- Tooltips
- Hover animations

---

# Top Navbar

Navbar should include:
- Search bar
- Notifications button
- Theme toggle
- User avatar dropdown

Optional:
- Breadcrumbs
- Workspace name

---

# Overview Page

This is the home dashboard.

Sections:
- Welcome header
- AI usage stats
- Recent activity
- Recent projects
- Recent tasks
- AI agents cards
- Quick actions

Use:
- Cards
- Charts placeholders
- Progress bars
- Activity feed
- Grid layouts

Create:
- Beautiful responsive card layouts

---

# AI Chat Page

MOST IMPORTANT PAGE.

This page should look inspired by ChatGPT and modern AI agent interfaces.

Layout:
- Left mini sidebar:
  - Chat history
  - New chat button
  - Agent list

Main section:
- Chat messages
- AI responses
- User messages
- Streaming-like UI effect
- Typing animation placeholder

Bottom:
- AI input area
- Attachment button
- Voice button
- Send button

Top:
- Current AI agent
- Model selector
- Chat settings

Use shadcn components heavily.

Add:
- Beautiful empty state
- Suggested prompts
- AI cards
- Animated hover effects

Create reusable:
- ChatBubble
- ChatInput
- ChatSidebar
- SuggestedPromptCard
- AIModelSelector

---

# Messages Page (Slack Style)

Create a Slack-inspired messaging UI.

Layout:
- Channels sidebar
- Conversations list
- Main chat window
- Online users section

Features:
- Channel cards
- Message bubbles
- Timestamp UI
- Typing placeholder
- Thread button placeholders

Use:
- ScrollArea
- Avatar
- Separator
- Badge

---

# Tasks Page (Notion Style)

Create a clean task management interface.

Features:
- Kanban board
- Task cards
- Priority badges
- Assignees
- Due dates
- Filters
- Search bar

Columns:
- Todo
- In Progress
- Review
- Done

Task card:
- Title
- Description
- Tags
- Team members
- Progress

Use drag-and-drop placeholders visually only.

---

# Projects Page (Notion Style)

Create a modern project workspace page.

Features:
- Projects grid
- Project cards
- Project detail page UI
- Sidebar navigation
- Team members
- Progress tracking
- Recent updates

Project card should contain:
- Name
- Description
- Progress bar
- Team avatars
- Last updated

Use:
- Nested layouts
- Rich cards
- Notion-inspired spacing

---

# Documents Page (RAG Ready)

This page is for future AI document indexing.

Features:
- Upload area UI
- Documents table
- File cards
- Search documents
- Categories
- Status indicators

Document card:
- File icon
- Name
- Upload date
- Size
- Status

Statuses:
- Indexed
- Processing
- Failed

Create:
- Drag and drop upload UI
- Empty states
- File preview placeholders

No backend yet.

---

# Reusable Components

Create reusable components for:

- PageHeader
- SectionHeader
- DashboardCard
- EmptyState
- AppSidebar
- AppNavbar
- SearchInput
- UserDropdown
- StatCard
- ChatBubble
- MessageBubble
- TaskCard
- ProjectCard
- DocumentCard

---

# Routing

Use React Router.

Routes:
- /login
- /
- /ai-chat
- /messages
- /tasks
- /projects
- /documents

Create:
- DashboardLayout
- AuthLayout

---

# Mock Data

Create mock data files:
- chats.js
- tasks.js
- projects.js
- messages.js
- documents.js

Use realistic enterprise AI data.

---

# UI/UX Rules

VERY IMPORTANT:

- Consistent spacing everywhere
- Use gap utilities
- Responsive design first
- Avoid cramped layouts
- Use loading skeletons
- Beautiful empty states
- Smooth transitions
- Consistent card padding
- Keep typography hierarchy clean

---

# Animations

Use subtle animations only.

Examples:
- Hover lift
- Fade transitions
- Sidebar animations
- Button hover states
- Smooth modal appearance

Do NOT overdo animations.

---

# shadcn/ui Components To Use

Use as many as relevant:
- Button
- Card
- Input
- Textarea
- Dropdown Menu
- Dialog
- Sheet
- Tabs
- Avatar
- Badge
- Separator
- Scroll Area
- Tooltip
- Skeleton
- Table
- Progress
- Command
- Popover

---

# Design Consistency

Everything should feel:
- Enterprise-grade
- Premium
- AI-native
- Minimal
- Clean
- Modern

The entire app should feel like a real funded AI startup dashboard.

---

# Important Development Rules

- Use JavaScript only
- Do NOT use TypeScript
- Create reusable components
- Keep files clean
- Avoid massive components
- Split UI into sections
- Use semantic naming
- Make layouts responsive
- Keep future backend integration easy

---

# Final Goal

The final result should look like a real AI enterprise SaaS product that combines:
- ChatGPT
- Slack
- Notion
- Linear

with a clean modern AI-first experience.