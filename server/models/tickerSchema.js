import { mongoose } from 'mongoose';


const tickerSchema = new mongoose.Schema({
  name: String,
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  baseUnit: String,
});

const Ticker= mongoose.model("Ticker", tickerSchema);

export default Ticker;