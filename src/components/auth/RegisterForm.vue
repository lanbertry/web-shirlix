<script setup>
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validator'
import { ref } from 'vue'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { formActionDefault, supabase } from '@/utils/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()

const visible = ref(false)
const refVForm = ref()

const formDataDefault = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
}

const formAction = ref({
  ...formActionDefault,
})

const formData = ref({
  ...formDataDefault,
})

const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
        is_admin: false,
      },
    },
  })

  if (error) {
    console.log(error)
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    // console.log(data)
    formAction.value.formSuccessMessage = 'Successfully Registered an Account.'
    router.replace('/system/dashboard')
  }
  refVForm.value?.reset()
  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>

  <v-form class="mt-5" @submit.prevent="onFormSubmit" ref="refVForm">
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

    <v-btn
      class="mt-2"
      color="primary"
      type="submit"
      block
      prepend-icon="mdi-account-plus"
      :disabled="formAction.formProcess"
      :loading="formAction.formProcess"
      >Register</v-btn
    >
  </v-form>
</template>
