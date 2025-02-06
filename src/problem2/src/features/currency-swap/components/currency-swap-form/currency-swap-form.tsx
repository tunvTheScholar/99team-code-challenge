import { SwapOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber } from "antd";
import { TPrice, usePrices } from "../../hooks/use-prices";
import SelectCurrency from "./select-currency";
import { TCurrencySwapData } from "./types";

export default function CurrencySwapForm() {
  const [form] = Form.useForm<TCurrencySwapData>();
  const prices = usePrices();

  const calculateCurrency = () => {
    const amountSend = form.getFieldValue("amountSend");
    const amountSendCurrency = form.getFieldValue("amountSendCurrency");
    const amountReceiveCurrency = form.getFieldValue("amountReceiveCurrency");

    if (!amountSend || !amountReceiveCurrency || !amountSendCurrency) return;

    const sendPrice = getLatestPrice(prices, amountSendCurrency);
    const receivePrice = getLatestPrice(prices, amountReceiveCurrency);

    if (!sendPrice || !receivePrice) return;

    const amountInUSD = amountSend * sendPrice;
    const amountReceive = amountInUSD / receivePrice;

    form.setFieldValue("amountReceive", amountReceive);
  };

  const handleSwitchCurrency = () => {
    const amountReceiveCurrency = form.getFieldValue("amountReceiveCurrency");
    const amountSendCurrency = form.getFieldValue("amountSendCurrency");

    form.setFieldsValue({
      amountReceiveCurrency: amountSendCurrency,
      amountSendCurrency: amountReceiveCurrency,
    });

    calculateCurrency();
  };

  return (
    <Form
      form={form}
      onFinish={() => {
        console.log("Do swap logic");
      }}
      onFinishFailed={() => {}}
      initialValues={{
        amountSend: 1,
        amountReceiveCurrency: "ETH",
        amountSendCurrency: "USD",
      }}
      layout="vertical"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ width: "70%" }}>
          <Form.Item<TCurrencySwapData>
            name="amountSend"
            label="Amount to Send"
            rules={[{ type: "number", min: 0, required: true }]}
            required
          >
            <InputNumber
              inputMode="decimal"
              placeholder="Amount to send"
              min={0}
              style={{ width: "100%" }}
              onChange={calculateCurrency}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </Form.Item>
        </div>
        <div style={{ width: "30%" }}>
          <Form.Item<TCurrencySwapData>
            label="Currency"
            required
            name="amountSendCurrency"
          >
            <SelectCurrency placeholder="Select" onChange={calculateCurrency} />
          </Form.Item>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button htmlType="button" onClick={handleSwitchCurrency}>
          <SwapOutlined />
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ width: "70%" }}>
          <Form.Item<TCurrencySwapData>
            name="amountReceive"
            label="Amount to Receive"
          >
            <InputNumber
              style={{ width: "100%" }}
              inputMode="decimal"
              placeholder="Amount to receive"
              min={0}
              disabled
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          </Form.Item>
        </div>
        <div style={{ width: "30%" }}>
          <Form.Item<TCurrencySwapData>
            label="Currency"
            required
            name="amountReceiveCurrency"
          >
            <SelectCurrency placeholder="Select" onChange={calculateCurrency} />
          </Form.Item>
        </div>
      </div>

      <Button
        block
        htmlType="submit"
        type="primary"
        style={{ textTransform: "uppercase" }}
      >
        Confirm swap
      </Button>
    </Form>
  );
}

const getLatestPrice = (prices: TPrice[], currency: string): number | null => {
  const filteredPrices = prices
    .filter((item) => item.currency === currency)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return filteredPrices.length > 0 ? filteredPrices[0].price : null;
};
