
import axios from "axios";

import asyncHandler from "../middleware/asyncHandler.js";
import Ticker from '../models/tickerSchema.js';
import Errorhandler from '../utils/CutomError.js';

// Fetch top 10 tickers from the API and store in the database
export const fetchAndStoreTickers = asyncHandler(async (req, res) => {
  const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
  const tickersData = response.data;

  console.log("tickersData",tickersData)
  const top10Tickers = Object.values(tickersData)
    .slice(0, 10)
    .map((tickerData) => ({
      name: tickerData.name,
      last: tickerData.last,
      buy: tickerData.buy,
      sell: tickerData.sell,
      volume: tickerData.volume,
      baseUnit: tickerData.base_unit,
    }));

  await Ticker.deleteMany({});
  const storedTickers = await Ticker.create(top10Tickers);

  res.status(200).json({
    message: "Tickers fetched and stored successfully",
    tickers: storedTickers,
  });
});

// Get stored tickers from the database
export const getStoredTickers = asyncHandler(async (req, res) => {
//  fetchAndStoreTickers()
    const storedTickers = await Ticker.find();

  res.status(200).json({ tickers: storedTickers });
});
