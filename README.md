# DeFi Agent Hub

A Base Mini App for orchestrating cross-chain DeFi strategies across Base and Solana, with verifiable agent reputation built on Farcaster.

## Features

- 🤖 **Top DeFi Agents** - Follow and track performance of expert strategists
- 📊 **Cross-Chain Strategies** - Execute DeFi strategies across Base + Solana
- 🌉 **Asset Bridging** - Seamless cross-chain asset transfers
- ⚡ **Gas-Sponsored Transactions** - All Base transactions are gasless
- 🔔 **Social Notifications** - Real-time alerts via Farcaster
- 🎯 **Verifiable Reputation** - On-chain track records with Basenames

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Blockchain**: Base (L2) + Solana
- **UI**: React 19, Tailwind CSS, Lucide Icons
- **Web3**: OnchainKit, Wagmi, Viem
- **Social**: Farcaster Mini App SDK

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
# Add your OnchainKit API key and other credentials
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── components/          # React components
│   ├── Providers.tsx   # OnchainKit & Query providers
│   ├── ConnectWallet.tsx
│   ├── AgentCard.tsx
│   ├── StrategyCard.tsx
│   └── StatsCard.tsx
├── layout.tsx          # Root layout
├── page.tsx            # Home page
└── globals.css         # Global styles

public/
└── .well-known/
    └── farcaster.json  # Mini App manifest
```

## Key Integrations

### OnchainKit
- Wallet connection and management
- Identity resolution (Basenames)
- Transaction components with gas sponsorship
- Swap functionality for cross-chain operations

### Farcaster Mini App SDK
- User context and FID access
- Push notifications
- Frame composition and sharing
- Social primitives

### Base Network
- Gas-sponsored transactions via Paymaster
- Smart contract interactions
- Cross-chain bridging

## Design System

**Theme**: Coinbase (Dark Navy)
- Background: `#0a1929`
- Accent: `#0052ff` (Coinbase Blue)
- Surface: `#132f4c`
- Border: `rgba(0, 82, 255, 0.2)`

**Components**:
- Glass-effect cards with backdrop blur
- Smooth transitions (200-300ms)
- Rounded corners (6-16px)
- Glow effects on interactive elements

## Deployment

1. Build the app:
```bash
npm run build
```

2. Deploy to Vercel or your preferred hosting
3. Configure the Farcaster manifest at `/.well-known/farcaster.json`
4. Set up webhook endpoint for notifications

## License

MIT
