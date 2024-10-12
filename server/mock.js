import db from "./db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

db.serialize(() => {
  // Insert data into BUS_STOPS table (Thai locations)
  db.run(
    `INSERT INTO BusStops (Name, Address, Subprovince, Province, Latitude, Longitude) VALUES
    ('สถานีขนส่งผู้โดยสารกรุงเทพฯ (จตุจักร)', '999 ถ.กำแพงเพชร 2 แขวงจตุจักร', 'จตุจักร', 'กรุงเทพมหานคร', 13.8133, 100.5487),
    ('สถานีขนส่งผู้โดยสารภาคเหนือ (เชียงใหม่)', '165 ถ.กำแพงเพชร ต.วัดเกต', 'เมืองเชียงใหม่', 'เชียงใหม่', 18.7861, 99.0148),
    ('สถานีขนส่งผู้โดยสาร จ.ขอนแก่น แห่งที่ 3', 'ถ.ศรีจันทร์ ต.ในเมือง', 'เมืองขอนแก่น', 'ขอนแก่น', 16.4321, 102.8236),
    ('สถานีขนส่งผู้โดยสารจังหวัดอุบลราชธานี แห่งที่ 1', '145 ถ.แจ้งสนิท ต.ในเมือง', 'เมืองอุบลราชธานี', 'อุบลราชธานี', 15.2313, 104.8574),
    ('สถานีขนส่งผู้โดยสารจังหวัดนครราชสีมา แห่งที่ 2', '86 ถ.สุรนารายณ์ ต.ในเมือง', 'เมืองนครราชสีมา', 'นครราชสีมา', 14.9730, 102.0876),
    ('สถานีขนส่งผู้โดยสารจังหวัดพิษณุโลก', '46/6 ถ.พิษณุโลก-หล่มสัก ต.หัวรอ', 'เมืองพิษณุโลก', 'พิษณุโลก', 16.8087, 100.2590),
    ('สถานีขนส่งผู้โดยสารจังหวัดสุราษฎร์ธานี', '130/149 ม.1 ถ.สุราษฎร์-นาสาร ต.ขุนทะเล', 'เมืองสุราษฎร์ธานี', 'สุราษฎร์ธานี', 9.1048, 99.3017),
    ('สถานีขนส่งผู้โดยสารจังหวัดหาดใหญ่', '24 ถ.เพชรเกษม ต.หาดใหญ่', 'หาดใหญ่', 'สงขลา', 7.0086, 100.4747),
    ('สถานีขนส่งผู้โดยสารจังหวัดนครสวรรค์', '1025/3 ม.10 ถ.พหลโยธิน ต.นครสวรรค์ตก', 'เมืองนครสวรรค์', 'นครสวรรค์', 15.6961, 100.1210),
    ('สถานีขนส่งผู้โดยสารจังหวัดอุดรธานี', '999 ม.5 ถ.รอบเมือง ต.หมากแข้ง', 'เมืองอุดรธานี', 'อุดรธานี', 17.3940, 102.7871);`
  );

  // Insert data into ROUTES table
  db.run(
    `INSERT INTO Routes (RouteName, Origin, Destination, Distance) VALUES
    ('กรุงเทพฯ - เชียงใหม่', 1, 2, 695),
    ('กรุงเทพฯ - ขอนแก่น', 1, 3, 449),
    ('กรุงเทพฯ - อุบลราชธานี', 1, 4, 629),
    ('กรุงเทพฯ - นครราชสีมา', 1, 5, 259),
    ('กรุงเทพฯ - พิษณุโลก', 1, 6, 377),
    ('กรุงเทพฯ - สุราษฎร์ธานี', 1, 7, 645),
    ('กรุงเทพฯ - หาดใหญ่', 1, 8, 933),
    ('กรุงเทพฯ - นครสวรรค์', 1, 9, 240),
    ('กรุงเทพฯ - อุดรธานี', 1, 10, 564),
    ('เชียงใหม่ - ขอนแก่น', 2, 3, 792);`
  );

  // Insert data into BUSES table
  db.run(
    `INSERT INTO Buses (BusName, Capacity, Type) VALUES
    ('กรุงเทพ-เชียงใหม่ 1', 40, 'VIP'),
    ('กรุงเทพ-ขอนแก่น 1', 50, 'ปรับอากาศ 1 ชั้น'),
    ('กรุงเทพ-อุบล 1', 45, 'ปรับอากาศ 1 ชั้น'),
    ('กรุงเทพ-โคราช 1', 50, 'ปรับอากาศ 2 ชั้น'),
    ('กรุงเทพ-พิษณุโลก 1', 45, 'ปรับอากาศ 1 ชั้น'),
    ('กรุงเทพ-สุราษฎร์ 1', 40, 'VIP'),
    ('กรุงเทพ-หาดใหญ่ 1', 40, 'VIP'),
    ('กรุงเทพ-นครสวรรค์ 1', 50, 'ปรับอากาศ 2 ชั้น'),
    ('กรุงเทพ-อุดรธานี 1', 45, 'ปรับอากาศ 3 ชั้น'),
    ('เชียงใหม่-ขอนแก่น 1', 40, 'ปรับอากาศ 1 ชั้น');`
  );

  // Insert data into SCHEDULES table
  db.run(
    `INSERT INTO Schedules (RouteID, BusID, EmployeeID, DepartureTime, ArrivalTime, Price, Description, Image) VALUES
    (1, 1, 1, '2024-10-13 20:00:00', '2024-10-14 06:00:00', 800.00, 'รถ VIP กรุงเทพ-เชียงใหม่ เดินทางสบาย', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/LT_471_%28LTZ_1471%29_Arriva_London_New_Routemaster_%2819522859218%29.jpg/2560px-LT_471_%28LTZ_1471%29_Arriva_London_New_Routemaster_%2819522859218%29.jpg'),
    (2, 2, 12, '2024-10-13 21:00:00', '2024-10-14 05:00:00', 500.00, 'รถปรับอากาศชั้น 1 กรุงเทพ-ขอนแก่น', 'https://patsornchaitour.com/wp-content/uploads/2022/06/%E0%B9%80%E0%B8%8A%E0%B9%88%E0%B8%B2%E0%B8%A1%E0%B8%B4%E0%B8%99%E0%B8%B4%E0%B8%9A%E0%B8%B1%E0%B8%AA.jpg'),
    (3, 3, 1, '2024-10-13 20:30:00', '2024-10-14 06:30:00', 600.00, 'รถปรับอากาศชั้น 1 กรุงเทพ-อุบลราชธานี', 'https://www.khaosod.co.th/wpapp/uploads/2022/09/image1-201.jpg'),
    (4, 4, 12, '2024-10-13 22:00:00', '2024-10-14 03:00:00', 300.00, 'รถปรับอากาศชั้น 1 กรุงเทพ-นครราชสีมา', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVqb-DHc5iUvONhPVbL4RVRyZN6NOqlKTs7Y_3zMSyXOBDlDlmxN6mBpxTxDxyh3aB4Qc&usqp=CAU'),
    (6, 6, 1, '2024-10-13 19:00:00', '2024-10-14 07:00:00', 900.00, 'รถ VIP กรุงเทพ-สุราษฎร์ธานี', 'https://osabus.com/wp-content/uploads/2024/06/OsaBus-Setra-bus-for-rent-europe-1.jpg'),
    (7, 7, 12, '2024-10-13 18:00:00', '2024-10-14 08:00:00', 1000.00, 'รถ VIP กรุงเทพ-หาดใหญ่', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpId-2bkjAQmP-pTAjsipLj_mAHkPNrDmtbg&s'),
    (8, 8, 1, '2024-10-13 23:30:00', '2024-10-14 03:30:00', 250.00, 'รถปรับอากาศชั้น 2 กรุงเทพ-นครสวรรค์', 'https://osabus.com/wp-content/uploads/2022/09/49-MAN-1024x768.jpeg'),
    (9, 9, 12, '2024-10-13 21:00:00', '2024-10-14 06:00:00', 550.00, 'รถปรับอากาศชั้น 1 กรุงเทพ-อุดรธานี', 'https://cdn.britannica.com/72/146072-050-124A752E/Greyhound-bus.jpg'),
    (10, 10, 1, '2024-10-13 08:00:00', '2024-10-13 22:00:00', 700.00, 'รถปรับอากาศชั้น 1 เชียงใหม่-ขอนแก่น', 'https://immanuel.sa.edu.au/wp-content/uploads/2024/06/Bus_website-scaled.jpg');`
  );

  // Insert data into BOOKINGS table
  db.run(
    `INSERT INTO Bookings (CustomerID, ScheduleID, BookingDate, SeatNumber, Status) VALUES
    (8, 1, '2024-10-10 10:00:00', 15, 'ยืนยันแล้ว'),
    (9, 2, '2024-10-11 11:30:00', 22, 'ยืนยันแล้ว'),
    (10, 3, '2024-10-09 09:15:00', 7, 'ยืนยันแล้ว'),
    (11, 4, '2024-10-12 14:00:00', 30, 'รอการชำระเงิน'),
    (13, 5, '2024-10-10 16:45:00', 18, 'ยืนยันแล้ว'),
    (14, 6, '2024-10-11 13:20:00', 25, 'ยืนยันแล้ว'),
    (15, 7, '2024-10-09 10:30:00', 10, 'ยืนยันแล้ว'),
    (16, 8, '2024-10-12 17:00:00', 40, 'รอการชำระเงิน'),
    (17, 9, '2024-10-10 15:15:00', 5, 'ยืนยันแล้ว'),
    (17, 10, '2024-10-11 12:45:00', 33, 'ยืนยันแล้ว');`
  );

  // Insert data into PAYMENTS table
  db.run(
    `INSERT INTO Payment (BookingID, Amount, PaymentTime, PaymentMethod) VALUES
    (1, 800.00, '2024-10-10 10:15:00', 'บัตรเครดิต'),
    (2, 500.00, '2024-10-11 11:45:00', 'โอนเงิน'),
    (3, 600.00, '2024-10-09 09:30:00', 'บัตรเดบิต'),
    (5, 400.00, '2024-10-10 17:00:00', 'โอนเงิน'),
    (6, 900.00, '2024-10-11 13:35:00', 'บัตรเครดิต'),
    (7, 1000.00, '2024-10-09 10:45:00', 'บัตรเดบิต'),
    (9, 550.00, '2024-10-10 15:30:00', 'โอนเงิน'),
    (10, 700.00, '2024-10-11 13:00:00', 'บัตรเครดิต'),
    (1, 800.00, '2024-10-12 09:00:00', 'โอนเงิน'),
    (2, 500.00, '2024-10-13 10:30:00', 'บัตรเดบิต');`
  );

  console.log("Mock data inserted successfully.");
});

