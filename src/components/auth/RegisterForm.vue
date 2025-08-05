<script setup>
import { ref } from 'vue'

const visible = ref(false)
const refVForm = ref()

import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validator'

const formDataDefault = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
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
    <v-row>
      <v-col cols="6">
        <v-text-field
          :rules="[requiredValidator]"
          v-model="formData.firstname"
          color="primary"
          label="First Name"
        ></v-text-field>
      </v-col>
      <v-col
        ><v-text-field
          :rules="[requiredValidator]"
          v-model="formData.lastname"
          color="primary"
          label="Last Name"
        ></v-text-field
      ></v-col>
    </v-row>

    <v-text-field
      v-model="formData.email"
      prepend-inner-icon="mdi-email-outline"
      color="primary"
      label="Email"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <v-row>
      <v-col>
        <v-text-field
          v-model="formData.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          @click:append-inner="visible = !visible"
          color="primary"
          label="Password"
          :rules="[requiredValidator, passwordValidator]"
        ></v-text-field>
      </v-col>

      <v-col>
        <v-text-field
          v-model="formData.password_confirmation"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          color="primary"
          label="Password Confirmation"
          :rules="[
            requiredValidator,
            confirmedValidator(formData.password_confirmation, formData.password),
          ]"
        ></v-text-field
      ></v-col>
    </v-row>

    <v-btn class="mt-2" color="primary" type="submit" block prepend-icon="mdi-account-plus"
      >Register</v-btn
    >
  </v-form>
</template>
