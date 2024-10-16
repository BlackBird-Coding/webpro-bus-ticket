import db from "./db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

db.serialize(() => {
  // Insert data into BUS_STOPS table (Thai locations)
  db.run(
    `INSERT INTO BusStops (Name, Address, Subprovince, Province) VALUES
  ('สถานีขนส่งกรุงเทพฯ', '123 ถ.บรมราชชนนี', 'ตลิ่งชัน', 'กรุงเทพมหานคร'),
  ('สถานีขนส่งเชียงใหม่', '456 ถ.ห้วยแก้ว', 'เมืองเชียงใหม่', 'เชียงใหม่'),
  ('สถานีขนส่งภูเก็ต', '789 ถ.พังงา', 'เมืองภูเก็ต', 'ภูเก็ต'),
  ('สถานีขนส่งพัทยา', '101 ถ.สุขุมวิท', 'บางละมุง', 'ชลบุรี'),
  ('สถานีขนส่งอยุธยา', '202 ถ.โรจนะ', 'พระนครศรีอยุธยา', 'พระนครศรีอยุธยา'),
  ('สถานีขนส่งหัวหิน', '303 ถ.เพชรเกษม', 'หัวหิน', 'ประจวบคีรีขันธ์'),
  ('สถานีขนส่งกระบี่', '404 ถ.มหาราช', 'เมืองกระบี่', 'กระบี่'),
  ('ท่าเรือเกาะสมุย', '505 ถ.ทวีราษฎร์ภักดี', 'เกาะสมุย', 'สุราษฎร์ธานี'),
  ('สถานีขนส่งเชียงราย', '606 ถ.พหลโยธิน', 'เมืองเชียงราย', 'เชียงราย'),
  ('สถานีขนส่งหาดใหญ่', '707 ถ.เพชรเกษม', 'หาดใหญ่', 'สงขลา'),
  ('สถานีขนส่งขอนแก่น', '808 ถ.มิตรภาพ', 'เมืองขอนแก่น', 'ขอนแก่น'),
  ('สถานีขนส่งอุดรธานี', '909 ถ.โพศรี', 'เมืองอุดรธานี', 'อุดรธานี'),
  ('สถานีขนส่งนครราชสีมา', '1010 ถ.มิตรภาพ', 'เมืองนครราชสีมา', 'นครราชสีมา'),
  ('สถานีขนส่งสุราษฎร์ธานี', '1111 ถ.ตลาดใหม่', 'เมืองสุราษฎร์ธานี', 'สุราษฎร์ธานี'),
  ('สถานีขนส่งอุบลราชธานี', '1212 ถ.ชยางกูร', 'เมืองอุบลราชธานี', 'อุบลราชธานี');`
  );

  // Insert data into ROUTES table
  db.run(
    `INSERT INTO Routes (Origin, Destination, RouteName) VALUES
  (1, 2, 'กรุงเทพฯ - เชียงใหม่'),
  (2, 1, 'เชียงใหม่ - กรุงเทพฯ'),
  (1, 3, 'กรุงเทพฯ - ภูเก็ต'),
  (3, 1, 'ภูเก็ต - กรุงเทพฯ'),
  (1, 4, 'กรุงเทพฯ - พัทยา'),
  (4, 1, 'พัทยา - กรุงเทพฯ'),
  (1, 5, 'กรุงเทพฯ - อยุธยา'),
  (5, 1, 'อยุธยา - กรุงเทพฯ'),
  (1, 6, 'กรุงเทพฯ - หัวหิน'),
  (6, 1, 'หัวหิน - กรุงเทพฯ'),
  (1, 7, 'กรุงเทพฯ - กระบี่'),
  (7, 1, 'กระบี่ - กรุงเทพฯ'),
  (2, 9, 'เชียงใหม่ - เชียงราย'),
  (9, 2, 'เชียงราย - เชียงใหม่'),
  (1, 10, 'กรุงเทพฯ - หาดใหญ่');`
  );

  // Insert data into BUSES table
  db.run(
    `INSERT INTO Buses (Name, Type) VALUES
  ('มะลิ', 'ปรับอากาศ 1ชั้น'),
  ('ปุกปุย', 'VIP'),
  ('ฟ้าใส', 'ปรับอากาศ 2ชั้น'),
  ('ขนมปัง', 'VIP'),
  ('พายุ', 'ปรับอากาศ 1ชั้น'),
  ('โมจิ', 'VIP'),
  ('ดาวเรือง', 'ปรับอากาศ 2ชั้น'),
  ('มังคุด', 'VIP'),
  ('ไข่มุก', 'ปรับอากาศ 1ชั้น'),
  ('ซูชิ', 'VIP'),
  ('ทะเล', 'ปรับอากาศ 2ชั้น'),
  ('โอริโอ้', 'VIP'),
  ('พริกไทย', 'ปรับอากาศ 1ชั้น'),
  ('วาฟเฟิล', 'VIP'),
  ('ลูกแก้ว', 'ปรับอากาศ 2ชั้น');`
  );

  // Insert data into SCHEDULES table
  db.run(`
      INSERT INTO Schedules (RouteID, BusID, ScheduleName, EmployeeID, DepartureTime, ArrivalTime, Price, Description)
      VALUES
  (1, 1, 'กรุงเทพฯ - เชียงใหม่', 1, '2025-03-01 08:00:00', '2025-03-01 20:00:00', 800, 'รถโดยสารปรับอากาศ 1ชั้นไปเชียงใหม่'),
  (2, 2, 'เชียงใหม่ - กรุงเทพฯ', 5, '2025-03-02 09:00:00', '2025-03-02 21:00:00', 850, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (3, 3, 'กรุงเทพฯ - ภูเก็ต', 9, '2025-03-03 07:00:00', '2025-03-03 22:00:00', 1200, 'รถโดยสารปรับอากาศ 2ชั้นไปภูเก็ต'),
  (4, 4, 'ภูเก็ต - กรุงเทพฯ', 13, '2025-03-04 08:00:00', '2025-03-04 23:00:00', 1250, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (5, 5, 'กรุงเทพฯ - พัทยา', 17, '2025-03-05 10:00:00', '2025-03-05 13:00:00', 200, 'รถโดยสารปรับอากาศ 1ชั้นไปพัทยา'),
  (6, 6, 'พัทยา - กรุงเทพฯ', 1, '2025-03-05 15:00:00', '2025-03-05 18:00:00', 220, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (7, 7, 'กรุงเทพฯ - อยุธยา', 5, '2025-03-06 09:00:00', '2025-03-06 11:00:00', 100, 'รถโดยสารปรับอากาศ 2ชั้นไปอยุธยา'),
  (8, 8, 'อยุธยา - กรุงเทพฯ', 9, '2025-03-06 13:00:00', '2025-03-06 15:00:00', 110, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (9, 9, 'กรุงเทพฯ - หัวหิน', 13, '2025-03-07 10:00:00', '2025-03-07 14:00:00', 300, 'รถโดยสารปรับอากาศ 1ชั้นไปหัวหิน'),
  (10, 10, 'หัวหิน - กรุงเทพฯ', 17, '2025-03-07 16:00:00', '2025-03-07 20:00:00', 320, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (11, 11, 'กรุงเทพฯ - กระบี่', 1, '2025-03-08 06:00:00', '2025-03-08 22:00:00', 1000, 'รถโดยสารปรับอากาศ 2ชั้นไปกระบี่'),
  (12, 12, 'กระบี่ - กรุงเทพฯ', 5, '2025-03-09 07:00:00', '2025-03-09 23:00:00', 1050, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (13, 13, 'เชียงใหม่ - เชียงราย', 9, '2025-03-10 09:00:00', '2025-03-10 12:00:00', 250, 'รถโดยสารปรับอากาศ 1ชั้นไปเชียงราย'),
  (14, 14, 'เชียงราย - เชียงใหม่', 13, '2025-03-10 14:00:00', '2025-03-10 17:00:00', 270, 'รถโดยสารวีไอพีไปเชียงใหม่'),
  (15, 15, 'กรุงเทพฯ - หาดใหญ่', 17, '2025-03-11 18:00:00', '2025-03-12 10:00:00', 1100, 'รถโดยสารปรับอากาศ 2ชั้นไปหาดใหญ่'),
  (1, 2, 'กรุงเทพฯ - เชียงใหม่', 1, '2025-03-12 07:00:00', '2025-03-12 19:00:00', 820, 'รถโดยสารวีไอพีไปเชียงใหม่'),
  (2, 3, 'เชียงใหม่ - กรุงเทพฯ', 5, '2025-03-13 08:00:00', '2025-03-13 20:00:00', 870, 'รถโดยสารปรับอากาศ 2ชั้นไปกรุงเทพฯ'),
  (3, 4, 'กรุงเทพฯ - ภูเก็ต', 9, '2025-03-14 06:00:00', '2025-03-14 21:00:00', 1220, 'รถโดยสารวีไอพีไปภูเก็ต'),
  (4, 5, 'ภูเก็ต - กรุงเทพฯ', 13, '2025-03-15 07:00:00', '2025-03-15 22:00:00', 1270, 'รถโดยสารปรับอากาศ 1ชั้นไปกรุงเทพฯ'),
  (5, 6, 'กรุงเทพฯ - พัทยา', 17, '2025-03-16 09:00:00', '2025-03-16 12:00:00', 210, 'รถโดยสารวีไอพีไปพัทยา'),
  (6, 7, 'พัทยา - กรุงเทพฯ', 1, '2025-03-16 14:00:00', '2025-03-16 17:00:00', 230, 'รถโดยสารปรับอากาศ 2ชั้นไปกรุงเทพฯ'),
  (7, 8, 'กรุงเทพฯ - อยุธยา', 5, '2025-03-17 08:00:00', '2025-03-17 10:00:00', 110, 'รถโดยสารวีไอพีไปอยุธยา'),
  (8, 9, 'อยุธยา - กรุงเทพฯ', 9, '2025-03-17 12:00:00', '2025-03-17 14:00:00', 120, 'รถโดยสารปรับอากาศ 1ชั้นไปกรุงเทพฯ'),
  (9, 10, 'กรุงเทพฯ - หัวหิน', 13, '2025-03-18 09:00:00', '2025-03-18 13:00:00', 310, 'รถโดยสารวีไอพีไปหัวหิน'),
  (10, 11, 'หัวหิน - กรุงเทพฯ', 17, '2025-03-18 15:00:00', '2025-03-18 19:00:00', 330, 'รถโดยสารปรับอากาศ 2ชั้นไปกรุงเทพฯ'),
  (11, 12, 'กรุงเทพฯ - กระบี่', 1, '2025-03-19 05:00:00', '2025-03-19 21:00:00', 1020, 'รถโดยสารวีไอพีไปกระบี่'),
  (12, 13, 'กระบี่ - กรุงเทพฯ', 5, '2025-03-20 06:00:00', '2025-03-20 22:00:00', 1070, 'รถโดยสารปรับอากาศ 1ชั้นไปกรุงเทพฯ'),
  (13, 14, 'เชียงใหม่ - เชียงราย', 9, '2025-03-21 08:00:00', '2025-03-21 11:00:00', 260, 'รถโดยสารวีไอพีไปเชียงราย'),
  (14, 15, 'เชียงราย - เชียงใหม่', 13, '2025-03-21 13:00:00', '2025-03-21 16:00:00', 280, 'รถโดยสารปรับอากาศ 2ชั้นไปเชียงใหม่'),
  (15, 1, 'กรุงเทพฯ - หาดใหญ่', 17, '2025-03-22 17:00:00', '2025-03-23 09:00:00', 1120, 'รถโดยสารปรับอากาศ 1ชั้นไปหาดใหญ่'),
  (1, 3, 'กรุงเทพฯ - เชียงใหม่', 1, '2025-03-23 06:00:00', '2025-03-23 18:00:00', 840, 'รถโดยสารปรับอากาศ 2ชั้นไปเชียงใหม่'),
  (2, 4, 'เชียงใหม่ - กรุงเทพฯ', 5, '2025-03-24 07:00:00', '2025-03-24 19:00:00', 890, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (3, 5, 'กรุงเทพฯ - ภูเก็ต', 9, '2025-03-25 05:00:00', '2025-03-25 20:00:00', 1240, 'รถโดยสารปรับอากาศ 1ชั้นไปภูเก็ต'),
  (4, 6, 'ภูเก็ต - กรุงเทพฯ', 13, '2025-03-26 06:00:00', '2025-03-26 21:00:00', 1290, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (5, 7, 'กรุงเทพฯ - พัทยา', 17, '2025-03-27 08:00:00', '2025-03-27 11:00:00', 220, 'รถโดยสารปรับอากาศ 2ชั้นไปพัทยา'),
  (6, 8, 'พัทยา - กรุงเทพฯ', 1, '2025-03-27 13:00:00', '2025-03-27 16:00:00', 240, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (7, 9, 'กรุงเทพฯ - อยุธยา', 5, '2025-03-28 07:00:00', '2025-03-28 09:00:00', 120, 'รถโดยสารปรับอากาศ 1ชั้นไปอยุธยา'),
  (8, 10, 'อยุธยา - กรุงเทพฯ', 9, '2025-03-28 11:00:00', '2025-03-28 13:00:00', 130, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (9, 11, 'กรุงเทพฯ - หัวหิน', 13, '2025-03-29 08:00:00', '2025-03-29 12:00:00', 320, 'รถโดยสารปรับอากาศ 2ชั้นไปหัวหิน'),
  (10, 12, 'หัวหิน - กรุงเทพฯ', 17, '2025-03-29 14:00:00', '2025-03-29 18:00:00', 340, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (11, 13, 'กรุงเทพฯ - กระบี่', 1, '2025-03-30 04:00:00', '2025-03-30 20:00:00', 1040, 'รถโดยสารปรับอากาศ 1ชั้นไปกระบี่'),
  (12, 14, 'กระบี่ - กรุงเทพฯ', 5, '2025-03-31 05:00:00', '2025-03-31 21:00:00', 1090, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (13, 15, 'เชียงใหม่ - เชียงราย', 9, '2025-04-01 07:00:00', '2025-04-01 10:00:00', 270, 'รถโดยสารปรับอากาศ 2ชั้นไปเชียงราย'),
  (14, 1, 'เชียงราย - เชียงใหม่', 13, '2025-04-01 12:00:00', '2025-04-01 15:00:00', 290, 'รถโดยสารปรับอากาศ 1ชั้นไปเชียงใหม่'),
  (15, 2, 'กรุงเทพฯ - หาดใหญ่', 17, '2025-04-02 16:00:00', '2025-04-03 08:00:00', 1140, 'รถโดยสารวีไอพีไปหาดใหญ่'),
  (1, 3, 'กรุงเทพฯ - เชียงใหม่', 1, '2025-04-03 05:00:00', '2025-04-03 17:00:00', 860, 'รถโดยสารปรับอากาศ 2ชั้นไปเชียงใหม่'),
  (2, 4, 'เชียงใหม่ - กรุงเทพฯ', 5, '2025-04-04 06:00:00', '2025-04-04 18:00:00', 910, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (3, 5, 'กรุงเทพฯ - ภูเก็ต', 9, '2025-04-05 04:00:00', '2025-04-05 19:00:00', 1260, 'รถโดยสารปรับอากาศ 1ชั้นไปภูเก็ต'),
  (4, 6, 'ภูเก็ต - กรุงเทพฯ', 13, '2025-04-06 05:00:00', '2025-04-06 20:00:00', 1310, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (5, 7, 'กรุงเทพฯ - พัทยา', 17, '2025-04-07 07:00:00', '2025-04-07 10:00:00', 230, 'รถโดยสารปรับอากาศ 2ชั้นไปพัทยา'),
  (6, 8, 'พัทยา - กรุงเทพฯ', 1, '2025-04-07 12:00:00', '2025-04-07 15:00:00', 250, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (7, 9, 'กรุงเทพฯ - อยุธยา', 5, '2025-04-08 06:00:00', '2025-04-08 08:00:00', 130, 'รถโดยสารปรับอากาศ 1ชั้นไปอยุธยา'),
  (8, 10, 'อยุธยา - กรุงเทพฯ', 9, '2025-04-08 10:00:00', '2025-04-08 12:00:00', 140, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (9, 11, 'กรุงเทพฯ - หัวหิน', 13, '2025-04-09 07:00:00', '2025-04-09 11:00:00', 330, 'รถโดยสารปรับอากาศ 2ชั้นไปหัวหิน'),
  (10, 12, 'หัวหิน - กรุงเทพฯ', 17, '2025-04-09 13:00:00', '2025-04-09 17:00:00', 350, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (11, 13, 'กรุงเทพฯ - กระบี่', 1, '2025-04-10 03:00:00', '2025-04-10 19:00:00', 1060, 'รถโดยสารปรับอากาศ 1ชั้นไปกระบี่'),
  (12, 14, 'กระบี่ - กรุงเทพฯ', 5, '2025-04-11 04:00:00', '2025-04-11 20:00:00', 1110, 'รถโดยสารวีไอพีไปกรุงเทพฯ'),
  (13, 15, 'เชียงใหม่ - เชียงราย', 9, '2025-04-12 06:00:00', '2025-04-12 09:00:00', 280, 'รถโดยสารปรับอากาศ 2ชั้นไปเชียงราย'),
  (14, 1, 'เชียงราย - เชียงใหม่', 13, '2025-04-12 11:00:00', '2025-04-12 14:00:00', 300, 'รถโดยสารปรับอากาศ 1ชั้นไปเชียงใหม่'),
  (15, 2, 'กรุงเทพฯ - หาดใหญ่', 17, '2025-04-13 15:00:00', '2025-04-14 07:00:00', 1160, 'รถโดยสารวีไอพีไปหาดใหญ่'),
  (1, 3, 'กรุงเทพฯ - เชียงใหม่', 1, '2025-04-14 04:00:00', '2025-04-14 16:00:00', 880, 'รถโดยสารปรับอากาศ 2ชั้นไปเชียงใหม่'),
  (2, 4, 'เชียงใหม่ - กรุงเทพฯ', 5, '2025-04-15 05:00:00', '2025-04-15 17:00:00', 930, 'รถโดยสารวีไอพีไปกรุงเทพฯ');`);

  // Insert data into BOOKINGS table
  db.run(
    `INSERT INTO Bookings (CustomerID, ScheduleID, SeatID, PaymentID, BookingTime, Status, Name) VALUES
  (21, 1, 1, 1, '2025-02-28 10:00:00', 1, 'สมชาย ใจดี'),
  (22, 2, 2, 2, '2025-02-29 11:00:00', 1, 'สมหญิง รักเรียน'),
  (23, 3, 3, 3, '2025-03-01 09:00:00', 1, 'วิชัย เก่งกาจ'),
  (24, 4, 4, 4, '2025-03-02 08:30:00', 1, 'นภา สดใส'),
  (25, 5, 5, 5, '2025-03-03 14:00:00', 1, 'ประสิทธิ์ มั่นคง'),
  (26, 6, 6, 6, '2025-03-03 16:00:00', 1, 'พิมพ์ใจ งามข้า'),
  (27, 7, 7, 7, '2025-03-04 08:00:00', 1, 'อนุชา ชาญชัย'),
  (28, 8, 8, 8, '2025-03-04 10:00:00', 1, 'รัตนา พรหมเดช'),
  (29, 9, 9, 9, '2025-03-05 09:00:00', 1, 'สุรชัย แสนดี'),
  (30, 10, 10, 10, '2025-03-05 11:00:00', 1, 'กัลยา มีสุข'),
  (31, 11, 11, 11, '2025-03-06 07:00:00', 1, 'ธีรพงษ์ ศรีวิไล'),
  (32, 12, 12, 12, '2025-03-07 08:00:00', 1, 'สุนิสา แก้วตา'),
  (33, 13, 13, 13, '2025-03-08 10:00:00', 1, 'ภาณุ ทองดี'),
  (34, 14, 14, 14, '2025-03-08 12:00:00', 1, 'วรรณา สุขสันต์'),
  (35, 15, 15, 15, '2025-03-09 15:00:00', 0, 'อภิชาติ ใจเย็น');`
  );

  // Insert data into PAYMENTS table
  db.run(
    `INSERT INTO Payment (Amount, PaymentTime, PaymentMethod) VALUES
  (800, '2025-02-28 10:00:00', 'บัตรเครดิต'),
  (850, '2025-02-29 11:00:00', 'เงินสด'),
  (1200, '2025-03-01 09:00:00', 'โอนเงิน'),
  (1250, '2025-03-02 08:30:00', 'บัตรเดบิต'),
  (200, '2025-03-03 14:00:00', 'เงินสด'),
  (220, '2025-03-03 16:00:00', 'บัตรเครดิต'),
  (100, '2025-03-04 08:00:00', 'โอนเงิน'),
  (110, '2025-03-04 10:00:00', 'เงินสด'),
  (300, '2025-03-05 09:00:00', 'บัตรเดบิต'),
  (320, '2025-03-05 11:00:00', 'บัตรเครดิต'),
  (1000, '2025-03-06 07:00:00', 'โอนเงิน'),
  (1050, '2025-03-07 08:00:00', 'เงินสด'),
  (250, '2025-03-08 10:00:00', 'บัตรเครดิต'),
  (270, '2025-03-08 12:00:00', 'บัตรเดบิต'),
  (1100, '2025-03-09 15:00:00', 'โอนเงิน');`
  );

  db.run(`
    INSERT INTO Seats (SeatCode) VALUES
('A1'), ('B1'), ('C1'), ('D1'),
('A2'), ('B2'), ('C2'), ('D2'),
('A3'), ('B3'), ('C3'), ('D3'),
('A4'), ('B4'), ('C4'), ('D4'),
('A5'), ('B5'), ('C5'), ('D5'),
('A6'), ('B6'), ('C6'), ('D6'),
('A7'), ('B7'), ('C7'), ('D7'),
('A8'), ('B8'), ('C8'), ('D8'),
('A9'), ('B9'), ('C9'), ('D9');`);

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
    fname: "สมหญิง",
    lname: "ใจดี",
    phone: "0812345678",
    Gender: "หญิง",
    DOB: "1990-05-15",
    username: "somying_j",
    email: "somying.j@example.com",
    password: "securePass789",
  },
  {
    fname: "นภา",
    lname: "สว่างใจ",
    phone: "0834567890",
    Gender: "หญิง",
    DOB: "1992-07-30",
    username: "napha_s",
    email: "napha.s@example.com",
    password: "brightMind789",
  },
  {
    fname: "ธนกร",
    lname: "มั่งมี",
    phone: "0845678901",
    Gender: "ชาย",
    DOB: "1987-03-18",
    username: "thanakorn_m",
    email: "thanakorn.m@example.com",
    password: "richGuy101",
  },
  {
    fname: "พิมพ์ใจ",
    lname: "รักสงบ",
    phone: "0856789012",
    Gender: "หญิง",
    DOB: "1993-09-25",
    username: "pimjai_r",
    email: "pimjai.r@example.com",
    password: "peaceLover22",
  },
  {
    fname: "สมศักดิ์",
    lname: "ใจกล้า",
    phone: "0867890123",
    Gender: "ชาย",
    DOB: "1986-11-10",
    username: "somsak_j",
    email: "somsak.j@example.com",
    password: "braveheart33",
  },
  {
    fname: "รัชนี",
    lname: "สุขสันต์",
    phone: "0878901234",
    Gender: "หญิง",
    DOB: "1991-02-14",
    username: "ratchanee_s",
    email: "ratchanee.s@example.com",
    password: "happyGirl44",
  },
  {
    fname: "ประสิทธิ์",
    lname: "แสนดี",
    phone: "0889012345",
    Gender: "ชาย",
    DOB: "1989-06-07",
    username: "prasit_s",
    email: "prasit.s@example.com",
    password: "goodGuy555",
  },
  {
    fname: "มาลี",
    lname: "วรรณา",
    phone: "0890123456",
    Gender: "หญิง",
    DOB: "1994-04-01",
    username: "malee_w",
    email: "malee.w@example.com",
    password: "flowerPower66",
  },
  {
    fname: "สุรชัย",
    lname: "ชาญชัย",
    phone: "0901234567",
    Gender: "ชาย",
    DOB: "1984-08-20",
    username: "surachai_c",
    email: "surachai.c@example.com",
    password: "expertGuy77",
  },
  {
    fname: "วรรณา",
    lname: "สุขใจ",
    phone: "0912345678",
    Gender: "หญิง",
    DOB: "1995-12-12",
    username: "wanna_s",
    email: "wanna.s@example.com",
    password: "happyMind88",
  },
  {
    fname: "อนุชา",
    lname: "รักชาติ",
    phone: "0923456789",
    Gender: "ชาย",
    DOB: "1983-01-05",
    username: "anucha_r",
    email: "anucha.r@example.com",
    password: "patriot999",
  },
  {
    fname: "สุดา",
    lname: "ใจเย็น",
    phone: "0934567890",
    Gender: "หญิง",
    DOB: "1996-07-07",
    username: "suda_j",
    email: "suda.j@example.com",
    password: "coolMind100",
  },
  {
    fname: "ชัยวัฒน์",
    lname: "นักพัฒนา",
    phone: "0945678901",
    Gender: "ชาย",
    DOB: "1982-03-30",
    username: "chaiwat_n",
    email: "chaiwat.n@example.com",
    password: "developer101",
  },
  {
    fname: "นิภา",
    lname: "ศรีสุข",
    phone: "0956789012",
    Gender: "หญิง",
    DOB: "1997-11-11",
    username: "nipha_s",
    email: "nipha.s@example.com",
    password: "happyLife202",
  },
  {
    fname: "ปิยะดา",
    lname: "รักธรรม",
    phone: "0978901234",
    Gender: "หญิง",
    DOB: "1998-09-09",
    username: "piyada_r",
    email: "piyada.r@example.com",
    password: "dharmeLover404",
  },
  {
    fname: "วีระ",
    lname: "กล้าหาญ",
    phone: "0989012345",
    Gender: "ชาย",
    DOB: "1980-02-14",
    username: "weera_k",
    email: "weera.k@example.com",
    password: "braveSoul505",
  },
  {
    fname: "สุนันทา",
    lname: "ใจบุญ",
    phone: "0990123456",
    Gender: "หญิง",
    DOB: "1999-06-06",
    username: "sunanta_j",
    email: "sunanta.j@example.com",
    password: "kindHeart606",
  },
];

