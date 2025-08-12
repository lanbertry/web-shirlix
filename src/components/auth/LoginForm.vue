<script setup>
import { requiredValidator, emailValidator } from '@/utils/validator'
import { formActionDefault, supabase } from '@/utils/supabase'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { useRouter } from 'vue-router'

import { ref } from 'vue'

const router = useRouter()

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({
  ...formDataDefault,
})

const formAction = ref({
  ...formActionDefault,
})

const visible = ref(false)
const refVForm = ref()

const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password,
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
