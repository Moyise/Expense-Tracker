const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

app.use("/api/expenses", expenseRoutes);

if (process.env.NODE_ENV === "production") {
  const root = path.join("build");
  app.use(express.static(root));

  app.get("*", (req, res) => res.sendFile("index.html", { root }));
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

app.listen(PORT, () => console.log(`Expense app listening on port ` + PORT));
