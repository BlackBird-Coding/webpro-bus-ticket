<script context="module">
  import { writable } from "svelte/store";
  import { navigate } from "svelte-routing";
  import Swal from "sweetalert2";

  function createUserStore() {
    const { subscribe, set, update } = writable({
      isLoggedIn: false,
      userType: "", // New field for userType
      role: "", // Role specific to employees (e.g., admin, manager)
      isLoading: true,
    });

    return {
      subscribe,
      login: (userData) =>
        set({
          isLoggedIn: true,
          userType: userData?.userType || "", // Ensure we store the correct userType
          role: userData?.details?.role || "", // Ensure we store the correct role
          isLoading: false,
        }),
      logout: () => {
        return new Promise((resolve, reject) => {
          set({ isLoggedIn: false, userType: "", role: "", isLoading: true });
          fetch("/api/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (res.status === 200) {
                set({
                  isLoggedIn: false,
                  userType: "",
                  role: "",
                  isLoading: false,
                });
                navigate("/", { replace: true });
                Swal.fire({
                  icon: "success",
                  title: "ออกจากระบบสำเร็จ",
                  showConfirmButton: false,
                  timer: 1500,
                });
                resolve();
              } else {
                set({ isLoggedIn: true, isLoading: false }); // Revert state if logout fails
                Swal.fire({
                  icon: "error",
                  title: "ออกจากระบบไม่สำเร็จ",
                  text: "กรุณาลองใหม่อีกครั้ง",
                });
                reject();
              }
            })
            .catch((error) => {
              set({ isLoggedIn: true, isLoading: false }); // Revert state if request fails
              reject(error);
            });
        });
      },
      checkAuth: async () => {
        set((state) => ({ ...state, isLoading: true }));
        try {
          const response = await fetch("/api/user");
          if (!response.ok) throw new Error("Auth check failed");
          const data = await response.json();
          set({
            isLoggedIn: !!data.user,
            userType: data.user?.userType || "", // Set the correct userType from API
            role: data.user?.details?.role || "", // Set the correct role from API
            isLoading: false,
          });
        } catch (error) {
          console.error("Error checking auth:", error);
          set({ isLoggedIn: false, userType: "", role: "", isLoading: false });
        }
      },
    };
  }

  export const userStore = createUserStore();
</script>
