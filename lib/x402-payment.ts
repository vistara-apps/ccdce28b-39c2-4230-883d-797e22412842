'use client';

import axios from 'axios';
import { withPaymentInterceptor, createSigner } from 'x402-axios';
import type { WalletClient } from 'viem';

export const USDC_BASE_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

export interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  paymentResponse?: string;
  error?: string;
}

export interface PaymentRequest {
  amount: string; // Amount in USDC (e.g., "10" for 10 USDC)
  recipient: string;
  description?: string;
}

/**
 * Creates an x402-enabled axios client for payments
 * 
 * The client automatically handles 402 Payment Required responses by:
 * 1. Extracting payment requirements
 * 2. Creating payment authorization using the wallet
 * 3. Retrying the request with payment headers
 * 
 * Note: The WalletClient from viem/wagmi is compatible with x402's Signer type
 */
export function createX402AxiosClient(walletClient: WalletClient) {
  const axiosClient = axios.create({
    timeout: 30000,
  });
  
  // The WalletClient from viem/wagmi is directly compatible with x402's Signer type
  return withPaymentInterceptor(axiosClient, walletClient as any);
}

/**
 * Executes a USDC payment on Base using x402
 * 
 * This demonstrates the x402 flow by making a request to a 402-protected endpoint.
 * In a real implementation, you would call your actual payment API endpoint.
 */
export async function executePayment(
  walletClient: WalletClient,
  request: PaymentRequest
): Promise<PaymentResult> {
  try {
    if (!walletClient || !walletClient.account) {
      throw new Error('Wallet not connected');
    }

    // Create x402-enabled axios client
    const client = createX402AxiosClient(walletClient);

    // In a real implementation, this would be your 402-protected API endpoint
    // For demonstration, we'll show how to structure the request
    const paymentData = {
      amount: request.amount,
      recipient: request.recipient,
      description: request.description,
      token: USDC_BASE_ADDRESS,
      chain: 'base',
    };

    // Make request - x402 interceptor will handle 402 responses automatically
    const response = await client.post('/api/payment', paymentData);

    // Extract payment response header if present
    const paymentResponse = response.headers['x-payment-response'];

    return {
      success: true,
      transactionHash: response.data.transactionHash,
      paymentResponse,
    };
  } catch (error: any) {
    console.error('Payment failed:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Payment failed',
    };
  }
}

/**
 * Waits for transaction confirmation
 */
export async function waitForConfirmation(
  transactionHash: string,
  confirmations: number = 1
): Promise<boolean> {
  try {
    // Import viem's public client to check transaction status
    const { createPublicClient, http } = await import('viem');
    const { base } = await import('viem/chains');

    const publicClient = createPublicClient({
      chain: base,
      transport: http(),
    });

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: transactionHash as `0x${string}`,
      confirmations,
    });

    return receipt.status === 'success';
  } catch (error) {
    console.error('Transaction confirmation failed:', error);
    return false;
  }
}

/**
 * Gets USDC balance for an address
 */
export async function getUSDCBalance(address: string): Promise<string> {
  try {
    const { createPublicClient, http } = await import('viem');
    const { base } = await import('viem/chains');
    const { erc20Abi } = await import('viem');

    const publicClient = createPublicClient({
      chain: base,
      transport: http(),
    });

    const balance = await publicClient.readContract({
      address: USDC_BASE_ADDRESS,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address as `0x${string}`],
    });

    // Convert from smallest unit (6 decimals) to USDC
    return (Number(balance) / 1e6).toFixed(2);
  } catch (error) {
    console.error('Failed to get USDC balance:', error);
    return '0.00';
  }
}
