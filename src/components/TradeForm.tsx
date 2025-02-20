import { useState } from "react";

interface TradeFormProps {
  orderBook: Order[];
  side: "buy" | "sell";
  ramainSum: number;
}

function Calculator({ orderBook, side, ramainSum }: TradeFormProps) {
  const [inputValue, setInputValue] = useState("");
  const [requestResult, setRequestResult] = useState({
    value: 0,
    remain: 0,
    price: 0,
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const number = parseFloat(inputValue);
    if (!isNaN(number)) {
      let requestedVolume = ramainSum * (number / 100);
      let remainingVolume = requestedVolume;
      let sumValue = 0;
      orderBook.forEach((order) => {
        if (remainingVolume > order.remain) {
          remainingVolume -= order.remain;
          sumValue += order.price * order.remain;
        } else {
          sumValue += order.price * remainingVolume;
          remainingVolume = 0;
        }
      });
      setRequestResult({
        value: sumValue,
        remain: requestedVolume,
        price: sumValue / requestedVolume,
      });
    }
  };

  return (
    <div className="  mt-10 p-6 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold text-on-background mb-4">
        درصد حجم مورد نظر خود را برای {side === "sell" ? "خرید" : "فروش"} وارد
        کنید.
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 max-w-md"
      >
        <div>
          <input
            type="number"
            value={inputValue}
            required
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-secondary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <span className="mx-2">%</span>
        </div>
        <button
          type="submit"
          className="cursor-pointer border-2 border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition"
        >
          بررسی درخواست
        </button>
      </form>
      {requestResult.value > 0 && (
        <div className="mt-4">
          <div className="text-lg font-semibold text-on-background">
            حجم ارز قابل دریافت:
            <span className="text-primary px-2">{requestResult.remain}</span>
          </div>
          <div className="text-lg font-semibold text-on-background">
            میانگین قیمت:
            <span className="text-primary px-2">{requestResult.price}</span>
          </div>
          <div className="text-lg font-semibold text-on-background">
            مبلغ قابل پرداخت:
            <span className="text-primary px-2">{requestResult.price}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculator;
