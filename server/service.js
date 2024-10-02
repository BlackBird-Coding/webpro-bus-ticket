import bcrypt from "bcrypt";

const registerCustomer = (fname, lname, phone, email, password) => {
  const saltRounds = 10;

  // First, check if the email already exists in the USERS table
  db.get(`SELECT * FROM USERS WHERE Email = ?`, [email], (err, user) => {
    if (err) {
      console.error(err.message);
      return;
    }

    if (user) {
      console.log("Email already exists. Please use another email.");
      return;
    }

    // Hash the password before storing it
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error(err.message);
        return;
      }

      // Insert the customer into the CUSTOMERS table
      db.run(
        `INSERT INTO CUSTOMERS (Fname, Lname, Phone, Email) VALUES (?, ?, ?, ?)`,
        [fname, lname, phone, email],
        function (err) {
          if (err) {
            console.error(err.message);
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
              } else {
                console.log("Customer registered successfully!");
              }
            }
          );
        }
      );
    });
  });
};

export { registerCustomer };
