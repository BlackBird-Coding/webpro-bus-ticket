import express from "express";
import {
  registerCustomer,
  login,
  createEmployee,
  getRoutes,
  deleteSchedule,
  getOneSchedule,
  historyEmp,
  getBusStops,
  getEmployees,
  historyCus,
  EditSchedule,
  getBuses,
  addStation,
  addSchedule,
  addRoute,
  addBus,
  getSchedules
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

router.get("/getSchedules", (req, res) => {
  getSchedules()
    .then((schedule) => {
      res.json({ schedule });
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

router.post("/GetOneSchedule", (req, res) => {
  console.log('post', req.body.id)
  getOneSchedule(req.body.id)
    .then((routes) => {
      console.log('post',routes)

      res.json({ routes });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.post("/DeleteSchedule", (req, res) => {
  deleteSchedule(req.body.id).then(
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

router.post('/EditSchedule', (req,res) => {
  EditSchedule(req.body)
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
      res.json({ Buses});
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.post('/AddStation', (req,res) => {
  addStation(req.body)
    .then(() => {
      res.json({ message: "Save Station successful!" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.post('/AddSchedule', (req,res) => {
  addSchedule(req.body)
    .then(() => {
      res.json({ message: "Save New Schedule successful!" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.post('/AddRoute', (req,res) => {
  addRoute(req.body)
    .then(() => {
      res.json({ message: "Save New Schedule successful!" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

router.post('/AddBus', (req,res) => {
  addBus(req.body)
    .then(() => {
      res.json({ message: "Save New Schedule successful!" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

export default router;
