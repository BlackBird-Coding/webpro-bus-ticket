import express from "express";
import {
  registerCustomer,
  login,
  createEmployee,
  getRoutes,
  deleteRoute,
  getOneRoute,
  historyEmp,
  getBusStops,
  getEmployees,
  historyCus,
  getTrips,
  saveEditBus,
  getBuses,
  checkAvailableSeats,
  saveBookingAndPayment,
  getSchedulePrice,
  getReturnTrips,
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
  console.log("Request body:", req.body);
  login(email, password).then(
    (user) => {
      console.log("User:", user);
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
  res.json({ user: req.session.user } || {});
});

router.get("/ManageBus_Emp", (req, res) => {
  getRoutes()
    .then((routes) => {
      res.json({ routes });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.get("/BusStops", (req, res) => {
  getBusStops()
    .then((BusStops) => {
      res.json({ BusStops });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.post("/EditBus", (req, res) => {
  getOneRoute(req.body.id)
    .then((routes) => {
      res.json({ routes });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.post("/DeleteRoute", (req, res) => {
  deleteRoute(id).then(
    () => {
      res.json({ message: "Delete Route successful!" });
    },
    (error) => {
      res.status(400).json({ error });
    }
  );
});

router.get("/history", (req, res) => {
  historyEmp()
    .then((history) => {
      res.json({ history });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.get("/employees", (req, res) => {
  getEmployees()
    .then((employees) => {
      res.json({ employees });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.get("/historyCus", (req, res) => {
  console.log("seesion", req.session);
  historyCus(req.session.user.details.userID)
    .then((histories) => {
      res.json({ histories });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.post("/SaveEditBus", (req, res) => {
  saveEditBus(req.body)
    .then(() => {
      res.json({ message: "Save successful!" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.get("/getBuses", (req, res) => {
  getBuses()
    .then((Buses) => {
      res.json({ Buses });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.get("/trips", (req, res) => {
  const { routeId, date } = req.query;
  getTrips(routeId, date)
    .then((trips) => {
      res.json({ trips });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.get("/return-trips", (req, res) => {
  const { routeId, date } = req.query;
  getReturnTrips(routeId, date)
    .then((trips) => {
      res.json({ trips });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.get("/available-seats/:scheduleID", (req, res) => {
  const scheduleID = req.params.scheduleID;

  checkAvailableSeats(scheduleID)
    .then((availableSeats) => {
      res.json({ availableSeats });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.post("/book-and-pay", (req, res) => {
  const { booking, payment } = req.body;
  const userId = req.session.user.details.userID;

  saveBookingAndPayment(booking, payment, userId)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.error("Error saving booking and payment:", error);
      res.status(500).json({ error: "Failed to save booking and payment" });
    });
});

router.get("/getSchedulePrice/:scheduleID", (req, res) => {
  const scheduleID = req.params.scheduleID;

  getSchedulePrice(scheduleID)
    .then((price) => {
      res.json({ price });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

export default router;
