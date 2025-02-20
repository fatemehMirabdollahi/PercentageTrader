import api from "./api";

class MarketDetailService {
  async getMarketTrades(marketId: string): Promise<Trade[]> {
    const response = await api.get(`/v1/mth/matches/${marketId}/`);
    const trades = response.data.slice(0, 10).map((trade: any) => ({
      id: trade.match_id,
      match_amount: trade.match_amount,
      price: trade.price,
      time: trade.time,
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
        remain: Number(trade.remain),
        price: Number(trade.price),
        value: Number(trade.value),
      }));
    return trades;
  }
}

export default new MarketDetailService();