const mockEmployees = [
  {
    fname: "สมชาย",
    lname: "ทองใบ",
    phone: "0611234567",
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
    lname: "สุขสันต์",
    phone: "0622345678",
    Gender: "หญิง",
    role: "พนักงานตรวจตั๋ว",
    hireDate: "2020-03-15",
    DOB: "1990-05-30",
    username: "wandee_s",
    email: "ticketCheck@example.com",
    password: "ticketCheck789",
  },
  {
    fname: "ประสิทธิ์",
    lname: "ใจดี",
    phone: "0633456789",
    Gender: "ชาย",
    role: "พนักงานหน้าเคาน์เตอร์",
    hireDate: "2018-07-01",
    DOB: "1988-12-15",
    username: "prasit_j",
    email: "counterStaff@example.com",
    password: "counterStaff101",
  },
  {
    fname: "นภา",
    lname: "มั่นคง",
    phone: "0644567890",
    Gender: "หญิง",
    role: "พนักงานจัดการเที่ยวรถ",
    hireDate: "2021-02-28",
    DOB: "1992-08-10",
    username: "napha_m",
    email: "scheduleManager@example.com",
    password: "scheduleManager202",
  },
  {
    fname: "สมศักดิ์",
    lname: "ขยันยิ่ง",
    phone: "0655678901",
    Gender: "ชาย",
    role: "พนักงานขับรถ",
    hireDate: "2017-11-20",
    DOB: "1987-03-25",
    username: "somsak_k",
    email: "somsak.k@example.com",
    password: "hardWorker303",
  },
  {
    fname: "รัตนา",
    lname: "ใจเย็น",
    phone: "0666789012",
    Gender: "หญิง",
    role: "พนักงานตรวจตั๋ว",
    hireDate: "2019-09-05",
    DOB: "1993-06-18",
    username: "rattana_j",
    email: "rattana.j@example.com",
    password: "calmMind404",
  },
  {
    fname: "วิชัย",
    lname: "รักงาน",
    phone: "0677890123",
    Gender: "ชาย",
    role: "พนักงานหน้าเคาน์เตอร์",
    hireDate: "2020-05-15",
    DOB: "1986-01-30",
    username: "wichai_r",
    email: "wichai.r@example.com",
    password: "lovesWork505",
  },
  {
    fname: "สุนิสา",
    lname: "เก่งกาจ",
    phone: "0688901234",
    Gender: "หญิง",
    role: "พนักงานจัดการเที่ยวรถ",
    hireDate: "2018-03-10",
    DOB: "1991-11-05",
    username: "sunisa_k",
    email: "sunisa.k@example.com",
    password: "skillful606",
  },
  {
    fname: "อนุชา",
    lname: "ชำนาญ",
    phone: "0699012345",
    Gender: "ชาย",
    role: "พนักงานขับรถ",
    hireDate: "2021-01-02",
    DOB: "1989-07-20",
    username: "anucha_c",
    email: "anucha.c@example.com",
    password: "expertDriver707",
  },
  {
    fname: "พิมพ์ใจ",
    lname: "ยิ้มแย้ม",
    phone: "0610123456",
    Gender: "หญิง",
    role: "พนักงานตรวจตั๋ว",
    hireDate: "2017-08-15",
    DOB: "1994-04-12",
    username: "pimjai_y",
    email: "pimjai.y@example.com",
    password: "smileyFace808",
  },
  {
    fname: "ธนกร",
    lname: "สุจริต",
    phone: "0621234567",
    Gender: "ชาย",
    role: "พนักงานหน้าเคาน์เตอร์",
    hireDate: "2019-06-30",
    DOB: "1984-09-08",
    username: "thanakorn_s",
    email: "thanakorn.s@example.com",
    password: "honestGuy909",
  },
  {
    fname: "มาลี",
    lname: "รอบคอบ",
    phone: "0632345678",
    Gender: "หญิง",
    role: "พนักงานจัดการเที่ยวรถ",
    hireDate: "2020-11-11",
    DOB: "1995-02-28",
    username: "malee_r",
    email: "malee.r@example.com",
    password: "carefulPlanner010",
  },
  {
    fname: "สุรชัย",
    lname: "แข็งแรง",
    phone: "0643456789",
    Gender: "ชาย",
    role: "พนักงานขับรถ",
    hireDate: "2018-04-20",
    DOB: "1983-12-15",
    username: "surachai_k",
    email: "surachai.k@example.com",
    password: "strongDriver111",
  },
  {
    fname: "วรรณา",
    lname: "ตั้งใจ",
    phone: "0654567890",
    Gender: "หญิง",
    role: "พนักงานตรวจตั๋ว",
    hireDate: "2021-07-01",
    DOB: "1996-10-10",
    username: "wanna_t",
    email: "wanna.t@example.com",
    password: "focusedMind212",
  },
  {
    fname: "ชัยวัฒน์",
    lname: "มุ่งมั่น",
    phone: "0665678901",
    Gender: "ชาย",
    role: "พนักงานหน้าเคาน์เตอร์",
    hireDate: "2019-12-15",
    DOB: "1982-05-20",
    username: "chaiwat_m",
    email: "chaiwat.m@example.com",
    password: "determinedStaff313",
  },
  {
    fname: "นิภา",
    lname: "เอื้อเฟื้อ",
    phone: "0676789012",
    Gender: "หญิง",
    role: "พนักงานจัดการเที่ยวรถ",
    hireDate: "2020-08-30",
    DOB: "1997-03-15",
    username: "nipha_e",
    email: "nipha.e@example.com",
    password: "helpfulPlanner414",
  },
  {
    fname: "สมบูรณ์",
    lname: "ปลอดภัย",
    phone: "0687890123",
    Gender: "ชาย",
    role: "พนักงานขับรถ",
    hireDate: "2018-02-28",
    DOB: "1981-11-05",
    username: "somboon_p",
    email: "somboon.p@example.com",
    password: "safeDriver515",
  },
  {
    fname: "ปิยะดา",
    lname: "ยิ้มแย้ม",
    phone: "0698901234",
    Gender: "หญิง",
    role: "พนักงานตรวจตั๋ว",
    hireDate: "2021-05-10",
    DOB: "1998-07-25",
    username: "piyada_y",
    email: "piyada.y@example.com",
    password: "smileyChecker616",
  },
  {
    fname: "วีระ",
    lname: "รวดเร็ว",
    phone: "0609012345",
    Gender: "ชาย",
    role: "พนักงานหน้าเคาน์เตอร์",
    hireDate: "2019-10-01",
    DOB: "1980-09-30",
    username: "weera_r",
    email: "weera.r@example.com",
    password: "quickCounter717",
  },
  {
    fname: "สุนันทา",
    lname: "ละเอียด",
    phone: "0620123456",
    Gender: "หญิง",
    role: "พนักงานจัดการเที่ยวรถ",
    hireDate: "2020-01-15",
    DOB: "1999-04-05",
    username: "sunanta_l",
    email: "sunanta.l@example.com",
    password: "detailOriented818",
  },
];

