interface Currency {
  code: string;
  title: string;
  image?: string; 
}

interface Market {
  code: string;
  price: number;
  change_24: number;
  volume_24: number;
  currency1: Currency;
  currency2: Omit<Currency, "image">; 
}

interface MarketData {
  IRT: Market[];
  USDT: Market[];
}
