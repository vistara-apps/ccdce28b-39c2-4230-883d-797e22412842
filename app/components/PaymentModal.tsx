'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';
import { useX402Payment } from '@/lib/hooks/useX402Payment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientAddress?: string;
  amount?: string;
  description?: string;
}

export function PaymentModal({
  isOpen,
  onClose,
  recipientAddress = '',
  amount: initialAmount = '',
  description: initialDescription = '',
}: PaymentModalProps) {
  const { makePayment, status, reset, isConnected, address, balance, refreshBalance } = useX402Payment();
  
  const [recipient, setRecipient] = useState(recipientAddress);
  const [amount, setAmount] = useState(initialAmount);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    if (isOpen && isConnected) {
      refreshBalance();
    }
  }, [isOpen, isConnected, refreshBalance]);

  useEffect(() => {
    setRecipient(recipientAddress);
    setAmount(initialAmount);
    setDescription(initialDescription);
  }, [recipientAddress, initialAmount, initialDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !amount) {
      return;
    }

    await makePayment({
      amount,
      recipient,
      description,
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-theme-xl max-w-md w-full p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          disabled={status.isLoading || status.isPending}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Send USDC Payment</h2>

        {!isConnected ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Please connect your wallet to make a payment</p>
          </div>
        ) : (
          <>
            <div className="mb-4 p-3 bg-background rounded-lg">
              <div className="text-sm text-muted-foreground">Your Balance</div>
              <div className="text-lg font-semibold">{balance} USDC</div>
              <div className="text-xs text-muted-foreground mt-1">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
            </div>

            {status.isConfirmed ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                <p className="text-muted-foreground mb-4">Your payment has been confirmed</p>
                {status.transactionHash && (
                  <a
                    href={`https://basescan.org/tx/${status.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:underline"
                  >
                    View on BaseScan
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={handleClose}
                  className="mt-6 w-full px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-all duration-200"
                >
                  Close
                </button>
              </div>
            ) : status.error ? (
              <div className="text-center py-8">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Payment Failed</h3>
                <p className="text-red-500 mb-4">{status.error}</p>
                <button
                  onClick={reset}
                  className="w-full px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-all duration-200"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="recipient" className="block text-sm font-medium mb-2">
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    id="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="0x..."
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    disabled={status.isLoading || status.isPending}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium mb-2">
                    Amount (USDC)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    disabled={status.isLoading || status.isPending}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Payment for..."
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    disabled={status.isLoading || status.isPending}
                  />
                </div>

                {status.isPending && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Waiting for confirmation...</span>
                    </div>
                    {status.transactionHash && (
                      <a
                        href={`https://basescan.org/tx/${status.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline mt-2 inline-flex items-center gap-1"
                      >
                        View transaction
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.isLoading || status.isPending || !recipient || !amount}
                  className="w-full px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status.isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : status.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    'Send Payment'
                  )}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
