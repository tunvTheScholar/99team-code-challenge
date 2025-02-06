import { useMemo } from "react";

// Types
type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
  blockchain: Blockchain;
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}

interface WalletRowProps {
  className?: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

interface BoxProps {}

interface Props extends BoxProps {
  className?: string;
}

// Constants
const BLOCKCHAIN_PRIORITY: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
} as const;

// Use enum or const to make the significance clear
const enum PriorityValues {
  DEFAULT = 0,
  UNSUPPORTED = -1,
}

// Utility functions
const getBlockchainPriority = (blockchain: Blockchain): number => {
  return BLOCKCHAIN_PRIORITY[blockchain] ?? PriorityValues.UNSUPPORTED;
};

const formatBalance = (
  balance: WalletBalance,
  price: number
): FormattedWalletBalance => ({
  ...balance,
  formatted: balance.amount.toFixed(),
  usdValue: price * balance.amount,
});

// Component
const WalletPage: React.FC<Props> = ({ className, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances = useMemo(() => {
    return balances
      .filter((balance) => {
        const priority = getBlockchainPriority(balance.blockchain);
        // Only include supported blockchains with positive balances
        return priority !== PriorityValues.UNSUPPORTED && balance.amount > 0;
      })
      .sort((a, b) => {
        const priorityA = getBlockchainPriority(a.blockchain);
        const priorityB = getBlockchainPriority(b.blockchain);

        if (priorityA !== priorityB) {
          return priorityB - priorityA; // Higher priority first
        }
        // Secondary sort by amount
        return b.amount - a.amount;
      })
      .map((balance) => formatBalance(balance, prices[balance.currency]));
  }, [balances, prices]);

  if (!balances.length) {
    return <div className={className}>No balances found</div>;
  }

  return (
    <div className={className} {...rest}>
      {formattedBalances.map((balance) => (
        <WalletRow
          key={`${balance.blockchain}-${balance.currency}`}
          className={classes.row}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};

export default WalletPage;

const useWalletBalances = (): WalletBalance[] => [];
const usePrices = () => [];
