/**
 * Stores the state of the user (administrator).
 * 
 */
import { reactive, ref } from "vue";
import AuthRepository from '@/components/Auth/Repositories/AuthRepository'
import { useCookie } from "@vue-composable/cookie";
const { cookie, removeCookie } = useCookie("aToken");

const repository = new AuthRepository();
const isAuth = ref(false);
const user = reactive({
    data: null
});

/**
 * Get admin user from backend and set to frontend state
 */
async function getUser(): Promise<void> {
    // Return if auth
    if(isAuth.value) {
        return;
    }

    // Return if not set token
    if (!cookie.value || cookie.value === null) {
        isAuth.value = false;
        user.data = null;
        return;
    }
    
    // Get user state
    try {
        const response = await repository.getAdminUserByJwt(cookie.value as string);
        isAuth.value = response.auth;
        user.data = response.user;
    } catch (e) {
        const error = e as any;
        if(error.response.status) {
            removeCookie();
        }
        return;
    }
}

async function logout() {
    if(isAuth.value == false) {
        return;
    }
    removeCookie();
    isAuth.value = false;
    user.data = null;
}


function authAdminUser(userData: any) {
    isAuth.value = true;
    user.data = userData.user;
    cookie.value = userData.token
}

export {
    isAuth,
    user,
    getUser,
    authAdminUser,
    logout
}
