import express from "express";
import {
  registerCustomer,
  login,
  createEmployee,
  getRoutes,
} from "./service.js";
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
      res.json({ message: "Login successful!" });
    },
    (error) => {
      res.status(400).json({ error });
    }
  );
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

router.get("/mockup", (req, res) => {
  createEmployee(
    "John",
    "Doe",
    "123456789",
    "john.doe@example.com",
    "password123",
    "Driver"
  )
    .then((message) => {
      console.log(message);
      // Send a success response to the client
      res
        .status(200)
        .json({ message: "Employee created successfully!", details: message });
    })
    .catch((error) => {
      console.error("Error:", error);
      // Send an error response to the client
      res
        .status(500)
        .json({ message: "Error creating employee", error: error });
    });
});

export default router;