// Mock customers and employees data
const mockCustomers = [
  {
    fname: "กิตติ",
    lname: "ยั่งยืน",
    phone: "0801234567",
    Gender: "ชาย",
    DOB: "1985-10-22",
    username: "kitti_y",
    email: "kitti.y@example.com",
    password: "password123",
  },
  {
    fname: "สมศรี",
    lname: "ใจดี",
    phone: "0812345678",
    Gender: "หญิง",
    DOB: "1990-05-15",
    username: "somsri_j",
    email: "somsri.j@example.com",
    password: "password234",
  },
  {
    fname: "วิชัย",
    lname: "รักเดินทาง",
    phone: "0823456789",
    Gender: "ชาย",
    DOB: "1988-12-03",
    username: "wichai_r",
    email: "wichai.r@example.com",
    password: "password345",
  },
  {
    fname: "นภา",
    lname: "สดใส",
    phone: "0834567890",
    Gender: "หญิง",
    DOB: "1992-07-30",
    username: "napa_s",
    email: "napa.s@example.com",
    password: "password456",
  },
  {
    fname: "ประสิทธิ์",
    lname: "มั่นคง",
    phone: "0845678901",
    Gender: "ชาย",
    DOB: "1983-02-18",
    username: "prasit_m",
    email: "prasit.m@example.com",
    password: "password567",
  },
  {
    fname: "รัตนา",
    lname: "ยิ้มแย้ม",
    phone: "0856789012",
    Gender: "หญิง",
    DOB: "1995-09-10",
    username: "rattana_y",
    email: "rattana.y@example.com",
    password: "password678",
  },
  {
    fname: "สมศักดิ์",
    lname: "แข็งแรง",
    phone: "0867890123",
    Gender: "ชาย",
    DOB: "1980-11-25",
    username: "somsak_k",
    email: "somsak.k@example.com",
    password: "password789",
  },
  {
    fname: "พรทิพย์",
    lname: "ใจเย็น",
    phone: "0878901234",
    Gender: "หญิง",
    DOB: "1993-04-05",
    username: "porntip_j",
    email: "porntip.j@example.com",
    password: "password890",
  },
  {
    fname: "วีระ",
    lname: "กล้าหาญ",
    phone: "0889012345",
    Gender: "ชาย",
    DOB: "1987-08-20",
    username: "weera_k",
    email: "weera.k@example.com",
    password: "password901",
  },
  {
    fname: "สุนิสา",
    lname: "รักธรรมชาติ",
    phone: "0890123456",
    Gender: "หญิง",
    DOB: "1991-01-12",
    username: "sunisa_r",
    email: "sunisa.r@example.com",
    password: "password012",
  },
];

