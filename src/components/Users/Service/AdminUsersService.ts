
import { ref } from "vue";
import StatusMappingRepository from '../Repositories/BackendRepository'
import router from "@/router";
import { user, userFirstLetter } from '@/app/States/AdminUserState';


/**
 * Init repository
 */
const repository = new StatusMappingRepository();

/**
 * Init toat
 */
const thisToast = ref();

/**
 * Init users
 */
const users = ref([]);

const formIsValid = ref(true);
const isCreateUserComponent = ref(true);

const rules = {
    username: { required: true },
    firstname: { required: true },
    email: { required: true, email: true },
    password: { required: true, min: 6 },
} as any;


/**
 * Create user form
 */
const form = ref({
    username: {
        value: '',
        isValid: true,
        errorMessage: ''
    },
    firstname: {
        value: '',
        isValid: true,
        errorMessage: ''
    },
    lastname: {
        value: '',
        isValid: true,
        errorMessage: ''
    },
    email: {
        value: '',
        isValid: true,
        errorMessage: ''
    },
    password: {
        value: '',
        isValid: true,
        errorMessage: ''
    }
}) as any;

/**
 * Init service
 */
const init = async (): Promise<void> => {
    await getUsers();
}

/**
 * Set toast
 */
const setToast = (toast: any): void => {
    thisToast.value = toast;
}

/**
 * Get users from backend
 */
const getUsers = async (): Promise<void> => {
    users.value = await repository.getUsers();
}

/**
 * Validate form
 */
const validateForm = (): void => {
    formIsValid.value = true;
    for (const [field, entries] of Object.entries(form.value)) {
        if (!rules[field]) continue;
        const thisEntries = entries as any;

        if (rules[field].required) {
            if (!thisEntries.value) {
                form.value[field].isValid = false;
                form.value[field].errorMessage = 'Обязательное для заполнения поле';
                formIsValid.value = false;
                continue;
            } else {
                form.value[field].isValid = true;
                form.value[field].errorMessage = '';
            }
        }

        if (rules[field].email) {
            const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            const validateResponse = re.test(String(thisEntries.value).toLowerCase());
            if (!validateResponse) {
                form.value[field].isValid = false;
                form.value[field].errorMessage = 'Введите корректный email';
                formIsValid.value = false;
                continue;
            } else {
                form.value[field].isValid = true;
                form.value[field].errorMessage = '';
            }
        }

        if (rules[field].min) {
            if (thisEntries.value.length < rules[field].min) {
                form.value[field].isValid = false;
                form.value[field].errorMessage = `Минимальное количество символов: ${rules[field].min} `;
                formIsValid.value = false;
                continue;
            } else {
                form.value[field].isValid = true;
                form.value[field].errorMessage = '';
            }
        }
    }
}

/**
 * Submit create user form
 */
const submitCreateUserForm = async (): Promise<void> => {
    validateForm()

    if (!formIsValid.value) {
        thisToast.value.add({ severity: 'error', summary: 'Ошибка валидации', detail: 'Проверьте правильность заполнения формы', life: 3000 });
        return;
    }

    // Send request
    try {
        if(isCreateUserComponent.value) {
            await repository.createUser(form.value);
            thisToast.value.add({ severity: 'success', summary: 'Success', detail: 'Пользователь создан', life: 3000 });

        } else {
            user.data = await repository.updateUser(form.value);
            userFirstLetter.value = (user.data.firstname[0]).toUpperCase();
            thisToast.value.add({ severity: 'success', summary: 'Success', detail: 'Изменения успешно сохранены', life: 3000 });
        }
        flushForm();
        router.push({ name: 'users.all' });

    } catch (err: any) {

        if(!err.response) {
            thisToast.value.add({ severity: 'error', summary: `Упс!`, detail: 'Произошла ошибка, попробуйте повторить позже', life: 3000 });
            return;
        }
        if (err.response.status === 422) {
            for (const [field, entries] of Object.entries(err.response.data.data)) {
                const thisEntries = entries as any;
                const thisField = field.split('.')[0]
                form.value[thisField].isValid = false;
                form.value[thisField].errorMessage = thisEntries[0];
            }
            thisToast.value.add({ severity: 'error', summary: 'Ошибка валидации', detail: 'Проверьте правильность заполнения формы', life: 3000 });
            return;
        } else {
            thisToast.value.add({ severity: 'error', summary: `Ошибка ${err.response.status}`, detail: 'Произошла ошибка, попробуйте повторить позже', life: 3000 });
            return;
        }
    }
}

/**
 * Flush Form
 */
const flushForm = (): void => {
    for (const [field, entries] of Object.entries(form.value)) {
        form.value[field].value = '';
        form.value[field].isValid = true;
        form.value[field].errorMessage = '';
    }
}

/**
 * Set user data
 */
const setUserData = () => {
    if(isCreateUserComponent.value) {
        flushForm();
    } else {
        for(const [field, entries] of Object.entries(user.data)) {
            if(!form.value[field]) continue;
            form.value[field].value = entries;
            form.value[field].isValid = true;
        }
    }
}

/**
 * Set create or update component
 */
const setComponentType = (isCreateComponent: boolean) => {
    isCreateUserComponent.value = isCreateComponent;
}

export { init, users, form, submitCreateUserForm, setToast, setUserData, setComponentType };
