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
    // Query the USERS table to find the user by email
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

      // Compare the provided password with the hashed password in the database
      bcrypt.compare(password, user.Password, (err, result) => {
        if (err) {
          console.error(err.message);
          reject("Error comparing passwords.");
          return;
        }

        if (result) {
          const { Password, ...userWithoutPassword } = user;

          // Check if the user is a customer or an employee
          if (user.UserType === "customer") {
            // Query the CUSTOMERS table to get additional customer information
            db.get(
              `SELECT * FROM CUSTOMERS WHERE CustomerID = ?`,
              [user.CustomerID],
              (err, customer) => {
                if (err) {
                  console.error(err.message);
                  reject("Error querying customer information.");
                  return;
                }

                resolve({
                  userType: "customer",
                  details: { ...userWithoutPassword, customer },
                });
              }
            );
          } else if (user.UserType === "employee") {
            // Query the EMPLOYEES table to get additional employee information
            db.get(
              `SELECT * FROM EMPLOYEES WHERE EmployeeID = ?`,
              [user.EmployeeID],
              (err, employee) => {
                if (err) {
                  console.error(err.message);
                  reject("Error querying employee information.");
                  return;
                }

                resolve({
                  userType: "employee",
                  details: { ...userWithoutPassword, employee },
                });
              }
            );
          } else {
            reject("Unknown user type.");
          }
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
      `SELECT R.*, BS1.Province AS OriginProvince, BS2.Province AS DestinationProvince, BS1.Name AS OriginBusStop, BS2.Name AS DestinationBusStop, S.*, B.Capacity, B.Type
       FROM ROUTES R
       JOIN BUSSTOPS BS1 ON R.Origin = BS1.BusStopID
       JOIN BUSSTOPS BS2 ON R.Destination = BS2.BusStopID
       JOIN SCHEDULES S ON S.RouteID = R.RouteID 
       JOIN BUSES B ON B.BusID = S.BusID`,
      (err, routes) => {
        if (err) {
          console.error("Error querying the database:", err.message);
          return reject("Error querying the database.");
        }
        console.log(routes)
        resolve(routes);
      }
    );
  });
};

const getOneRoute = (id) => {
  console.log('fc', id)
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT R.*, BS1.Province AS OriginProvince, BS2.Province AS DestinationProvince, 
      BS1.Subprovince AS OriginSubprovince, BS2.Subprovince AS DestinationSubprovince, 
      BS1.Address AS OriginAddress, BS2.Address AS DestinationAddress, 
      BS1.Name AS OriginBusStop, BS2.Name AS DestinationBusStop, S.*, B.*,
      U.UserCode, E.fname, E.lname, E.Role, E.Phone
      FROM ROUTES R 
      JOIN BUSSTOPS BS1 ON R.Origin = BS1.BusStopID 
      JOIN BUSSTOPS BS2 ON R.Destination = BS2.BusStopID 
      JOIN SCHEDULES S ON S.RouteID = R.RouteID 
      JOIN BUSES B ON B.BusID = S.BusID 
      JOIN EMPLOYEES E ON E.UserID = S.EmployeeID
      JOIN USERS U ON E.UserID = U.UserID
      WHERE R.RouteID = ?`,
      [id],
      (err, routes) => {
        if (err) {
          console.error("Error querying the database:", err.message);
          return reject("Error querying the database.");
        }
        console.log(routes)
        resolve(routes);
      }
    );
  });
};

const getBusStops = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT *
       FROM BusStops`,
      (err, BusStops) => {
        if (err) {
          console.error("Error querying the database:", err.message);
          return reject("Error querying the database.");
        }
        console.log(BusStops)
        resolve(BusStops);
      }
    );
  });
};

const deleteRoute = (id) => {
  console.log(id)
  return new Promise((resolve, reject) => {
    db.run(
      `DELETE FROM ROUTES WHERE RouteID = ?`,
      [id],
      (err) => {
        if (err) {
          console.error("Error querying the database:", err.message);
          return reject("Error querying the database.");
        }
        resolve(); // Call resolve when query is successful
      }
    );
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
        console.log(history)
        resolve(history);
      }
    );
  });
};

const getEmployees = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT UserCode
      FROM Users
      WHERE UserType="Employee"`,
      (err, row) => {
        if (err) {
          console.error("Error querying the database:", err.message);
          return reject("Error querying the database.");
        }
        console.log(row)
        resolve(row);
      }
    );
  });
}


export { registerCustomer, login, createEmployee, getRoutes, deleteRoute, getOneRoute, historyEmp, getBusStops, getEmployees};
