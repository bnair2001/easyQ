const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

app.use(cors());
app.get("/verify", (req, res) => {
  return res.json({ verified: true });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
