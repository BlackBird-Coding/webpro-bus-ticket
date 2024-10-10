import db from "./db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

db.serialize(() => {
  // Insert data into BUS_STOPS table (Thai locations)
  db.run(
    `INSERT INTO BUS_STOPS (Name, Province, Latitude, Longitude) VALUES 
    ('กรุงเทพมหานคร', 'กรุงเทพมหานคร', 13.7563, 100.5018),
    ('เชียงใหม่', 'เชียงใหม่', 18.7061, 98.9817),
    ('ภูเก็ต', 'ภูเก็ต', 7.8804, 98.3923),
    ('อยุธยา', 'พระนครศรีอยุธยา', 14.3692, 100.5877),
    ('กาญจนบุรี', 'กาญจนบุรี', 14.0223, 99.5323),
    ('พัทยา', 'ชลบุรี', 12.9276, 100.8771),
    ('หัวหิน', 'ประจวบคีรีขันธ์', 12.5684, 99.9577),
    ('เชียงราย', 'เชียงราย', 19.9105, 99.8406),
    ('เอกมัย', 'กรุงเทพมหานคร', 13.7263, 100.5851),
    ('หมอชิต', 'กรุงเทพมหานคร', 13.8022, 100.5531);`
  );

  // Insert data into ROUTES table
  db.run(
    `INSERT INTO ROUTES (RouteName, Origin, Destination, Distance) VALUES 
    ('กรุงเทพฯ ไป เชียงใหม่', 1, 2, 700),
    ('กรุงเทพฯ ไป ภูเก็ต', 1, 3, 850),
    ('กรุงเทพฯ ไป อยุธยา', 1, 4, 80),
    ('เชียงใหม่ ไป ภูเก็ต', 2, 3, 1200),
    ('อยุธยา ไป กาญจนบุรี', 4, 5, 150),
    ('อยุธยา ไป พัทยา', 4, 6, 120),
    ('พัทยา ไป หัวหิน', 6, 7, 200),
    ('หัวหิน ไป เชียงราย', 7, 8, 300),
    ('กรุงเทพฯ ไป เอกมัย', 1, 9, 10),
    ('กรุงเทพฯ ไป หมอชิต', 1, 10, 15);`
  );

  // Insert data into BUSES table
  db.run(
    `INSERT INTO BUSES (BusName, Capacity, Type) VALUES 
    ('บัส VIP', 50, 'VIP'),
    ('บัส เอ็กซ์เพรส', 40, 'Express'),
    ('บัส มาตรฐาน', 30, 'Standard'),
    ('บัส ประหยัด', 20, 'Economy'),
    ('มินิบัส', 10, 'Mini');`
  );

  // Insert data into SCHEDULES table
  db.run(
    `INSERT INTO SCHEDULES (RouteID, BusID, EmployeeID, DepartureTime, ArrivalTime) VALUES 
    (1, 1, 1, '2024-10-10 08:00', '2024-10-10 16:00'),
    (2, 2, 2, '2024-10-11 09:00', '2024-10-11 18:00'),
    (3, 3, 3, '2024-10-12 10:00', '2024-10-12 12:00'),
    (4, 4, 4, '2024-10-13 06:00', '2024-10-13 16:00'),
    (5, 5, 5, '2024-10-14 07:30', '2024-10-14 09:30');`
  );

  // Insert data into BOOKINGS table
  db.run(
    `INSERT INTO BOOKINGS (CustomerID, ScheduleID, BookingDate, SeatNumber, Status) VALUES 
    (1, 1, '2024-09-20', 'A1', 'ยืนยัน'),
    (2, 2, '2024-09-21', 'B2', 'ยืนยัน'),
    (3, 3, '2024-09-22', 'C3', 'รอการยืนยัน'),
    (4, 4, '2024-09-23', 'D4', 'ยืนยัน'),
    (5, 5, '2024-09-24', 'E5', 'ยกเลิก');`
  );

  // Insert data into PAYMENTS table
  db.run(
    `INSERT INTO PAYMENTS (BookingID, Amount, PaymentDate, PaymentMethod) VALUES 
    (1, 500.00, '2024-09-20', 'บัตรเครดิต'),
    (2, 400.00, '2024-09-21', 'บัตรเดบิต'),
    (3, 300.00, '2024-09-22', 'เงินสด'),
    (4, 600.00, '2024-09-23', 'บัตรเครดิต'),
    (5, 200.00, '2024-09-24', 'จ่ายผ่านมือถือ');`
  );

  console.log("Mock data inserted successfully.");
});

