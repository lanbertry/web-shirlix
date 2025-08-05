<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="8" class="bg-surface-light h-screen" v-if="!mobile"></v-col>
        <v-col cols="12" md="4" :class="mobile ? '' : 'my-auto'">
          <v-card class="mx-auto" elevation="0">
            <v-card-title class="text-center mb-5">
              <v-img
                class="mx-auto"
                src="/images/logo-favicon.png"
                :width="mobile ? '75%' : '25%'"
                rounded="circle"
              ></v-img>
              <h3 class="font-weight-black text-center">Shirlix Meatshop</h3>
              <p>Register Form</p>
            </v-card-title>
            <v-divider class=""></v-divider>
            <v-card-text class="pt-4">
              <RegisterForm></RegisterForm>
              <v-divider class="my-5"></v-divider>
              <h5 class="text-center font-weight-bold">
                Already have an account?
                <RouterLink class="text-primary" to="/">Click here to Login</RouterLink>
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row></template
    >
  </AppLayout>
</template>
