import api from "./api";

class MarketsService {
  async getMarkets() {
    const response = await api.get("/v1/mkt/markets/");
    return response.data.results;
  }
}
export default new MarketsService();
