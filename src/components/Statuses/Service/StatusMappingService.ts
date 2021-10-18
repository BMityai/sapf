
import router from "@/router";
import { ref, reactive, watch } from "vue";
import StatusMappingRepository from '../Repositories/StatusMappingRepository'
import { authAdminUser } from '@/app/States/AdminUserState'


/**
 * Init repository
 */
const repository = new StatusMappingRepository();

const toast = ref();

// Statuses init
const statuses = reactive({
    validate: { isValid: true },
    form: [{ id: '', crm: '', kaspi: '', removed: false, new: false, edited: false, kaspiIsValid: true, crmIsValid: true, crmErrorMessage: '', kaspiErrorMessage: '', }]
});

const isSubmit = ref(false);

/**
 * Get statuses from backend
 */
const getStatuses = async () => {
    statuses.form = await repository.getStatuses();
}

/**
 * Add empty row
 */
const addRow = () => {
    const emptyField = {
        id: `new-${Date.now()}`,
        crm: "",
        kaspi: "",
        new: true,
        errorMessage: '',
        edited: false,
        removed: false,
        kaspiIsValid: true,
        crmIsValid: true,
        crmErrorMessage: '',
        kaspiErrorMessage: '',
    };
    statuses.form.push(emptyField);
};

/**
 * Set removed flag
 */
const removeRow = (id: any) => {
    for (const item of statuses.form) {
        if (item.id !== id) continue;
        item.removed = true;
    }
};

/**
 * Set edited flag
 */
const setEditedFlag = (id: any) => {
    for (const item of statuses.form) {
        if (item.id !== id) continue;
        item.edited = true;
    }
};

/**
 * Submit form
 */
const save = async () => {
    // Validate form
    validate();

    isSubmit.value = true;

    // Return if invalid form
    if (!statuses.validate.isValid) {
        toast.value.add({ severity: 'error', summary: 'Ошибка валидации', detail: 'Проверьте правильность заполнения формы', life: 3000 });
        return;
    }

    // Submit form
    try {
        await repository.submitStatusMappingForm(statuses.form);
        toast.value.add({ severity: 'success', summary: '', detail: 'Маппинг статусов успешно сохранен', life: 3000 });
    } catch(e) {
        const error = e as any;
        console.log(error.response.status)
    }
}

/**
 * Validate form
 */
const validate = () => {
    statuses.validate.isValid = true;
    for (const status of statuses.form) {
        if (!status.crm.length) {
            status.crmIsValid = false;
            status.crmErrorMessage = 'Обязательное для заполнения поле';
            statuses.validate.isValid = false;
        } else {
            status.crmIsValid = true;
            status.crmErrorMessage = '';
        }

        if (!status.kaspi.length) {
            status.kaspiIsValid = false;
            status.kaspiErrorMessage = 'Обязательное для заполнения поле';
            statuses.validate.isValid = false;
        } else {
            status.kaspiIsValid = true;
            status.crmErrorMessage = '';
        }
    }

    for (const status of statuses.form) {
        if (!status.crmIsValid || !status.kaspiIsValid) {
            statuses.validate.isValid = false;
            return;
        }
        statuses.validate.isValid = true;
    }


}

watch(statuses, () => {
    if (!isSubmit.value) return;
    validate();
})

/**
 * Set toast
 */
const setToast = (toastObject: any) => {
    toast.value = toastObject;
}


export { getStatuses, statuses, addRow, removeRow, setEditedFlag, save, setToast };
