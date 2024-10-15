<script>
  import Search from "@/lib/Search.svelte";
  import Sidebar from "@/lib/Sidebar.svelte";
  import UserAuthCheck from "@/lib/components/UserAuthCheck.svelte";
</script>

<div class="flex ml-16">
  <UserAuthCheck redirectToLogin={true}>
    <Sidebar current={0}></Sidebar>
    <Search path="booking_emp/trip" />
  </UserAuthCheck>
</div>
