/**
 * Sidebar states
 */
import { reactive, ref } from "vue";

const sidebarActiveItem = ref('');
const pageTitle = ref('');

function setSidebarActiveItemState(routeName: string) {
    sidebarActiveItem.value = routeName;
}

function setPageTitleState(title: string) {
    pageTitle.value = title;
}

export {
    setSidebarActiveItemState,
    sidebarActiveItem,
    setPageTitleState,
    pageTitle
}

