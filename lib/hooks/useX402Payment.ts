'use client';

import { useState, useCallback } from 'react';
import { useWalletClient, useAccount } from 'wagmi';
import {
  executePayment,
  waitForConfirmation,
  getUSDCBalance,
  type PaymentRequest,
  type PaymentResult,
} from '../x402-payment';

export interface PaymentStatus {
  isLoading: boolean;
  isPending: boolean;
  isConfirmed: boolean;
  error: string | null;
  transactionHash?: string;
}

export function useX402Payment() {
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  
  const [status, setStatus] = useState<PaymentStatus>({
    isLoading: false,
    isPending: false,
    isConfirmed: false,
    error: null,
  });

  const [balance, setBalance] = useState<string>('0.00');

  const refreshBalance = useCallback(async () => {
    if (address) {
      const newBalance = await getUSDCBalance(address);
      setBalance(newBalance);
    }
  }, [address]);

  const makePayment = useCallback(
    async (request: PaymentRequest): Promise<PaymentResult> => {
      if (!walletClient) {
        const error = 'Wallet not connected';
        setStatus({
          isLoading: false,
          isPending: false,
          isConfirmed: false,
          error,
        });
        return { success: false, error };
      }

      try {
        setStatus({
          isLoading: true,
          isPending: false,
          isConfirmed: false,
          error: null,
        });

        // Execute payment
        const result = await executePayment(walletClient, request);

        if (!result.success) {
          setStatus({
            isLoading: false,
            isPending: false,
            isConfirmed: false,
            error: result.error || 'Payment failed',
          });
          return result;
        }

        // Payment transaction submitted
        setStatus({
          isLoading: false,
          isPending: true,
          isConfirmed: false,
          error: null,
          transactionHash: result.transactionHash,
        });

        // Wait for confirmation
        if (result.transactionHash) {
          const confirmed = await waitForConfirmation(result.transactionHash, 1);

          setStatus({
            isLoading: false,
            isPending: false,
            isConfirmed: confirmed,
            error: confirmed ? null : 'Transaction confirmation failed',
            transactionHash: result.transactionHash,
          });

          // Refresh balance after successful payment
          if (confirmed) {
            await refreshBalance();
          }
        }

        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setStatus({
          isLoading: false,
          isPending: false,
          isConfirmed: false,
          error: errorMessage,
        });
        return { success: false, error: errorMessage };
      }
    },
    [walletClient, refreshBalance]
  );

  const reset = useCallback(() => {
    setStatus({
      isLoading: false,
      isPending: false,
      isConfirmed: false,
      error: null,
    });
  }, []);

  return {
    makePayment,
    status,
    reset,
    isConnected,
    address,
    balance,
    refreshBalance,
  };
}
