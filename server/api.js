import express from "express";
import db from "./db.js";
import { registerCustomer, login } from "./service.js";
const router = express.Router();

// Define your routes
router.get("/hello", (req, res) => {
  res.json({ message: "Hello, world!" });
});

router.post("/greet", express.json(), (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}!` });
});

router.post("/register", (req, res) => {
  const { fname, lname, phone, email, password } = req.body;
  registerCustomer(fname, lname, phone, email, password).then(
    () => {
      res.json({ message: "Customer registration successful!" });
    },
    (error) => {
      res.status(400).json({ error });
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  login(email, password).then(
    (user) => {
      res.json({ message: "Login successful!", user });
    },
    (error) => {
      res.status(400).json({ error });
    }
  );
});

export default router;
