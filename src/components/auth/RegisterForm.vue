<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <v-form fast-fail @submit.prevent>
    <v-row>
      <v-col cols="6">
        <v-text-field color="primary" label="First Name"></v-text-field>
      </v-col>
      <v-col><v-text-field color="primary" label="Last Name"></v-text-field></v-col>
    </v-row>

    <v-text-field
      prepend-inner-icon="mdi-email-outline"
      color="primary"
      label="Email"
    ></v-text-field>

    <v-row>
      <v-col>
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          @click:append-inner="visible = !visible"
          color="primary"
          label="Password"
        ></v-text-field>
      </v-col>

      <v-col>
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          color="primary"
          label="Password Confirmation"
        ></v-text-field
      ></v-col>
    </v-row>

    <v-btn class="mt-2" color="primary" type="submit" block prepend-icon="mdi-account-plus"
      >Register</v-btn
    >
  </v-form>
</template>
