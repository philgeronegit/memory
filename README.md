# Memory

## Overview

The Memory project is a note-taking application that allows users to create notes, tag them, and add comments.

The primary goal is to facilitate the sharing of information, ideas, technical issues, and suggestions in a centralized and structured manner. The software enables each developer to leave notes for other team members, whether to report a problem, share a tip, or seek advice.

## Key Features

### Note Creation and Sharing:

Developers can create notes in text, image, or code formats.
Notes can be shared with specific developers or the entire team.

### lassification and Tagging

Notes can be categorized by project, programming language, or issue type.
Tags can be added to enhance searchability (e.g., "bug," "optimization," "documentation").

### Advanced Search

An advanced search function allows quick retrieval of specific notes based on keywords, projects, or contributors.
Comments and Discussions:

Team members can comment on notes to initiate discussions or propose solutions.
A threaded discussion system keeps exchanges organized.

### Contributor Profiles

Contributors can detail their profiles, including technical skills.
Skills help in better assigning developers to projects or bug resolutions.

### Customizable Dashboard

Each developer has a personalized dashboard displaying:

- Recent notes
- Assigned tasks
- Active projects
- List of contributors with shared projects
- Ongoing discussions

## Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