const mockEmployees = [
  {
    fname: "สมชาย",
    lname: "ทองใบ",
    phone: "0901234567",
    Gender: "ชาย",
    role: "พนักงานขับรถ",
    hireDate: "2019-01-10",
    DOB: "1985-10-22",
    username: "somchai_t",
    email: "somchai.t@example.com",
    password: "password456",
  },
  {
    fname: "วันดี",
    lname: "มีสุข",
    phone: "0912345678",
    Gender: "หญิง",
    role: "พนักงานหน้าเคาน์เตอร์",
    hireDate: "2020-03-15",
    DOB: "1990-05-30",
    username: "wandee_m",
    email: "wandee.m@example.com",
    password: "password789",
  },
  {
    fname: "ประเสริฐ",
    lname: "ใจกล้า",
    phone: "0923456789",
    Gender: "ชาย",
    role: "พนักงานจัดการเที่ยวรถ",
    hireDate: "2018-07-22",
    DOB: "1988-12-15",
    username: "prasert_j",
    email: "prasert.j@example.com",
    password: "password012",
  },
  {
    fname: "นารี",
    lname: "สวัสดี",
    phone: "0934567890",
    Gender: "หญิง",
    role: "พนักงานตรวจตั๋ว",
    hireDate: "2021-02-01",
    DOB: "1993-09-05",
    username: "naree_s",
    email: "naree.s@example.com",
    password: "password345",
  },
  {
    fname: "สมศักดิ์",
    lname: "รักดี",
    phone: "0945678901",
    Gender: "ชาย",
    role: "พนักงานขับรถ",
    hireDate: "2017-11-30",
    DOB: "1982-03-18",
    username: "somsak_r",
    email: "somsak.r@example.com",
    password: "password678",
  },
  {
    fname: "สุดา",
    lname: "ใจงาม",
    phone: "0956789012",
    Gender: "หญิง",
    role: "พนักงานหน้าเคาน์เตอร์",
    hireDate: "2019-09-10",
    DOB: "1991-07-25",
    username: "suda_j",
    email: "suda.j@example.com",
    password: "password901",
  },
  {
    fname: "วิชัย",
    lname: "เก่งกาจ",
    phone: "0967890123",
    Gender: "ชาย",
    role: "พนักงานจัดการเที่ยวรถ",
    hireDate: "2020-05-20",
    DOB: "1987-11-12",
    username: "wichai_k",
    email: "wichai.k@example.com",
    password: "password234",
  },
  {
    fname: "รัตนา",
    lname: "ยิ้มสวย",
    phone: "0978901234",
    Gender: "หญิง",
    role: "พนักงานตรวจตั๋ว",
    hireDate: "2018-04-05",
    DOB: "1989-01-30",
    username: "rattana_y",
    email: "rattana.y@example.com",
    password: "password567",
  },
];

