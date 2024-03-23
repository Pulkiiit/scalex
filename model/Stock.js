const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  label: { type: String },
  url: { type: String },
});
const socialsSchema = new mongoose.Schema({
  type: { type: String },
  url: { type: String },
});

const stockSchema = new mongoose.Schema({
  chainId: {
    type: String,
  },
  dexId: {
    type: String,
  },
  url: {
    type: String,
  },
  pairAddress: {
    type: String,
  },
  baseToken: {
    address: {
      type: String,
    },
    name: {
      type: String,
    },
    symbol: {
      type: String,
    },
  },
  quoteToken: {
    address: {
      type: String,
    },
    name: {
      type: String,
    },
    symbol: {
      type: String,
    },
  },
  priceNative: {
    type: String,
  },
  priceUsd: {
    type: String,
  },
  txns: {
    m5: {
      buys: {
        type: Number,
      },
      sells: {
        type: Number,
      },
    },
    h1: {
      buys: {
        type: Number,
      },
      sells: {
        type: Number,
      },
    },
    h6: {
      buys: {
        type: Number,
      },
      sells: {
        type: Number,
      },
    },
    h24: {
      buys: {
        type: Number,
      },
      sells: {
        type: Number,
      },
    },
  },
  volume: {
    h24: {
      type: Number,
    },
    h6: {
      type: Number,
    },
    h1: {
      type: Number,
    },
    m5: {
      type: Number,
    },
  },
  priceChange: {
    m5: {
      type: Number,
    },
    h1: {
      type: Number,
    },
    h6: {
      type: Number,
    },
    h24: {
      type: Number,
    },
  },
  liquidity: {
    usd: {
      type: Number,
    },
    base: {
      type: Number,
    },
    quote: {
      type: Number,
    },
  },
  pairCreatedAt: {
    type: Number,
  },
  info: {
    imageUrl: {
      type: String,
    },
    websites: [websiteSchema],
    socials: [socialsSchema],
  },
});

const StockModel = mongoose.model("Stock", stockSchema);
module.exports = StockModel;
