import Decimal from "decimal.js";
import api from "./api";
import moment from "jalali-moment";

class MarketDetailService {
  async getMarketTrades(marketId: string): Promise<Trade[]> {
    const response = await api.get(`/v1/mth/matches/${marketId}/`);
    const trades = response.data.slice(0, 10).map((trade: any) => ({
      id: trade.match_id,
      match_amount: new Decimal(trade.match_amount).toNumber(),
      price: new Decimal(trade.price).toNumber(),
      time: moment(trade.time * 1000)
        .locale("fa")
        .format("YYYY/MM/DD HH:mm:ss"),
    }));
    return trades;
  }
  async getMarketOrders(
    marketId: string,
    side: "buy" | "sell"
  ): Promise<Order[]> {
    const response = await api.get(`/v2/mth/actives/${marketId}/?type=${side}`);
    const trades = response.data.orders
      .slice(0, 10)
      .map((trade: any, index: number) => ({
        id: index,
        remain: new Decimal(trade.remain).toNumber(),
        price: new Decimal(trade.price).toNumber(),
        value: new Decimal(trade.value).toNumber(),
      }));      
    return trades;
  }
}

export default new MarketDetailService();
