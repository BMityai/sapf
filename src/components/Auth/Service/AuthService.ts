
import { ref, reactive, watch } from "vue";

/**
 * Init auth form
 */
const form = reactive({
    username: '',
    password: ''
});

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
const submit = () => {
    formIsSubmit.value = true;
    validate();
}



export { form, submit, validateResponse };
