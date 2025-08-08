<script setup>
import { requiredValidator, emailValidator } from '@/utils/validator'

import { ref } from 'vue'

const visible = ref(false)
const refVForm = ref()

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({
  ...formDataDefault,
})

const onSubmit = () => {
  alert(formData.value.email)
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <v-form @submit.prevent="onFormSubmit" ref="refVForm">
    <v-text-field
      v-model="formData.email"
      prepend-inner-icon="mdi-email-outline"
      label="Email"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <v-text-field
      v-model="formData.password"
      hint="Enter your password to access this website"
      label="Password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      prepend-inner-icon="mdi-lock-outline"
      @click:append-inner="visible = !visible"
      :rules="[requiredValidator]"
    ></v-text-field>

    <v-btn class="mt-2" color="primary" type="submit" block prepend-icon="mdi-login">Login</v-btn>
  </v-form>
</template>
