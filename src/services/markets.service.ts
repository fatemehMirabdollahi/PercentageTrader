import api from "./api";

class MarketsService {
  async getMarkets(): Promise<MarketsData> {
    const response = await api.get("/v1/mkt/markets/");
    const formattedMarketData = response.data.results.reduce(
      (acc: MarketsData, e: any) => {
        const market = {
          id: e.id,
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
