<template>
  <v-form fast-fail @submit.prevent>
    <v-text-field label="Email" type="email" variant="outlined"></v-text-field>

    <v-text-field label="Password" type="password" variant="outlined"></v-text-field>

    <v-btn class="mt-2" color="primary" type="submit" block prepend-icon="mdi-login">Login</v-btn>
  </v-form>
</template>
