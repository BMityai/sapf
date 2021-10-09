import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import BadgeDirective from 'primevue/badgedirective';



// style
import '@/assets/css/style.less'
import 'primevue/resources/themes/saga-blue/theme.css'
// import 'primeflex/primeflex.css';
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

createApp(App)
    .use(PrimeVue)
    .use(ToastService)
    .use(ConfirmationService)
    .use(router)
    .directive('badge', BadgeDirective)
    .mount('#sap')