const insertMockUsers = async () => {
  const insertUser = async (user, userType) => {
    try {
      const hashedPassword = await bcrypt.hash("password", saltRounds);

      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO Users (Username, Email, Password, UserType) VALUES (?, ?, ?, ?)`,
          [user.username, user.email, hashedPassword, userType],
          function (err) {
            if (err) {
              reject(err);
              return;
            }
            resolve(this.lastID);
          }
        );
      });
    } catch (err) {
      console.error("Error hashing the password:", err.message);
      throw err;
    }
  };

  const insertEmployee = (userId, employee) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Employees (UserID, Fname, Lname, Phone, Gender, DOB, Role, HireDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          employee.fname,
          employee.lname,
          employee.phone,
          employee.Gender,
          employee.DOB,
          employee.role,
          employee.hireDate,
        ],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  };

  const insertCustomer = (userId, customer) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Customers (UserID, Fname, Lname, Phone, Gender, DOB) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          userId,
          customer.fname,
          customer.lname,
          customer.phone,
          customer.Gender,
          customer.DOB,
        ],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  };

  try {
    for (const employee of mockEmployees.toSorted()) {
      const userId = await insertUser(employee, "Employee");
      await insertEmployee(userId, employee);
      console.log(
        `Employee ${employee.fname} ${employee.lname} registered successfully!`
      );
    }

    for (const customer of mockCustomers.toSorted()) {
      const userId = await insertUser(customer, "Customer");
      await insertCustomer(userId, customer);
      console.log(
        `Customer ${customer.fname} ${customer.lname} registered successfully!`
      );
    }
  } catch (err) {
    console.error("Error inserting mock users:", err.message);
  }
};

// Call the function to insert mock users and employees
insertMockUsers().then(() => console.log("All mock users inserted"));
