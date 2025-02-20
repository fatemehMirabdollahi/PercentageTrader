import api from "./api";

class MarketsService {
  async getMarkets(): Promise<MarketData> {
    const response = await api.get("/v1/mkt/markets/");
    let formattedMarketData = response.data.results
      .map((e: any) => {
        return {
          code: e.code,
          price: e.price,
          change_24: e.order_book_info.change,
          volume_24: e.order_book_info.amount,
          currency1: {
            code: e.currency1.code,
            title: e.currency1.title_fa,
            image: e.currency1.image,
          },
          currency2: {
            code: e.currency2.code,
            title: e.currency2?.title_fa,
          },
        };
      });
    return {
      IRT: formattedMarketData.filter((e: any) => e.currency2.code === "IRT"),
      USDT: formattedMarketData.filter((e: any) => e.currency2.code === "USDT"),
    };
  }
}
export default new MarketsService();
