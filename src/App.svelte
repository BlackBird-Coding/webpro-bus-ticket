<script>
  import { Router, Route, links } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import Test from './routes/Test.svelte';
  import Register from './routes/Register.svelte';
</script>

<main use:links>
  <Router>
    <nav class="bg-blue-500 w-full h-20 flex justify-end content-center items-center pr-5">
        <div class="flex gap-3">
            <a href="/history">ประวัติการจอง</a>
            <a href="/register">สมัครสมาชิก</a>
            <a href="login">เข้าสู่ระบบ</a>
        </div>
    </nav>
    <Route path="/test" component={Test} />
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
