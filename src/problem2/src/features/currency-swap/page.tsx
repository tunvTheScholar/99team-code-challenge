import classes from "./page.module.css";
import CurrencySwapForm from "./components/currency-swap-form/currency-swap-form";
import { Card } from "antd";

export default function CurrencySwapPage() {
  return (
    <div className={classes.page}>
      <Card style={{ width: "60%" }} title="CURRENCY SWAP">
        <CurrencySwapForm />
      </Card>
    </div>
  );
}
