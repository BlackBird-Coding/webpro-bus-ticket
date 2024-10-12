<script>
  import { onMount, onDestroy } from "svelte";
  import { userStore } from "@/lib/stores/userStore.svelte";

  // Props
  export let requiredRole = ""; // The role required to view the content (e.g., "admin", "manager")
  export let requiredUserType = ""; // The userType required to view the content (e.g., "employee", "customer")
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

  // Derived state
  $: userState = $userStore;
  $: isLoggedIn = userState?.isLoggedIn ?? false;
  $: userRole = userState?.details?.role ?? "";
  $: userType = userState?.userType ?? "";

  // Determine if the user has the correct type and role
  $: shouldShow = isShow ? isLoggedIn : !isLoggedIn;

  // Role check: both userType and role should match required conditions
  $: shouldShowRole =
    (!requiredRole || userRole === requiredRole) &&
    (!requiredUserType || userType === requiredUserType);
</script>

{#if error}
  <p>Error: {error}</p>
{:else if !isLoading && shouldShow && shouldShowRole}
  <slot />
{/if}
