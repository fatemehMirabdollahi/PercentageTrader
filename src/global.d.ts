interface Currency {
  code: string;
  title: string;
  image?: string;
}

interface Market {
  id: number;
  code: string;
  price: number;
  change_24: number;
  volume_24: number;
  currency1: Currency;
  currency2: Omit<Currency, "image">;
}

interface MarketsData {
  irt: Market[];
  usdt: Market[];
}
