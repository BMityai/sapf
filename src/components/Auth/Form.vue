<template>
    <div class="auth_wrapper">
        <div class="auth_form">
            <div class="title">Авторизация</div>
            <span class="p-float-label field">
                <InputText
                    id="username"
                    type="text"
                    v-model="form.username"
                    :class="{
                        'p-invalid': !validateResponse.fields.username.isValid,
                    }"
                />
                <label for="username">Логин</label>
                <small
                    class="p-error error_message"
                    v-if="!validateResponse.fields.username.isValid"
                >
                    {{ validateResponse.fields.username.message }}
                </small>
            </span>
            <span class="p-float-label field">
                <Password
                    id="password"
                    v-model="form.password"
                    toggleMask
                    :feedback="false"
                    :class="{
                        'p-invalid': !validateResponse.fields.password.isValid,
                    }"
                />
                <label for="password">Пароль</label>
                <small
                    class="p-error error_message"
                    v-if="!validateResponse.fields.password.isValid"
                >
                    {{ validateResponse.fields.password.message }}
                </small>
            </span>
            <Button
                label="Войти"
                class="p-button-raised p-button-secondary"
                @click="submit"
                :disabled="!validateResponse.formIsValid"
            />
        </div>
    </div>
</template>


<script lang='ts'>
import { defineComponent, ref } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import { form, submit, validateResponse } from "./Service/AuthService";

export default defineComponent({
    components: {
        InputText,
        Password,
        Button,
    },
    setup() {
        return { form, submit, validateResponse };
    },
});
</script>

