<script>
  import { Router, Route, links } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  import Test from "./routes/Test.svelte";
  import Register from "./routes/Register.svelte";
  import History from "./routes/History.svelte";
  import Login from "./routes/Login.svelte";
  import Trip from "./routes/Booking/Trip.svelte";
  import Seat from "./routes/Booking/Seat.svelte";
  import Payment from "./routes/Payment.svelte";
  import Find from "./routes/Booking/Find.svelte";
  import Howto from "./routes/Howto.svelte";
  import History_Emp from "./routes/History_Emp.svelte";
  import ContactForm from "./routes/ContactForm.svelte";
  import TicketDetails from "./routes/TicketDetails.svelte";
  import ManageBus_Emp from "./routes/ManageBus_Emp/ManageBus_Emp.svelte";
  import AddBus from "./routes/ManageBus_Emp/AddBus.svelte";
  import AddStation from "./routes/ManageBus_Emp/AddStation.svelte";
  import EditBus from "./routes/ManageBus_Emp/EditBus.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Footer from "./lib/Footer.svelte";
</script>

<body class="flex min-h-screen flex-col" use:links>
  <Navbar></Navbar>
  <main class="flex-1">
    <Router >
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
      <Route path="/ManageBus_Emp" component={ManageBus_Emp} />
      <Route path="/AddBus" component={AddBus} />
      <Route path="/AddStation" component={AddStation} />
      <Route path="/History_Emp" component={History_Emp} />
      <Route path="/ticket-details" component={TicketDetails} />
      <Route path="/EditBus" component={EditBus} />
    </Router>
  </main>
<Footer></Footer>
</body>

