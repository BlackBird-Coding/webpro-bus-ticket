import sqlite3 from "sqlite3";
let dbPath = "db/main.db";

let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the main database.");
  }
});

db.serialize(() => {
  // Create ROUTES table
  db.run(`CREATE TABLE IF NOT EXISTS ROUTES (
      RouteID INTEGER PRIMARY KEY,
      Origin INTEGER NOT NULL,
      Destination INTEGER NOT NULL,
      Distance DECIMAL NOT NULL,
      FOREIGN KEY (Origin) REFERENCES BUS_STOPS(BusStopID),
      FOREIGN KEY (Destination) REFERENCES BUS_STOPS(BusStopID)
    );`);

  // Create BUS_STOPS table
  db.run(`CREATE TABLE IF NOT EXISTS BUS_STOPS (
      BusStopID INTEGER PRIMARY KEY,
      Name TEXT NOT NULL,
      Province TEXT NOT NULL,
      Latitude DECIMAL NOT NULL,
      Longitude DECIMAL NOT NULL
    );`);

  // Create BUSES table
  db.run(`CREATE TABLE IF NOT EXISTS BUSES (
      BusID INTEGER PRIMARY KEY,
      BusName TEXT NOT NULL,
      Capacity INTEGER NOT NULL,
      Type TEXT NOT NULL
    );`);

  // Create EMPLOYEES table
  db.run(`CREATE TABLE IF NOT EXISTS EMPLOYEES (
      EmployeeID INTEGER PRIMARY KEY,
      Fname TEXT NOT NULL,
      Lname TEXT NOT NULL,
      Role TEXT NOT NULL,
      HireDate DATE NOT NULL,
      DOB DATE NOT NULL
    );`);

  // Create SCHEDULES table
  db.run(`CREATE TABLE IF NOT EXISTS SCHEDULES (
      ScheduleID INTEGER PRIMARY KEY,
      RouteID INTEGER NOT NULL,
      BusID INTEGER NOT NULL,
      EmployeeID INTEGER NOT NULL,
      DepartureTime DATETIME NOT NULL,
      ArrivalTime DATETIME NOT NULL,
      FOREIGN KEY (RouteID) REFERENCES ROUTES(RouteID),
      FOREIGN KEY (BusID) REFERENCES BUSES(BusID),
      FOREIGN KEY (EmployeeID) REFERENCES EMPLOYEES(EmployeeID)
    );`);

  // Create CUSTOMERS table
  db.run(`CREATE TABLE IF NOT EXISTS CUSTOMERS (
      CustomerID INTEGER PRIMARY KEY,
      Fname TEXT NOT NULL,
      Lname TEXT NOT NULL,
      Phone TEXT NOT NULL,
      Email TEXT NOT NULL
    );`);

  // Create BOOKINGS table
  db.run(`CREATE TABLE IF NOT EXISTS BOOKINGS (
      BookingID INTEGER PRIMARY KEY,
      CustomerID INTEGER NOT NULL,
      ScheduleID INTEGER NOT NULL,
      BookingDate DATE NOT NULL,
      SeatNumber TEXT NOT NULL,
      Status TEXT NOT NULL,
      FOREIGN KEY (CustomerID) REFERENCES CUSTOMERS(CustomerID),
      FOREIGN KEY (ScheduleID) REFERENCES SCHEDULES(ScheduleID)
    );`);

  // Create PAYMENTS table
  db.run(`CREATE TABLE IF NOT EXISTS PAYMENTS (
      PaymentID INTEGER PRIMARY KEY,
      BookingID INTEGER NOT NULL,
      Amount DECIMAL NOT NULL,
      PaymentDate DATE NOT NULL,
      PaymentMethod TEXT NOT NULL,
      FOREIGN KEY (BookingID) REFERENCES BOOKINGS(BookingID)
    );`);

  db.run(`CREATE TABLE IF NOT EXISTS USERS (
        UserID INTEGER PRIMARY KEY,
        Username TEXT NOT NULL UNIQUE,
        Email TEXT NOT NULL UNIQUE,
        Password TEXT NOT NULL,
        UserType TEXT NOT NULL, -- customer or employee
        CustomerID INTEGER,
        EmployeeID INTEGER,
        FOREIGN KEY (CustomerID) REFERENCES CUSTOMERS(CustomerID),
        FOREIGN KEY (EmployeeID) REFERENCES EMPLOYEES(EmployeeID)
      );`);

  console.log("Tables created successfully.");
});

//  add routes in thailand

// db.serialize(() => {
//   db.run(
//     `INSERT INTO BUS_STOPS (Name, Province, Latitude, Longitude) VALUES ('Bangkok', 'Bangkok', 13.7563, 100.5018),
//     ('Chiang Mai', 'Chiang Mai', 18.7061, 98.9817),
//     ('Phuket', 'Phuket', 7.8804, 98.3923),
//     ('Ayutthaya', 'Ayutthaya', 14.3692, 100.5877),
//     ('Kanchanaburi', 'Kanchanaburi', 14.0223, 99.5323),
//     ('Pattaya', 'Chon Buri', 12.9276, 100.8771),
//     ('Hua Hin', 'Prachuap Khiri Khan', 12.5684, 99.9577),
//     ('Chiang Rai', 'Chiang Rai', 19.9105, 99.8406),
//     ('Ekamai', 'Bangkok', 13.7263, 100.5851),
//     ('Mo Chit', 'Bangkok', 13.8022, 100.5531);`
//   );

//   db.run(
//     `INSERT INTO ROUTES (Origin, Destination, Distance) VALUES (1, 2, 700),
//     (1, 3, 850),
//     (1, 4, 80),
//     (2, 3, 1200),
//     (4, 5, 150),
//     (4, 6, 120),
//     (6, 7, 200),
//     (7, 8, 300),
//     (1, 9, 10),
//     (1, 10, 15);`
//   );

//   console.log("Routes added successfully.");
// });

// // add buses
// db.serialize(() => {
//   db.run(
//     `INSERT INTO BUSES (BusId, BusName, Capacity, Type) VALUES (1, 'Bus 1', 50, 'Standard'),
//     (2, 'Bus 2', 40, 'Standard'),
//     (3, 'Bus 3', 30, 'Standard'),
//     (4, 'Bus 4', 20, 'Standard'),
//     (5, 'Bus 5', 10, 'VIP');`
//   );

//   console.log("Buses added successfully.");
// });

export default db;
