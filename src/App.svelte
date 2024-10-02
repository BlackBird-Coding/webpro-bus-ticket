<script>
  import { Router, Route, links } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import Test from './routes/Test.svelte';
</script>

<main use:links>
  <Router>
    <button class="bg-slate-400 text-white p-5  border-4 rounded-md"><a href="/test">test</a></button>
    <button class="bg-green-600 text-white p-5  border-4 rounded-md"><a href="/">home</a></button>
    <Route path="/test" component={Test} />
    <Route path="/"><Home /></Route>
  </Router>
</main>
