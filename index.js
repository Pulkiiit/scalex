const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Stock = require("./model/Stock");

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URI)
  .then(console.log(`Database Connected`))
  .catch(err => {
    console.error("MongoDb connection error", err);
  });

app.get("/", (req, res) => {
  return res.send("ok");
});

app.get("/volume", async (req, res) => {
  const id = req.query.id;
  // id here refers to pairAddress as no info was given about quering single pair
  if (id) {
    try {
      const data = await Stock.findOne({ pairAddress: id }, `volume`);
      if (!data) {
        return res.status(404).json({ error: "Pair not found" }); // no pair with required pairAddress
      }
      return res.json(data);
    } catch (err) {
      console.error("Error fetching volume", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // no id specified implies all pairs
    try {
      const data = await Stock.find({}, `volume`);
      if (!data) {
        return res.status(404).json({ error: "No Pair available" });
      }
      return res.json(data);
    } catch (err) {
      console.error("Erro fetching volume", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.get("/price", async (req, res) => {
  const id = req.query.id;
  // id here refers to pairAddress as no info was given about quering single pair
  if (id) {
    try {
      const data = await Stock.findOne(
        { pairAddress: id },
        `priceNative priceUsd`
      );
      if (!data) {
        return res.status(404).json({ error: "Pair not found" }); // no pair with required pairAddress
      }
      return res.json(data);
    } catch (err) {
      console.error("Error fetching price", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // no id specified implies all pairs
    try {
      const data = await Stock.find({}, `priceNative priceUsd`);
      if (!data) {
        return res.status(404).json({ error: "No Pair available" });
      }
      return res.json(data);
    } catch (err) {
      console.error("Erro fetching price", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
