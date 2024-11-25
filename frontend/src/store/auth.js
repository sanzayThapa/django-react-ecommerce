import { create } from 'zustand'
import {mountStoreDevtools} from 'simple-zustand-devtools'

const useAuthStore = create((set, get) => ({

    allUserData: null,
    loading: false,

    user: () => ({

        user_id: get().allUserData?.user_id || null,
    username: get().allUserData?.username || null,

    }),

// setUser: (user) => set({ allUserData: user }),

    setUser: (user) => {
        if (user && typeof user === 'object') {
            set({ allUserData: user });
        } else {
            console.error('Invalid user data provided to setUser');
        }
    },    



setLoading: (loading) => set({ loading }),
setLoggedIn: () => get().allUserData !== null,

}))

if (import.meta.env.DEV) {
    mountStoreDevtools('Store', useAuthStore)

}

export { useAuthStore }