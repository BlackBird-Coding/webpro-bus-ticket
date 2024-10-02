<script>
  import { Router, Route, links } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import Test from './routes/Test.svelte';
  import Register from './routes/Register.svelte';
  import History from './routes/History.svelte';
  import Login from './routes/Login.svelte';
</script>

<main use:links>
  <Router>
    <nav class="bg-orange-400 w-full h-20 text-xl flex justify-between content-center items-center px-5">
      <a href="/">Home</a>
      <div class="flex gap-3">
          <a href="/history">ประวัติการจอง</a>
          <a href="/register">สมัครสมาชิก</a>
          <a href="/login">เข้าสู่ระบบ</a>
      </div>
    </nav>
    <Route path="/register" component={Register} />
    <Route path="/history" component={History} />
    <Route path="/login" component={Login} />
    <Route path="/"><Home /></Route>
  </Router>
</main>

<style>
  a {
      color: white;
  }
  a:hover {
      text-decoration: underline;
  }
</style>
