import sqlite3 from "sqlite3";

let db = new sqlite3.Database("../db/main.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the main database.");
});

db.serialize(() => {
  // Create ROUTES table
  db.run(`CREATE TABLE IF NOT EXISTS ROUTES (
      RouteID INTEGER PRIMARY KEY,
      Origin TEXT NOT NULL,
      Destination TEXT NOT NULL,
      Distance DECIMAL NOT NULL
    );`);

  // Create BUSES table
  db.run(`CREATE TABLE IF NOT EXISTS BUSES (
      BusID INTEGER PRIMARY KEY,
      BusNumber TEXT NOT NULL,
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

export default db;
