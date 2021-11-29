import { isAuth, getUser } from '@/app/States/AdminUserState';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import router from '@/router';
import { setSidebarActiveItemState, setPageTitleState } from '../States/PageState';

/**
 * Allow only authorized users
 */
function auth(to: RouteLocationNormalized, from: RouteLocationNormalized): void {
    if (!isAuth.value) {
        router.push({ name: 'login' });
    } 
}

/**
 * Allow only guest users
 */
function guest(to: RouteLocationNormalized, from: RouteLocationNormalized): void {
    console.log(isAuth.value)
    if (isAuth.value) {
        router.push({ name: 'home' });
    }
}


/**
 *  Get adminUserState when reload page or first initial 
 */
async function getAdminUserStateFromBackend(to: RouteLocationNormalized, from: RouteLocationNormalized): Promise<void> {
    await getUser();
}

/**
 * Set active item in sidebar
 */
function setSidebarActiveItem(to: RouteLocationNormalized, from: RouteLocationNormalized): void {
    setSidebarActiveItemState(to.matched[1].name as string);
}

/**
 * Set active item in sidebar
 */
function setPageTitle(to: RouteLocationNormalized, from: RouteLocationNormalized): void {
    setPageTitleState(to.matched[1].meta.title as string);
}


export {
    auth,
    guest,
    getAdminUserStateFromBackend,
    setSidebarActiveItem,
    setPageTitle
}