import { isAuth, getUser } from '@/app/States/AdminUserState';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import router from '@/router';


/**
 * Allow only authorized users
 */
function auth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    if (!isAuth.value) {
        router.push({ name: 'login' });
    } else {
        next();
    }
}

/**
 * Allow only guest users
 */
function guest(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    console.log(isAuth.value)
    if (isAuth.value) {
        router.push({ name: 'home' });
    } else {
        next();
    }
}


/**
 *  Get adminUserState when reload page or first initial 
 */
async function getAdminUserStateFromBackend(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> {
    await getUser();
    next();
}


export {
    auth,
    guest,
    getAdminUserStateFromBackend
}