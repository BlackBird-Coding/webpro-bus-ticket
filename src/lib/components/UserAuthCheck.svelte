<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { userStore } from "@/lib/stores/userStore.svelte";

  // Props
  export let requiredRole = "";
  export let requiredUserType = "";
  export let showWhenLoggedIn = true;
  export let redirectToLogin = false;
  export let loginPath = "/login";

  // Reactive store values
  $: ({ isLoggedIn, userType, role, isLoading } = $userStore);

  // Determine if the content should be shown
  $: shouldShow =
    !isLoading &&
    showWhenLoggedIn === isLoggedIn &&
    (!requiredRole || role === requiredRole) &&
    (!requiredUserType || userType === requiredUserType);

  // Handle redirection
  $: {
    if (!isLoading && !isLoggedIn && showWhenLoggedIn && redirectToLogin) {
      navigate(loginPath, { replace: true });
    }
  }

  onMount(() => {
    userStore.checkAuth();
  });
</script>

{#if shouldShow}
  <slot />
{/if}

<!-- Debugging Section -->
<!-- <div>
  <h3>Debug Information:</h3>
  <p>User Role: {role}</p>
  <p>User Type: {userType}</p>
  <p>Is Logged In: {isLoggedIn}</p>
  <p>Show When Logged In: {showWhenLoggedIn}</p>
  <p>Should Show: {shouldShow}</p>
  <p>Is Loading: {isLoading}</p>
  <p>Redirect To Login: {redirectToLogin}</p>
</div> -->
