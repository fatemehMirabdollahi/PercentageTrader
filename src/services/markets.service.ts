import api from "./api";
import Decimal from "decimal.js";
class MarketsService {
  async getMarkets(): Promise<MarketsData> {
    const response = await api.get("/v1/mkt/markets/");
    const formattedMarketData = response.data.results.reduce(
      (acc: MarketsData, e: any) => {
        const market = {
          id: e.id,
          code: e.code,
          price: new Decimal(e.price).toNumber(),
          change_24: new Decimal(e.order_book_info.change).toNumber(),
          volume_24: new Decimal(e.order_book_info.amount).toNumber(),
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

        if (e.currency2.code === "IRT") {
          acc.irt.push(market);
        } else {
          acc.usdt.push(market);
        }
        return acc;
      },
      { irt: [], usdt: [] } as MarketsData
    );

    return formattedMarketData;
  }
}

export default new MarketsService();
