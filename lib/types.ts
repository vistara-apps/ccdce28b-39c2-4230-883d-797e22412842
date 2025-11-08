export interface User {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
  custodyAddress: string;
  connectedWalletAddress?: string;
  linkedSolanaAddress?: string;
}

export interface DeFiAgent {
  fid: number;
  basename?: string;
  displayName: string;
  pfpUrl: string;
  performanceMetrics: {
    totalReturn: number;
    winRate: number;
    avgAPY: number;
    strategiesCreated: number;
  };
  solanaPortfolioValue: number;
  basePortfolioValue: number;
  earnings: number;
  rating: number;
  followers: number;
  isFollowing?: boolean;
}

export interface Strategy {
  strategyID: string;
  name: string;
  description: string;
  targetChain: 'Base' | 'Solana' | 'Both';
  protocolIntegrations: string[];
  riskScore: number;
  currentAPY: number;
  historicalPerformance: number;
  creatorFID: number;
  creatorName: string;
  creatorAvatar: string;
  tvl: number;
  executionCount: number;
}

export interface StrategyExecution {
  executionID: string;
  strategyID: string;
  userFID: number;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
  profitLoss: number;
  transactionHashes: {
    base?: string;
    solana?: string;
  };
  gasSponsored: boolean;
}

export type NotificationType = 'AgentAction' | 'StrategyUpdate' | 'PerformanceMilestone' | 'BridgeComplete';

export interface Notification {
  notificationID: string;
  recipientFID: number;
  type: NotificationType;
  message: string;
  timestamp: number;
  readStatus: boolean;
  actionableUrl?: string;
}
