<script>
  import { Router, Route, links } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import Test from "./routes/Test.svelte";
  import Register from "./routes/Register.svelte";
  import History from "./routes/BookingHistory/History.svelte";
  import Login from "./routes/Login.svelte";
  import Trip from "./routes/Booking/Trip.svelte";
  import Seat from "./routes/Booking/Seat.svelte";
  import Payment from "./routes/Booking/Payment.svelte";
  import Find from "./routes/Booking/Find.svelte";
  import Howto from "./routes/Howto.svelte";
  import History_Emp from "./routes/History_Emp.svelte";
  import ContactForm from "./routes/ContactForm.svelte";
  import TicketDetails from "./routes/BookingHistory/TicketDetails.svelte";
  import ManageBus_Emp from "./routes/ManageBus_Emp/ManageBus_Emp.svelte";
  import AddStation from "./routes/ManageBus_Emp/AddStation.svelte";
  import AddRoute from "./routes/ManageBus_Emp/AddRoute.svelte";
  import AddBus from "./routes/ManageBus_Emp/AddBus.svelte";
  import EditSchedule from "./routes/ManageBus_Emp/EditSchedule.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Footer from "./lib/Footer.svelte";
  import Reschedule from "./routes/ReBooking/Reschedule.svelte";
  import ReTrip from "./routes/ReBooking/ReTrip.svelte";
  import ReSeat from "./routes/ReBooking/ReSeat.svelte";
  import RePayment from "./routes/ReBooking/RePayment.svelte";
  import UserAuthCheck from "./lib/components/UserAuthCheck.svelte";
  import Scan from "./routes/Scan.svelte";

  import TripEmp from "./routes/Booking_Emp/Trip.svelte";
  import SeatEmp from "./routes/Booking_Emp/Seat.svelte";
  import PaymentEmp from "./routes/Booking_Emp/Payment.svelte";
  import FindEmp from "./routes/Booking_Emp/Find.svelte";

  // import { onMount } from "svelte";
  // import { userStore } from "./lib/stores/userStore.svelte";

  // onMount(() => {
  //   userStore.checkAuth();
  //   console.log(userStore.role);
  // });
</script>

<body class="flex min-h-screen flex-col" use:links>
  <Navbar></Navbar>
  <main class="flex-1">
    <Router>
      <Route path="/howto" component={Howto} />
      <Route path="/register" component={Register} />
      <Route path="/history" component={History} />
      <Route path="/login" component={Login} />
      <Route path="/booking/trip" component={Trip} />
      <Route path="/seat" component={Seat} />
      <Route path="/payment" component={Payment} />
      <Route path="/booking/find" component={Find} />
      <Route path="/contact" component={ContactForm} />
      <Route path="/"><Home /></Route>
      <!-- <UserAuthCheck requiredUserType="employee"> -->
      <Route path="/ManageBus_Emp" component={ManageBus_Emp} />
      <Route path="/AddStation" component={AddStation} />
      <Route path="/AddBus" component={AddBus} />
      <Route path="/AddRoute" component={AddRoute} />
      <Route path="/History_Emp" component={History_Emp} />
      <Route path="/EditSchedule" component={EditSchedule} />
      <!-- </UserAuthCheck> -->
      <Route path="/ticket-details" component={TicketDetails} />
      <Route path="/reschedule" component={Reschedule} />
      <Route path="/rebooking/trip" component={ReTrip} />
      <Route path="/rebooking/seat" component={ReSeat} />
      <Route path="/rebooking/payment" component={RePayment} />

      <Route path="/booking_emp/trip" component={TripEmp} />
      <Route path="/booking_emp/seat" component={SeatEmp} />
      <Route path="/booking_emp/payment" component={PaymentEmp} />
      <Route path="/booking_emp/find" component={FindEmp} />

      <Route path="/scan" component={Scan} />
    </Router>
  </main>
  <Footer></Footer>
</body>