// Mock customers and employees data
const mockCustomers = [
  {
    fname: "กิตติ",
    lname: "ยั่งยืน",
    phone: "0801234567",
    email: "kitti.y@example.com",
    password: "password123",
  },
  {
    fname: "สุกัญญา",
    lname: "เพ็ชรดี",
    phone: "0802345678",
    email: "sukanya.p@example.com",
    password: "password234",
  },
  {
    fname: "ปรียา",
    lname: "รุ่งเรือง",
    phone: "0803456789",
    email: "preeya.r@example.com",
    password: "password345",
  },
];

const mockEmployees = [
  {
    fname: "สมชาย",
    lname: "ทองใบ",
    role: "พนักงานขับรถ",
    hireDate: "2019-01-10",
    dob: "1985-10-22",
    email: "somchai.t@example.com",
    password: "password456",
  },
  {
    fname: "สมศรี",
    lname: "ดำรงค์",
    role: "พนักงานขับรถ",
    hireDate: "2018-03-15",
    dob: "1982-11-30",
    email: "somsri.d@example.com",
    password: "password567",
  },
];

// Function to insert mock users with hashed passwords
const insertMockUsers = () => {
  // Insert mock customers
  mockCustomers.forEach((customer) => {
    const { fname, lname, phone, email, password } = customer;

    // Hash the password before inserting
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing the password:", err.message);
        return;
      }

      // Insert the customer into the CUSTOMERS table
      db.run(
        `INSERT INTO CUSTOMERS (Fname, Lname, Phone, Email) VALUES (?, ?, ?, ?)`,
        [fname, lname, phone, email],
        function (err) {
          if (err) {
            console.error("Error inserting customer:", err.message);
            return;
          }

          // Get the newly inserted CustomerID
          const customerId = this.lastID;

          // Insert the user into the USERS table with hashed password
          db.run(
            `INSERT INTO USERS (Username, Email, Password, UserType, CustomerID) VALUES (?, ?, ?, 'customer', ?)`,
            [email, email, hashedPassword, customerId],
            (err) => {
              if (err) {
                console.error("Error inserting user:", err.message);
              } else {
                console.log(
                  `Customer ${fname} ${lname} registered successfully!`
                );
              }
            }
          );
        }
      );
    });
  });

  // Insert mock employees
  mockEmployees.forEach((employee) => {
    const { fname, lname, role, hireDate, dob, email, password } = employee;

    // Hash the password before inserting
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing the password:", err.message);
        return;
      }

      // Insert the employee into the EMPLOYEES table
      db.run(
        `INSERT INTO EMPLOYEES (Fname, Lname, Role, HireDate, DOB) VALUES (?, ?, ?, ?, ?)`,
        [fname, lname, role, hireDate, dob],
        function (err) {
          if (err) {
            console.error("Error inserting employee:", err.message);
            return;
          }

          // Get the newly inserted EmployeeID
          const employeeId = this.lastID;

          // Insert the user into the USERS table with hashed password
          db.run(
            `INSERT INTO USERS (Username, Email, Password, UserType, EmployeeID) VALUES (?, ?, ?, 'employee', ?)`,
            [email, email, hashedPassword, employeeId],
            (err) => {
              if (err) {
                console.error("Error inserting user:", err.message);
              } else {
                console.log(
                  `Employee ${fname} ${lname} registered successfully!`
                );
              }
            }
          );
        }
      );
    });
  });
};

// Call the function to insert mock users and employees
insertMockUsers();
