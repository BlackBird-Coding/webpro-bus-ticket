import bcrypt from "bcrypt";
import db from "./db.js";

const registerCustomer = (fname, lname, phone, email, password) => {
  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    // First, check if the email already exists in the USERS table
    db.get(`SELECT * FROM USERS WHERE Email = ?`, [email], (err, user) => {
      if (err) {
        console.error(err.message);
        reject("Error querying the database.");
        return;
      }

      if (user) {
        reject("Email already exists. Please use another email.");
        return;
      }

      // Hash the password before storing it
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.error(err.message);
          reject("Error hashing the password.");
          return;
        }

        // Insert the customer into the CUSTOMERS table
        db.run(
          `INSERT INTO CUSTOMERS (Fname, Lname, Phone, Email) VALUES (?, ?, ?, ?)`,
          [fname, lname, phone, email],
          function (err) {
            if (err) {
              console.error(err.message);
              reject("Error inserting customer.");
              return;
            }

            // Get the newly inserted CustomerID
            const customerId = this.lastID;

            // Insert the user's login details into the USERS table
            db.run(
              `INSERT INTO USERS (Username, Email, Password, UserType, CustomerID) VALUES (?, ?, ?, 'customer', ?)`,
              [email, email, hashedPassword, customerId],
              (err) => {
                if (err) {
                  console.error(err.message);
                  reject("Error inserting user.");
                } else {
                  console.log("Customer registered successfully!");
                  resolve("Customer registered successfully!");
                }
              }
            );
          }
        );
      });
    });
  });
};

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    // Query the USERS table and join with the CUSTOMERS and EMPLOYEES tables
    db.get(
      `SELECT u.*, 
              c.Fname AS CustomerFname, c.Lname AS CustomerLname, c.Gender AS CustomerGender, c.DOB AS CustomerDOB, c.Phone AS CustomerPhone,
              e.Fname AS EmployeeFname, e.Lname AS EmployeeLname, e.Gender AS EmployeeGender, e.DOB AS EmployeeDOB, e.Phone AS EmployeePhone, e.Role, e.HireDate
       FROM Users u
       LEFT JOIN Customers c ON u.UserID = c.UserID
       LEFT JOIN Employees e ON u.UserID = e.UserID
       WHERE u.Email = ?`,
      [email],
      (err, user) => {
        if (err) {
          console.error(err.message);
          reject("Error querying the database.");
          return;
        }

        if (!user) {
          reject("Email not found.");
          return;
        }

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, user.Password, (err, result) => {
          if (err) {
            console.error(err.message);
            reject("Error comparing passwords.");
            return;
          }

          if (result) {
            const { Password, ...userWithoutPassword } = user;

            // Prepare the response based on whether the user is a customer or an employee
            if (user.CustomerFname) {
              // User is a customer
              resolve({
                userType: "customer",
                details: {
                  userID: user.UserID,
                  userCode: user.UserCode,
                  username: user.Username,
                  email: user.Email,
                  createdDate: user.CreatedDate,
                  fname: user.CustomerFname,
                  lname: user.CustomerLname,
                  gender: user.CustomerGender,
                  dob: user.CustomerDOB,
                  phone: user.CustomerPhone,
                },
              });
            } else if (user.EmployeeFname) {
              // User is an employee
              resolve({
                userType: "employee",
                details: {
                  userID: user.UserID,
                  userCode: user.UserCode,
                  username: user.Username,
                  email: user.Email,
                  createdDate: user.CreatedDate,
                  fname: user.EmployeeFname,
                  fname: user.EmployeeLname,
                  gender: user.EmployeeGender,
                  dob: user.EmployeeDOB,
                  phone: user.EmployeePhone,
                  role: user.Role,
                  hireDate: user.HireDate,
                },
              });
            } else {
              reject("Unknown user type.");
            }
          } else {
            reject("Incorrect password.");
          }
        });
      }
    );
  });
};

