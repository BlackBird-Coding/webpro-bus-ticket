<script>
  import Search from "@/lib/Search.svelte";
  import Sidebar from "@/lib/Sidebar.svelte";
</script>

<div class="flex ml-16">
  <Sidebar current={0}></Sidebar>
  <Search />
</div>
