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
    db.get(`SELECT * FROM USERS WHERE Email = ?`, [email], (err, user) => {
      if (err) {
        console.error(err.message);
        reject("Error querying the database.");
        return;
      }

      if (!user) {
        reject("Email not found.");
        return;
      }

      bcrypt.compare(password, user.Password, (err, result) => {
        if (err) {
          console.error(err.message);
          reject("Error comparing passwords.");
          return;
        }

        if (result) {
          const { Password, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject("Incorrect password.");
        }
      });
    });
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
      `SELECT R.*, BS1.Province AS OriginProvince, BS2.Province AS DestinationProvince, BS1.Name AS OriginBusStop, BS2.Name AS DestinationBusStop
       FROM ROUTES R
       JOIN BUS_STOPS BS1 ON R.Origin = BS1.BusStopID
       JOIN BUS_STOPS BS2 ON R.Destination = BS2.BusStopID`,
      (err, routes) => {
        if (err) {
          console.error("Error querying the database:", err.message);
          return reject("Error querying the database.");
        }
        resolve(routes);
      }
    );
  });
};

export { registerCustomer, login, createEmployee, getRoutes };
