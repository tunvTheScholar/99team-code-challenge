import { Avatar, Select, SelectProps, Space } from "antd";
import { useMemo } from "react";
import { TPrice, usePrices } from "../../hooks/use-prices";

interface SelectCurrencyProps extends SelectProps {}
export default function SelectCurrency(props: SelectCurrencyProps) {
  // assume this is fetching price in realtime
  const prices = usePrices();

  const priceOptions = useMemo(() => {
    const uniquePrices = Object.values(
      prices.reduce((acc, item) => {
        const hasItem = acc.find(({ currency }) => currency === item.currency);
        if (!hasItem) {
          acc.push(item);
          return acc;
        }

        return acc;
      }, [] as TPrice[])
    );

    return uniquePrices.map(({ currency }) => ({
      label: currency,
      value: currency,
      iconUrl: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`,
    }));
  }, [prices]);

  return (
    <Select
      {...props}
      options={priceOptions}
      optionRender={({ data, key }) => (
        <Space key={key}>
          <span>
            <Avatar src={data.iconUrl} alt={data.label}>
              {data.label}
            </Avatar>
          </span>
          {data.label}
        </Space>
      )}
    />
  );
}
