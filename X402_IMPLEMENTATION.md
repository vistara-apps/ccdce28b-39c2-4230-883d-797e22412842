# x402 Payment Flow Implementation

This document describes the implementation of the x402 payment protocol for USDC payments on Base in the DeFi Agent Hub.

## Overview

The x402 payment protocol enables automated micropayments for API access. When an API returns a `402 Payment Required` response, the client automatically:
1. Extracts payment requirements from the response
2. Creates a payment authorization using the connected wallet
3. Retries the request with payment headers
4. Processes the transaction confirmation

## Implementation Details

### Core Components

#### 1. **Wagmi Configuration** (`lib/wagmi.ts`)
- Configures wagmi with Base chain
- Sets up Coinbase Wallet as the connector with Smart Wallet support
- Provides wallet client for signing transactions

```typescript
export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: 'DeFi Agent Hub',
      preference: 'smartWalletOnly',
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});
```

#### 2. **x402 Payment Client** (`lib/x402-payment.ts`)
Core utilities for x402 payment processing:

- **`createX402AxiosClient(walletClient)`**: Creates an axios instance with x402 interceptor
- **`executePayment(walletClient, request)`**: Executes a USDC payment via x402 protocol
- **`waitForConfirmation(transactionHash, confirmations)`**: Waits for transaction confirmation
- **`getUSDCBalance(address)`**: Retrieves USDC balance for an address

**Key Features:**
- Automatic 402 response handling
- USDC token support on Base (address: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)
- Transaction status tracking
- Comprehensive error handling

#### 3. **Payment Hook** (`lib/hooks/useX402Payment.ts`)
React hook for payment operations:

```typescript
const {
  makePayment,    // Execute payment function
  status,         // Payment status (loading, pending, confirmed, error)
  reset,          // Reset payment state
  isConnected,    // Wallet connection status
  address,        // Connected wallet address
  balance,        // USDC balance
  refreshBalance, // Refresh balance function
} = useX402Payment();
```

**Status Tracking:**
- `isLoading`: Payment transaction being prepared
- `isPending`: Transaction submitted, awaiting confirmation
- `isConfirmed`: Transaction confirmed on-chain
- `error`: Error message if payment failed

#### 4. **Payment UI Component** (`app/components/PaymentModal.tsx`)
Modal component for payment interface:

**Features:**
- Wallet connection check
- Balance display
- Payment form (recipient, amount, description)
- Real-time status updates
- Transaction confirmation UI
- BaseScan explorer links
- Error handling and retry logic

#### 5. **Provider Setup** (`app/components/Providers.tsx`)
Application-level providers:

```typescript
<WagmiProvider config={wagmiConfig}>
  <QueryClientProvider client={queryClient}>
    <OnchainKitProvider chain={base}>
      {children}
    </OnchainKitProvider>
  </QueryClientProvider>
</WagmiProvider>
```

#### 6. **Wallet Connection** (`app/components/ConnectWallet.tsx`)
OnchainKit wallet components:
- ConnectWallet button
- Wallet dropdown with identity
- Address display and copy
- Disconnect functionality

### Test Page

**Location:** `/app/test-payment/page.tsx`

A comprehensive test page demonstrating all implemented features:

**Sections:**
1. **Connection Status** - Shows wallet connection state and USDC balance
2. **Implemented Features** - Checklist of completed requirements
3. **Test Payment** - Button to open payment modal
4. **Technical Implementation** - Documentation of files and features

**Access:** Navigate to `/test-payment` to test the payment flow

## Technology Stack

- **x402-axios** (v0.7.0): x402 payment protocol client
- **wagmi** (v2.14.11): React hooks for Ethereum
- **viem** (v2.27.2): TypeScript interface for Ethereum
- **@coinbase/onchainkit** (v0.38.19): Coinbase's React component library
- **Next.js** (v15.3.3): React framework

## Payment Flow

### 1. User Initiates Payment
```typescript
await makePayment({
  amount: "10",           // 10 USDC
  recipient: "0x...",     // Recipient address
  description: "Payment for service"
});
```

### 2. x402 Client Handles Request
- Creates axios client with payment interceptor
- Makes request to 402-protected endpoint
- Interceptor detects 402 response
- Extracts payment requirements

### 3. Payment Authorization
- Creates payment header using wallet signature
- Includes payment proof in retry request
- Wallet signs transaction authorization

### 4. Transaction Confirmation
- Monitors transaction status
- Waits for on-chain confirmation
- Updates UI with success/failure
- Refreshes USDC balance

## Error Handling

The implementation handles multiple error scenarios:

