import express from "express";
import {
  registerCustomer,
  login,
  createEmployee,
  getRoutes,
} from "./service.js";
const router = express.Router();

router.post("/register", (req, res) => {
  console.log("Request body:", req.body);
  const { fname, lname, dob, gender, number, email, password } = req.body;
  registerCustomer(fname, lname, number, email, password).then(
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
      req.session.user = user;
      res.json({ message: "Login successful!", user });
    },
    (error) => {
      res.status(400).json({ error });
    }
  );
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logout successful!" });
});

router.get("/routes", (req, res) => {
  getRoutes()
    .then((routes) => {
      res.json({ routes });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.get("/user", (req, res) => {
  res.json({ user: req.session.user });
});

export default router;
