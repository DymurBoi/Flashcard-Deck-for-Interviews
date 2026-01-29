# Flashcard Deck for Interviews

## Features

### Core Functionalities
- **Card Management**: Create, update, and delete cards
- **Deck Management**: Create a deck to sort topics for your flashcards
- **Card Flip**: Click the card to flip and see either the question or answer
- **Mastered Question**: Be able to mark a question as mastered

### Key Components:
- **Decks**: A way to sort cards based on the topic
- **Cards**: Display the question on the front and answer at the back

## Technology Stack
- **Backend**: Node.js, Express.js (v5.2.1)
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma (v7)
- **Frontend**: React + Vite

## Installation

### Prerequisites
- Node.js v20.19.0 or higher (Required for Prisma v7)
- PostgreSQL database (Supabase account or local instance)
- npm or yarn package manager

### Setup Steps

1. Clone the repository
```bash
git clone https://github.com/DymurBoi/Flashcard-Deck-for-Interviews.git
cd Flashcard-Deck-for-Interviews
```

2. Install dependencies for backend
``` bash
cd backend
npm install
```

3. Configure environment variables:
Create a `.env` file in the backend directory containing:
DATABASE_URL = [Session Pooler from your Supabase DB]
DIRECT_URL = [Transaction Pooler from your Supabase DB]

4. Database Migration
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Start the server
```bash
npm run dev
```

6. Install dependencies and run frontend
```bash
cd ..
cd flashcard-deck
npm install
npm run dev
```

## Database Schema

### Tables
- `deck` - Deck with title and description
- `cards` - Card with question, answer, isMastered, and Many to One relationship with deck