1. **Wallet Not Connected**
   - Detects missing wallet connection
   - Prompts user to connect wallet

2. **Insufficient Balance**
   - Validates USDC balance before payment
   - Shows clear error message

3. **Transaction Failures**
   - Catches transaction errors
   - Displays user-friendly error messages
   - Provides retry functionality

4. **Network Issues**
   - Handles RPC failures
   - Implements timeout protection
   - Shows network error states

5. **Confirmation Failures**
   - Monitors transaction confirmation
   - Handles dropped transactions
   - Updates status appropriately

## Testing Checklist

✅ **Wagmi Integration**
- [x] useWalletClient hook configured
- [x] Base chain setup
- [x] Coinbase Wallet connector
- [x] Wallet connection/disconnection

✅ **x402-axios Integration**
- [x] axios client with payment interceptor
- [x] Signer creation from WalletClient
- [x] 402 response handling
- [x] Payment header generation

✅ **USDC on Base**
- [x] USDC contract address configured
- [x] Balance checking functionality
- [x] Amount formatting (6 decimals)
- [x] Balance refresh after payment

✅ **Transaction Confirmation**
- [x] Transaction hash tracking
- [x] Confirmation wait functionality
- [x] Status updates (pending → confirmed)
- [x] Block explorer links

✅ **Error Handling**
- [x] Wallet connection errors
- [x] Transaction failures
- [x] Network errors
- [x] User-friendly error messages
- [x] Retry functionality

## File Structure

```
/workspace
├── lib/
│   ├── wagmi.ts                    # Wagmi configuration
│   ├── x402-payment.ts             # x402 payment utilities
│   ├── hooks/
│   │   ├── useX402Payment.ts       # Payment hook
│   │   └── index.ts                # Hook exports
│   └── types.ts                    # TypeScript types
├── app/
│   ├── components/
│   │   ├── Providers.tsx           # App providers (Wagmi, OnchainKit)
│   │   ├── ConnectWallet.tsx       # Wallet connection UI
│   │   └── PaymentModal.tsx        # Payment modal component
│   └── test-payment/
│       └── page.tsx                # Test page for payment flow
└── X402_IMPLEMENTATION.md          # This file
```

## Usage Examples

### Basic Payment
```typescript
import { useX402Payment } from '@/lib/hooks/useX402Payment';

function PaymentComponent() {
  const { makePayment, status } = useX402Payment();

  const handlePay = async () => {
    const result = await makePayment({
      amount: "5",
      recipient: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      description: "Service payment"
    });

    if (result.success) {
      console.log('Payment successful:', result.transactionHash);
    }
  };

  return (
    <button onClick={handlePay} disabled={status.isLoading}>
      {status.isLoading ? 'Processing...' : 'Pay Now'}
    </button>
  );
}
```

### With Balance Check
```typescript
const { makePayment, balance, refreshBalance, address } = useX402Payment();

useEffect(() => {
  if (address) {
    refreshBalance();
  }
}, [address, refreshBalance]);

console.log(`Current balance: ${balance} USDC`);
```

### Full Modal Integration
```typescript
import { PaymentModal } from '@/app/components/PaymentModal';

<PaymentModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  recipientAddress="0x..."
  amount="10"
  description="Premium API access"
/>
```

## Environment Variables

No additional environment variables are required for x402 functionality. The system uses:
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: OnchainKit API key (optional, falls back to demo key)

## Next Steps

To integrate x402 payments into your API endpoints:

1. **Server-Side Setup**
   - Implement 402 response with payment requirements
   - Validate payment headers
   - Process payment confirmations

2. **Client-Side Usage**
   - Use `createX402AxiosClient` for API calls
   - Handle payment flow automatically
   - Display payment status to users

3. **Production Considerations**
   - Configure proper API endpoints
   - Set up payment validation
   - Implement rate limiting
   - Add transaction monitoring
   - Set up error alerting

## Security Considerations

- ✅ Private keys never exposed (handled by wallet)
- ✅ Transactions signed in wallet (user approval required)
- ✅ Amount validation before submission
- ✅ Transaction confirmation verification
- ✅ Error handling prevents sensitive data leaks
- ✅ HTTPS required for production use

## Support

For issues or questions:
- Check the test page at `/test-payment`
- Review transaction on [BaseScan](https://basescan.org)
- Consult [x402 documentation](https://github.com/coinbase/x402)
- Review [wagmi documentation](https://wagmi.sh)

---

**Implementation Date:** 2025-11-12  
**Status:** ✅ Complete and Tested  
**USDC Contract (Base):** `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
