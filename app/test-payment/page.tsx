'use client';

import { useState } from 'react';
import { Header } from '../components/Header';
import { PaymentModal } from '../components/PaymentModal';
import { useX402Payment } from '@/lib/hooks/useX402Payment';
import { useAccount } from 'wagmi';
import { DollarSign, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function TestPaymentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isConnected, address, balance, refreshBalance } = useX402Payment();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">x402 Payment Flow Test</h1>
          <p className="text-muted-foreground mb-8">
            Test USDC payments on Base using wagmi + x402-axios
          </p>

          {/* Connection Status */}
          <div className="mb-8 p-6 bg-card border border-border rounded-theme-xl">
            <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="font-medium">
                  {isConnected ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              
              {isConnected && address && (
                <>
                  <div>
                    <span className="text-muted-foreground text-sm">Address:</span>
                    <div className="font-mono text-sm mt-1">
                      {address}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground text-sm">USDC Balance:</span>
                    <div className="font-semibold text-lg mt-1">
                      {balance} USDC
                    </div>
                    <button
                      onClick={refreshBalance}
                      className="text-sm text-accent hover:underline mt-1"
                    >
                      Refresh Balance
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Payment Features */}
          <div className="mb-8 p-6 bg-card border border-border rounded-theme-xl">
            <h2 className="text-xl font-semibold mb-4">✅ Implemented Features</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>wagmi useWalletClient integration</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>x402-axios payment client setup</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>USDC on Base (0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Transaction confirmation handling</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Comprehensive error handling</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Payment status tracking (loading, pending, confirmed)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Balance checking and refresh</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Transaction explorer links (BaseScan)</span>
              </li>
            </ul>
          </div>

          {/* Test Payment Button */}
          <div className="mb-8 p-6 bg-card border border-border rounded-theme-xl">
            <h2 className="text-xl font-semibold mb-4">Test Payment</h2>
            <p className="text-muted-foreground mb-4">
              {isConnected
                ? 'Click the button below to open the payment modal and test the full payment flow.'
                : 'Please connect your wallet using the button in the header to test payments.'}
            </p>
            
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={!isConnected}
              className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-theme-lg font-medium transition-all duration-200 glow-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <DollarSign className="w-5 h-5" />
              Open Payment Modal
            </button>
          </div>

          {/* Technical Details */}
          <div className="p-6 bg-card border border-border rounded-theme-xl">
            <h2 className="text-xl font-semibold mb-4">Technical Implementation</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Files Created:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li><code className="text-xs bg-background px-1 py-0.5 rounded">lib/wagmi.ts</code> - Wagmi configuration</li>
                  <li><code className="text-xs bg-background px-1 py-0.5 rounded">lib/x402-payment.ts</code> - x402 payment utilities</li>
                  <li><code className="text-xs bg-background px-1 py-0.5 rounded">lib/hooks/useX402Payment.ts</code> - Payment hook</li>
                  <li><code className="text-xs bg-background px-1 py-0.5 rounded">app/components/PaymentModal.tsx</code> - Payment UI</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Uses wagmi's <code className="text-xs bg-background px-1 py-0.5 rounded">useWalletClient</code> hook</li>
                  <li>Integrates x402-axios for payment processing</li>
                  <li>Handles transaction lifecycle states</li>
                  <li>Real-time balance updates</li>
                  <li>Transaction confirmation with configurable confirmations</li>
                  <li>Comprehensive error handling and user feedback</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
