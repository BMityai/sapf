
import router from "@/router";
import { ref, reactive, watch } from "vue";
import AuthRepository from '../Repositories/AuthRepository'
import { authAdminUser } from '@/app/States/AdminUserState'


/**
 * Init repository
 */
const repository = new AuthRepository();

/**
 * Init auth form
 */
const form = reactive({
    username: '',
    password: ''
});

/**
 * Init empty toast
 */

const toast = ref();

/**
 * Init defaul value
 */
const formIsSubmit = ref(false);

/**
 * Validate response
 */
const validateResponse = reactive({
    formIsValid: true,
    fields: {
        username: {
            isValid: true,
            message: ''
        },
        password: {
            isValid: true,
            message: ''
        }
    }
});

const setToast = (toastObject: any) => {
    toast.value = toastObject;
}

/**
 * Validate form
 */
const validate = () => {

    // Check is submit
    if (!formIsSubmit.value) return;

    // Set defaut value
    validateResponse.formIsValid = validateResponse.fields.username.isValid = validateResponse.fields.password.isValid = true;

    if (!form.username.length) {
        validateResponse.formIsValid = false;
        validateResponse.fields.username.isValid = false;
        validateResponse.fields.username.message = 'Обязательное для заполнения поле';
    }

    if (!form.password.length) {
        validateResponse.formIsValid = false;
        validateResponse.fields.password.isValid = false;
        validateResponse.fields.password.message = 'Обязательное для заполнения поле';
    }
}

watch(form, () => {
    validate();
})

/**
 * Submit form
 */
const submit = async () => {
    formIsSubmit.value = true;

    validate();

    if(!validateResponse.formIsValid) return;

    try {

        const response = await repository.authAdminUser(form);

        if(!response.auth) {
            return;
        }

        authAdminUser(response);
        router.push({name: 'home'})
    } catch (e) {
        const error = e as any;
        if(error.response.status === 404 || error.response.status === 401) {
            validateResponse.formIsValid = false;
            validateResponse.fields.username.isValid = false;
            validateResponse.fields.username.message = '';
            validateResponse.fields.password.isValid = false;
            validateResponse.fields.password.message = '';

            toast.value.add({severity:'error', summary: 'Ошибка авторизации', detail:'Вы ввели неправильный логин или пароль', life: 3000});
        } else {
            toast.value.add({severity:'error', summary: `Ошибка ${error.response.status}`, detail:'Попробуйте позже', life: 3000});
        }
    }
}



export { form, submit, validateResponse, setToast };
