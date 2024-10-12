import bcrypt from "bcrypt";
import db from "./db.js";

const registerCustomer = async (fname, lname, phone, email, password) => {
  const saltRounds = 10;

  try {
    // Check if the email already exists in the USERS table
    const user = await new Promise((resolve, reject) => {
      db.get(`SELECT * FROM Users WHERE Email = ?`, [email], (err, user) => {
        if (err) {
          reject("Error querying the database.");
        } else {
          resolve(user);
        }
      });
    });

    if (user) {
      throw new Error("Email already exists. Please use another email.");
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert customer details into CUSTOMERS table
    const customerId = await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Customers (Fname, Lname, Phone, Email) VALUES (?, ?, ?, ?)`,
        [fname, lname, phone, email],
        function (err) {
          if (err) {
            reject("Error inserting customer.");
          } else {
            resolve(this.lastID); // Return the newly inserted CustomerID
          }
        }
      );
    });

    // Insert user's login details into USERS table
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Users (Username, Email, Password, UserType, CustomerID) VALUES (?, ?, ?, 'customer', ?)`,
        [email, email, hashedPassword, customerId],
        (err) => {
          if (err) {
            reject("Error inserting user.");
          } else {
            resolve();
          }
        }
      );
    });

    console.log("Customer registered successfully!");
    return "Customer registered successfully!";
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
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

const createEmployee = async (
  fname,
  lname,
  phone,
  email,
  password,
  role,
  dob
) => {
  const saltRounds = 10;

  try {
    // Check if the email already exists in the USERS table
    const user = await new Promise((resolve, reject) => {
      db.get(`SELECT * FROM Users WHERE Email = ?`, [email], (err, user) => {
        if (err) {
          reject("Error querying the database.");
        } else {
          resolve(user);
        }
      });
    });

    if (user) {
      throw new Error("Email already exists. Please use another email.");
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert employee details into EMPLOYEES table
    const employeeId = await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Employees (Fname, Lname, Role, HireDate, DOB) 
         VALUES (?, ?, ?, date('now'), ?)`,
        [fname, lname, role, dob],
        function (err) {
          if (err) {
            reject("Error inserting employee.");
          } else {
            resolve(this.lastID); // Return the newly inserted EmployeeID
          }
        }
      );
    });

    // Insert user's login details into USERS table
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Users (Username, Email, Password, UserType, EmployeeID) 
         VALUES (?, ?, ?, 'employee', ?)`,
        [`${fname}.${lname}`, email, hashedPassword, employeeId],
        (err) => {
          if (err) {
            reject("Error inserting user.");
          } else {
            resolve();
          }
        }
      );
    });

    console.log("Employee registered successfully!");
    return "Employee registered successfully!";
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

const getRoutes = () => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT R.*, BS1.Province AS OriginProvince, BS2.Province AS DestinationProvince, BS1.Name AS OriginBusStop, BS2.Name AS DestinationBusStop, S.*, B.Capacity, B.Type
       FROM ROUTES R
       JOIN BUSStops BS1 ON R.Origin = BS1.BusStopID
       JOIN BUSStops BS2 ON R.Destination = BS2.BusStopID
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
      JOIN BUSStops BS1 ON R.Origin = BS1.BusStopID 
      JOIN BUSStops BS2 ON R.Destination = BS2.BusStopID 
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