const insertMockUsers = () => {
  // Insert mock employees
  mockEmployees.forEach((employee) => {
    const {
      fname,
      lname,
      phone,
      Gender,
      role,
      hireDate,
      DOB,
      username,
      email,
      password,
    } = employee;

    bcrypt.hash("password", saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing the password:", err.message);
        return;
      }

      db.run(
        `INSERT INTO Users (Username, Email, Password, UserType) VALUES (?, ?, ?, 'Employee')`,
        [username, email, hashedPassword],
        function (err) {
          if (err) {
            console.error("Error inserting user:", err.message);
            return;
          }

          const userId = this.lastID;

          db.run(
            `INSERT INTO Employees (UserID, Fname, Lname, Phone, Gender, DOB, Role, HireDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, fname, lname, phone, Gender, DOB, role, hireDate],
            (err) => {
              if (err) {
                console.error("Error inserting employee:", err.message);
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

  // Insert mock customers
  mockCustomers.forEach((customer) => {
    const { fname, lname, phone, Gender, DOB, username, email, password } =
      customer;

    bcrypt.hash("password", saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing the password:", err.message);
        return;
      }

      db.run(
        `INSERT INTO Users (Username, Email, Password, UserType) VALUES (?, ?, ?, 'Customer')`,
        [username, email, hashedPassword],
        function (err) {
          if (err) {
            console.error("Error inserting user:", err.message);
            return;
          }

          const userId = this.lastID;

          db.run(
            `INSERT INTO Customers (UserID, Fname, Lname, Phone, Gender, DOB) VALUES (?, ?, ?, ?, ?, ?)`,
            [userId, fname, lname, phone, Gender, DOB],
            (err) => {
              if (err) {
                console.error("Error inserting customer:", err.message);
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
};

// Call the function to insert mock users and employees
insertMockUsers();
