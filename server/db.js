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
  // Create USERS table
  db.run(`CREATE TABLE IF NOT EXISTS Users (
  UserID INTEGER PRIMARY KEY AUTOINCREMENT,
  UserCode TEXT GENERATED ALWAYS AS (printf('U%03d', UserID)),
  Username VARCHAR(50) NOT NULL UNIQUE,
  Email VARCHAR(100) NOT NULL UNIQUE,
  Password VARCHAR(50) NOT NULL,
  CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UserType VARCHAR(10) NOT NULL CHECK (UserType IN ('Customer', 'Employee'))
);`);

  // Create CUSTOMERS table
  db.run(`CREATE TABLE IF NOT EXISTS Customers (
    UserID INTEGER PRIMARY KEY,
    CustomerCode TEXT GENERATED ALWAYS AS (printf('C%03d', UserID)),
    Fname VARCHAR(50) NOT NULL,
    Lname VARCHAR(50) NOT NULL,
    Gender VARCHAR(4) NOT NULL,
    DOB DATE NOT NULL,
    Phone VARCHAR(15) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
  );`);

  // Create EMPLOYEES table
  db.run(`CREATE TABLE IF NOT EXISTS Employees (
    UserID INTEGER PRIMARY KEY,
    EmployeeCode TEXT GENERATED ALWAYS AS (printf('E%03d', UserID)),
    Fname VARCHAR(50) NOT NULL,
    Lname VARCHAR(50) NOT NULL,
    Phone VARCHAR(15) NOT NULL,
    Gender VARCHAR(4) NOT NULL,
    DOB DATE NOT NULL,
    Role VARCHAR(50) NOT NULL,
    HireDate DATE NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
  );`);

  // Create BUS_STOPS table
  db.run(`CREATE TABLE IF NOT EXISTS BusStops (
  BusStopID INTEGER PRIMARY KEY AUTOINCREMENT,
  BusStopCode TEXT GENERATED ALWAYS AS (printf('S%03d', BusStopID)),
  Name VARCHAR(100) NOT NULL,
  Address VARCHAR(200) NOT NULL,
  Subprovince VARCHAR(100) NOT NULL,
  Province VARCHAR(100) NOT NULL
);`);

  // Create ROUTES table
  db.run(`CREATE TABLE IF NOT EXISTS Routes (
  RouteID INTEGER PRIMARY KEY AUTOINCREMENT,
  RouteCode TEXT GENERATED ALWAYS AS (printf('R%03d', RouteID)),
  RouteName VARCHAR(100) NOT NULL,
  Origin INTEGER NOT NULL,
  Destination INTEGER NOT NULL,
  FOREIGN KEY (Origin) REFERENCES BusStops(BusStopID),
  FOREIGN KEY (Destination) REFERENCES BusStops(BusStopID)
);`);

  // Create BUSES table
  db.run(`CREATE TABLE IF NOT EXISTS Buses (
  BusID INTEGER PRIMARY KEY AUTOINCREMENT,
  BusCode TEXT GENERATED ALWAYS AS (printf('B%03d', BusID)),
  Name VARCHAR(100) NULL,
  Type VARCHAR(50) NOT NULL
);`);

  // Create SCHEDULES table
  db.run(`CREATE TABLE IF NOT EXISTS Schedules (
  ScheduleID INTEGER PRIMARY KEY AUTOINCREMENT,
  ScheduleCode TEXT GENERATED ALWAYS AS (printf('H%03d', ScheduleID)),
  ScheduleName VARCHAR(100) NOT NULL,
  RouteID INTEGER NOT NULL,
  BusID INTEGER NOT NULL,
  EmployeeID INTEGER NOT NULL,
  DepartureTime DATETIME NOT NULL,
  ArrivalTime DATETIME NOT NULL,
  Price DECIMAL(10,2) NOT NULL,
  Description TEXT NOT NULL,
  FOREIGN KEY (RouteID) REFERENCES Routes(RouteID) ON DELETE CASCADE,
  FOREIGN KEY (BusID) REFERENCES Buses(BusID) ON DELETE CASCADE,
  FOREIGN KEY (EmployeeID) REFERENCES Employees(UserID) ON DELETE CASCADE
);`);

  db.run(`CREATE TABLE IF NOT EXISTS Seats (
  SeatID INTEGER PRIMARY KEY AUTOINCREMENT,
  SeatCode VARCHAR(3) NOT NULL UNIQUE
);`);

  // Create BOOKINGS table
  db.run(`CREATE TABLE IF NOT EXISTS Bookings (
  BookingID INTEGER PRIMARY KEY AUTOINCREMENT,
  BookingCode TEXT GENERATED ALWAYS AS (printf('K%03d', BookingID)),
  CustomerID INTEGER,
  ScheduleID INTEGER NOT NULL,
  BookingTime DATETIME NOT NULL,
  SeatID INTEGER NOT NULL,
  Status VARCHAR(50) NOT NULL,
  PaymentID INTEGER,
  Name VARCHAR(100) NOT NULL,
  FOREIGN KEY (CustomerID) REFERENCES Customers(UserID) ON DELETE CASCADE,
  FOREIGN KEY (ScheduleID) REFERENCES Schedules(ScheduleID) ON DELETE CASCADE,
  FOREIGN KEY (SeatID) REFERENCES Seats(SeatID) ON DELETE CASCADE,
  FOREIGN KEY (PaymentID) REFERENCES Payment(PaymentID) ON DELETE SET NULL
);`);

  // Create PAYMENTS table
  db.run(`CREATE TABLE IF NOT EXISTS Payment (
  PaymentID INTEGER PRIMARY KEY AUTOINCREMENT,
  PaymentCode TEXT GENERATED ALWAYS AS (printf('P%03d', PaymentID)),
  Amount DECIMAL(10,2) NOT NULL,
  PaymentTime DATETIME NOT NULL,
  PaymentMethod VARCHAR(50) NOT NULL
);`);

  console.log("Tables created successfully.");
});

export default db;
