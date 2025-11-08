# DeFi Agent Hub

A Base Mini App for orchestrating cross-chain DeFi strategies across Base and Solana, with verifiable agent reputation and social primitives.

## Features

- 🤖 **DeFi Agents**: Follow top-performing strategists with verifiable on-chain track records
- ⚡ **Cross-Chain Strategies**: Execute DeFi strategies across Base and Solana
- 🌉 **Asset Bridging**: Seamlessly move assets between chains with gas sponsorship
- 🔔 **Social Notifications**: Real-time alerts for agent actions and performance milestones
- 💎 **Gas Sponsorship**: All Base transactions are gas-sponsored via Paymaster

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19
- **Blockchain**: Base (L2), Solana
- **OnchainKit**: Wallet, Identity, Transaction components
- **MiniKit**: Farcaster Mini App integration
- **Styling**: Tailwind CSS with Coinbase theme

## Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
```bash
cp .env.local.example .env.local
# Edit .env.local with your API keys
```

3. **Run development server**:
```bash
npm run dev
```

4. **Open in browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── Providers.tsx   # OnchainKit & Query providers
│   ├── Header.tsx      # App header with wallet
│   ├── Navigation.tsx  # Bottom navigation
│   ├── AgentCard.tsx   # Agent display component
│   └── StrategyCard.tsx # Strategy display component
├── agents/             # Agents browsing page
├── strategies/         # Strategies page
├── bridge/             # Cross-chain bridge
├── notifications/      # Notifications page
└── layout.tsx          # Root layout

lib/
├── types.ts            # TypeScript interfaces
└── mock-data.ts        # Mock data for development

public/
└── .well-known/
    └── farcaster.json  # Mini App manifest
```

## Key Features Implementation

### Gas Sponsorship
All Base transactions use the configured Paymaster for gas sponsorship, making DeFi accessible without gas fees.

### Cross-Chain Integration
- Base: OnchainKit components for wallet, transactions, identity
- Solana: Backend proxy for secure transaction handling
- Bridge: Wormhole/LayerZero integration for asset transfers

### Social Primitives
- Follow agents and strategies
- Real-time notifications via Farcaster
- Share successful executions as Frames
- Verifiable on-chain reputation

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: OnchainKit API key from Coinbase Developer Platform
- `NEXT_PUBLIC_BASE_RPC_URL`: Base mainnet RPC endpoint
- `NEXT_PUBLIC_PAYMASTER_URL`: Paymaster URL for gas sponsorship

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to your hosting platform (Vercel recommended)

3. Configure environment variables in your hosting platform

4. Ensure `.well-known/farcaster.json` is accessible at your domain

## License

MIT
