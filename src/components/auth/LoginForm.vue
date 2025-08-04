<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <v-form fast-fail @submit.prevent>
    <v-text-field prepend-inner-icon="mdi-email-outline" label="Email" type="email"></v-text-field>

    <v-text-field
      hint="Enter your password to access this website"
      label="Password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      prepend-inner-icon="mdi-lock-outline"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <v-btn class="mt-2" color="primary" type="submit" block prepend-icon="mdi-login">Login</v-btn>
  </v-form>
</template>
