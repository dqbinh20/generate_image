const express = require("express");
const openai = require("openai");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", function (req, res) {
  res.render("index", { image_url: "" });
});

const client = new openai();

app.get("/image", async function (req, res) {
  description = req.query.description;
  // openai generate image
  const response = await client.images.generate({
    model: "dall-e-3",
    prompt: description,
    size: "1024x1024",
    quality: "standard",
    n: 1,
  });
  const image_url = response.data[0].url;
  res.render("index", { image_url });
});

app.listen(3000);
