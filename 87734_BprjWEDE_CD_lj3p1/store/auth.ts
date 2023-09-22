import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        userId: null,
    }),

    actions: {
        setUserId(userId: any) {
            this.userId = userId;
        },

        clearUserId() {
            this.userId = null;
        },
    },

    getters: {
        getUserId(): any {
            return this.userId;
        }
    }
});
