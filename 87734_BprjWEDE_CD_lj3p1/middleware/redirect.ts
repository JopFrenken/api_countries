import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware(async (to: any, from: any) => {
    console.log('middleware test');

    // Access the authentication store
    const authStore = useAuthStore();

    // Check if 'userId' exists in the store
    if (!authStore.userId) {
        // Redirect the user to the login page
        await navigateTo('/login');
        return false;
    }

    // User is authenticated, continue with the route
    return true;
});
