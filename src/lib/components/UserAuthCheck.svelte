<script>
  import { onMount, onDestroy } from "svelte";
  import { userStore } from "@/lib/stores/userStore.svelte";

  // Props
  export let role = ""; // The role required to view the content
  export let isShow = true; // true: show when logged in, false: show when logged out

  // State
  let isLoading = true;
  let error = null;

  let unsubscribe;

  onMount(() => {
    userStore.checkAuth().catch((e) => {
      error = e.message;
    });

    unsubscribe = userStore.subscribe((value) => {
      isLoading = value.isLoading;
    });
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });

  $: userState = $userStore;
  $: isLoggedIn = userState?.isLoggedIn ?? false;
  $: userRole = userState?.role ?? "";

  $: shouldShow = isShow ? isLoggedIn : !isLoggedIn;
  $: shouldShowRole = !role || userRole === role;
</script>

{#if error}
  <p>Error: {error}</p>
{:else if !isLoading && shouldShow && shouldShowRole}
  <slot />
{/if}
