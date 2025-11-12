# DeFi Agent Hub

A production-ready Base Mini App for orchestrating cross-chain DeFi strategies and building verifiable agent reputation on Base + Solana via Farcaster.

## Features

- 🤖 **Verifiable Agent Profiles** - Track on-chain performance with Basenames
- 🔄 **Cross-Chain Strategies** - Execute DeFi strategies across Base and Solana
- ⚡ **Gas-Sponsored Transactions** - Seamless UX with sponsored Base transactions
- 🔔 **Social Notifications** - Real-time alerts via Farcaster
- 🌉 **Asset Bridging** - Secure cross-chain asset transfers

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (L2) + Solana
- **UI**: React 19, Tailwind CSS, Lucide Icons
- **Web3**: OnchainKit, Wagmi, Viem
- **Social**: Farcaster MiniKit SDK

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
│   ├── Providers.tsx   # OnchainKit & React Query providers
│   ├── Header.tsx      # App header with wallet connect
│   ├── AgentGrid.tsx   # DeFi agent cards
│   └── StrategyGrid.tsx # Strategy cards
├── page.tsx            # Main app page
├── layout.tsx          # Root layout
└── globals.css         # Global styles with Coinbase theme

public/
└── .well-known/
    └── farcaster.json  # Farcaster manifest
```

## Key Integrations

### OnchainKit
- Identity components for Basename resolution
- Wallet connection and management
- Transaction components with gas sponsorship
- Swap functionality for token exchanges

### MiniKit SDK
- `useMiniKit` - Access Farcaster user context
- `useSendNotification` - Push notifications to users
- `useAddFrame` - Save strategies/agents as Frames
- `sdk.actions.ready()` - Critical for app display

## Design System

The app uses the **Coinbase theme**:
- Dark navy background (#0a1929)
- Coinbase blue accents (#0052ff)
- Light text (#e3f2fd)
- Subtle rounded borders
- Glass morphism effects

## Deployment

1. Build the app:
```bash
npm run build
```

2. Deploy to Vercel or your preferred hosting
3. Configure Farcaster manifest at `/.well-known/farcaster.json`
4. Set up Paymaster for gas sponsorship

## License

MIT
