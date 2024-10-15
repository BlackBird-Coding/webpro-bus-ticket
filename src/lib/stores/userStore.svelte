<script context="module">
  import { writable } from "svelte/store";

  function createUserStore() {
    const { subscribe, set, update } = writable({
      isLoggedIn: false,
      userType: "",
      role: "",
      isLoading: true,
    });

    return {
      subscribe,
      setUser: (userData) => {
        set({
          isLoggedIn: true,
          userType: userData.userType || "",
          role: userData.role || "",
          isLoading: false,
        });
      },
      clearUser: () => {
        set({
          isLoggedIn: false,
          userType: "",
          role: "",
          isLoading: false,
        });
      },
      setLoading: (isLoading) => {
        update((state) => ({ ...state, isLoading }));
      },
      checkAuth: async () => {
        update((state) => ({ ...state, isLoading: true }));
        try {
          const response = await fetch("/api/user");
          if (!response.ok) throw new Error("Auth check failed");
          const userData = await response.json();
          if (userData && Object.keys(userData).length > 0) {
            console.log("User data:", userData);
            set({
              isLoggedIn: true,
              userType: userData.user.userType || "",
              role: userData.user.details.role || "",
              isLoading: false,
            });
          } else {
            // If userData is empty, consider the user not logged in
            set({
              isLoggedIn: false,
              userType: "",
              role: "",
              isLoading: false,
            });
          }
        } catch (error) {
          console.error("Error checking auth:", error);
          set({
            isLoggedIn: false,
            userType: "",
            role: "",
            isLoading: false,
          });
        }
      },
    };
  }

  export const userStore = createUserStore();
</script>
