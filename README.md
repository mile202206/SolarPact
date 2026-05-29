# SolarPact ⚡🌐

> A decentralized solar energy marketplace built on blockchain — connecting solar energy producers and consumers through smart contracts.

## Overview

SolarPact is a **DePIN (Decentralized Physical Infrastructure Network)** project that creates a peer-to-peer marketplace for solar energy trading. By leveraging blockchain technology, SolarPact enables transparent, efficient, and trustless energy transactions between producers and consumers.

## Features

- **Energy Marketplace** — Browse and trade solar energy credits in a decentralized marketplace
- **Smart Contract Bidding** — Create energy needs and receive competitive bids from producers
- **Growth Tracking** — Monitor your energy portfolio and sustainability metrics
- **Leaderboard** — See top energy producers and contributors in the network
- **Multi-language** — Full Chinese and English support
- **Wallet Authentication** — Connect your Web3 wallet to get started

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React + TypeScript | Frontend framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| shadcn/ui | UI component library |
| Solidity | Smart contracts |
| Wagmi / ConnectKit | Web3 wallet integration |
| React Router | Client-side routing |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation

```ash
# Clone the repository
git clone https://github.com/mile202206/SolarPact.git
cd SolarPact

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui components
│   ├── AuthModal.tsx
│   ├── Navbar.tsx
│   ├── PlanetSystem.tsx
│   └── SplashScreen.tsx
├── contexts/        # React contexts (Auth, Language)
├── pages/           # Application pages
│   ├── Landing.tsx      # Home page
│   ├── Marketplace.tsx  # Energy marketplace
│   ├── CreateNeed.tsx   # Post energy needs
│   ├── BidPage.tsx      # Place bids
│   ├── Growth.tsx       # Growth dashboard
│   ├── Leaderboard.tsx  # Rankings
│   └── Profile.tsx      # User profile
├── hooks/           # Custom React hooks
└── lib/             # Utility functions
```

## Screenshots

> Landing page with animated solar system visualization and energy marketplace interface.

## About

Built with passion for sustainable energy and decentralized technology. SolarPact aims to make solar energy accessible to everyone through the power of blockchain.

## License

MIT