const createEmployee = (fname, lname, phone, email, password, role) => {
  const saltRounds = 10;
  console.log("Creating employee...");
  return new Promise((resolve, reject) => {
    // First, check if the email already exists in the USERS table
    db.get(`SELECT * FROM USERS WHERE Email = ?`, [email], (err, user) => {
      console.log("Checking if email exists...");
      if (err) {
        console.error("Error querying the database:", err.message);
        return reject("Error querying the database.");
      }

      if (user) {
        console.log("Email already exists.");
        return reject("Email already exists. Please use another email.");
      }

      // Hash the password before storing it
      console.log("Hashing the password...");
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.error("Error hashing the password:", err.message);
          return reject("Error hashing the password.");
        }

        // Insert the employee into the EMPLOYEES table
        console.log("Inserting employee...");
        db.run(
          `INSERT INTO EMPLOYEES (Fname, Lname, Role, HireDate, DOB) 
           VALUES (?, ?, ?, date('now'), '1990-01-01')`, // Replace '1990-01-01' with actual DOB if available
          [fname, lname, role],
          function (err) {
            if (err) {
              console.error("Error inserting employee:", err.message);
              return reject("Error inserting employee.");
            }

            // Get the newly inserted EmployeeID
            const employeeId = this.lastID;

            console.log("Inserting user...");
            // Insert the user's login details into the USERS table
            db.run(
              `INSERT INTO USERS (Username, Email, Password, UserType, EmployeeID) 
               VALUES (?, ?, ?, 'employee', ?)`,
              [`${fname}.${lname}`, email, hashedPassword, employeeId],
              (err) => {
                if (err) {
                  console.error("Error inserting user:", err.message);
                  return reject("Error inserting user.");
                } else {
                  console.log("Employee registered successfully!");
                  return resolve("Employee registered successfully!");
                }
              }
            );
          }
        );
      });
    });
  });
};

const getRoutes = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT R.*, BS1.Province AS OriginProvince, BS2.Province AS DestinationProvince, BS1.Name AS OriginBusStop, BS2.Name AS DestinationBusStop, S.*, B.Capacity, B.Type
       FROM ROUTES R
       JOIN BUS_STOPS BS1 ON R.Origin = BS1.BusStopID
       JOIN BUS_STOPS BS2 ON R.Destination = BS2.BusStopID
       JOIN SCHEDULES S ON S.RouteID = R.RouteID 
       JOIN BUSES B ON B.BusID = S.BusID`,
      (err, routes) => {
        if (err) {
          console.error("Error querying the database:", err.message);
          return reject("Error querying the database.");
        }
        console.log(routes);
        resolve(routes);
      }
    );
  });
};

const getOneRoute = (id) => {
  console.log("fc", id);
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT R.*, BS1.Province AS OriginProvince, BS2.Province AS DestinationProvince, 
      BS1.Name AS OriginBusStop, BS2.Name AS DestinationBusStop, S.*, B.Capacity, B.Type 
      FROM ROUTES R 
      JOIN BUS_STOPS BS1 ON R.Origin = BS1.BusStopID 
      JOIN BUS_STOPS BS2 ON R.Destination = BS2.BusStopID 
      JOIN SCHEDULES S ON S.RouteID = R.RouteID 
      JOIN BUSES B ON B.BusID = S.BusID 
      WHERE R.RouteID = ?`,
      [id],
      (err, routes) => {
        if (err) {
          console.error("Error querying the database:", err.message);
          return reject("Error querying the database.");
        }
        console.log(routes);
        resolve(routes);
      }
    );
  });
};

const deleteRoute = (id) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM ROUTES WHERE RouteID = ?`, [id], (err) => {
      if (err) {
        console.error("Error querying the database:", err.message);
        return reject("Error querying the database.");
      }
      resolve(); // Call resolve when query is successful
    });
  });
};

const historyEmp = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT *
      FROM BOOKINGS B
      JOIN CUSTOMERS C ON B.CustomerID = C.CustomerID
      JOIN SCHEDULES S ON S.ScheduleID = B.ScheduleID
      JOIN ROUTES R ON R.RouteID = S.RouteID
      JOIN BUSES BU ON BU.BusID = S.BusID`,
      (err, history) => {
        if (err) {
          console.error("Error querying the database:", err.message);
          return reject("Error querying the database.");
        }
        console.log(history);
        resolve(history);
      }
    );
  });
};

export {
  registerCustomer,
  login,
  createEmployee,
  getRoutes,
  deleteRoute,
  getOneRoute,
  historyEmp,
};
