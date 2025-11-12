'use client';

import {
  ConnectWallet as OnchainKitConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import { Avatar, Name, Identity, Address } from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';

export function ConnectWallet() {
  return (
    <Wallet>
      <OnchainKitConnectWallet
        className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-theme-lg font-medium transition-all duration-200 glow-accent"
      />
      <WalletDropdown>
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
          <Avatar />
          <Name />
          <Address />
        </Identity>
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  );
}
