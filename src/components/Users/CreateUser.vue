<template>
    <div class="create_user_form">
        <div class="action">
            <Button
                label="Сохранить"
                class="p-button-raised p-button-success"
                @click.prevent="submitCreateUserForm"
            />
        </div>

        <div class="p-fluid">
            <div class="p-field p-grid">
                <label for="username" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                    >Логин</label
                >
                <div class="p-col-12 p-md-10">
                    <InputText
                        id="username"
                        v-model="form.username.value"
                        type="text"
                        :class="{ 'p-invalid': !form.username.isValid }"
                    />
                    <small v-if="!form.username.isValid" class="p-error">{{
                        form.username.errorMessage
                    }}</small>
                </div>
            </div>
            <div class="p-field p-grid">
                <label
                    @click="test"
                    for="firstname"
                    class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                    >Имя</label
                >
                <div class="p-col-12 p-md-10">
                    <InputText
                        id="firstname"
                        v-model="form.firstname.value"
                        type="text"
                        :class="{ 'p-invalid': !form.firstname.isValid }"
                    />
                    <small v-if="!form.firstname.isValid" class="p-error">{{
                        form.firstname.errorMessage
                    }}</small>
                </div>
            </div>
            <div class="p-field p-grid">
                <label for="lastname" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                    >Фамилия</label
                >
                <div class="p-col-12 p-md-10">
                    <InputText
                        id="lastname"
                        v-model="form.lastname.value"
                        type="text"
                        :class="{ 'p-invalid': !form.lastname.isValid }"
                    />
                    <small v-if="!form.lastname.isValid" class="p-error">{{
                        form.lastname.errorMessage
                    }}</small>
                </div>
            </div>
            <div class="p-field p-grid">
                <label for="email" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                    >Email</label
                >
                <div class="p-col-12 p-md-10">
                    <InputText
                        id="email"
                        v-model="form.email.value"
                        type="email"
                        :class="{ 'p-invalid': !form.email.isValid }"
                    />
                    <small v-if="!form.email.isValid" class="p-error">{{
                        form.email.errorMessage
                    }}</small>
                </div>
            </div>
            <div class="p-field p-grid">
                <label for="password" class="p-col-12 p-mb-2 p-md-2 p-mb-md-0"
                    >Пароль</label
                >
                <div class="p-col-12 p-md-10">
                    <InputText
                        id="password"
                        v-model="form.password.value"
                        type="password"
                        :class="{ 'p-invalid': !form.password.isValid }"
                    />
                    <small v-if="!form.password.isValid" class="p-error">{{
                        form.password.errorMessage
                    }}</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";

import {
    form,
    submitCreateUserForm,
    setToast,
    setUserData,
    setComponentType,
} from "./Service/AdminUsersService";

export default defineComponent({
    components: {
        InputText,
        Button,
    },

    async setup() {

        const isCreateUserComponent = ref(true);
        onMounted(() => {
            const route = useRoute();
            setComponentType(route.name !== 'account');
            setUserData();
        });

        setToast(useToast());
        return { form, submitCreateUserForm };
    },
});
</script>
