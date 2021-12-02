
import { ref, reactive, watch } from "vue";
import WarehouseMappingRepository from '../Repositories/WarehouseMappingRepository'


/**
 * Init repository
 */
const repository = new WarehouseMappingRepository();

const toast = ref();

// Warehouseses init
const warehouses = reactive({
    validate: { isValid: true },
    form: [{ id: '', crm: '', kaspi: '', removed: false, new: false, edited: false, kaspiIsValid: true, crmIsValid: true, crmErrorMessage: '', kaspiErrorMessage: '', }]
});

const isSubmit = ref(false);

/**
 * Get warehouses from backend
 */
const getWarehouses = async () => {
    warehouses.form = await repository.getWarehouses();
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
    warehouses.form.push(emptyField);
};

/**
 * Set removed flag
 */
const removeRow = (id: any) => {
    for (const item of warehouses.form) {
        if (item.id !== id) continue;
        item.removed = true;
    }
};

/**
 * Set edited flag
 */
const setEditedFlag = (id: any) => {
    for (const item of warehouses.form) {
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
    if (!warehouses.validate.isValid) {
        toast.value.add({ severity: 'error', summary: 'Ошибка валидации', detail: 'Проверьте правильность заполнения формы', life: 3000 });
        return;
    }

    // Submit form
    try {
        await repository.submitWarehouseMappingForm(warehouses.form);
        toast.value.add({ severity: 'success', summary: '', detail: 'Маппинг складов успешно сохранен', life: 3000 });
        isSubmit.value = false;
    } catch(e) {
        const error = e as any;
        toast.value.add({ severity: 'error', summary: `Ошибка ${error.response.status}`, detail: 'Произошла ошибка, попробуйте позже', life: 3000 });
        console.error(error);
    }
}

/**
 * Validate form
 */
const validate = () => {
    warehouses.validate.isValid = true;
    for (const warehouse of warehouses.form) {

        if (!warehouse.crm.length && !warehouse.removed) {
            warehouse.crmIsValid = false;
            warehouse.crmErrorMessage = 'Обязательное для заполнения поле';
            warehouses.validate.isValid = false;
        } else {
            warehouse.crmIsValid = true;
            warehouse.crmErrorMessage = '';
        }

        if (!warehouse.kaspi.length && !warehouse.removed) {
            warehouse.kaspiIsValid = false;
            warehouse.kaspiErrorMessage = 'Обязательное для заполнения поле';
            warehouses.validate.isValid = false;
        } else {
            warehouse.kaspiIsValid = true;
            warehouse.crmErrorMessage = '';
        }
    }

    for (const warehouse of warehouses.form) {
        if (!warehouse.crmIsValid || !warehouse.kaspiIsValid) {
            warehouses.validate.isValid = false;
            return;
        }
        warehouses.validate.isValid = true;
    }


}

watch(warehouses, () => {
    if (!isSubmit.value) return;
    validate();
})

/**
 * Set toast
 */
const setToast = (toastObject: any) => {
    toast.value = toastObject;
}


export { getWarehouses, warehouses, addRow, removeRow, setEditedFlag, save, setToast };
