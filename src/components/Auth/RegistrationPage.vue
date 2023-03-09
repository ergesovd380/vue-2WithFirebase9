<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm8 md6>
        <v-card elevation="8">
          <v-toolbar
            color="primary"
            dark
          >
            <v-icon left large>mdi-account</v-icon>
            <v-toolbar-title>
              Registration form
            </v-toolbar-title>
          </v-toolbar>
          <v-form
            v-model="valid"
            ref="form"
            lazy-validation
          >
            <v-card-text>
              <v-text-field
                prepend-icon="mdi-account"
                label="Email"
                type="email"
                autocomplete="none"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                label="Password"
                type="password"
                autocomplete="none"
                :counter="6"
                v-model="password"
                :rules="passRules"
                required
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                label="Confirm Password"
                type="password"
                autocomplete="none"
                :counter="6"
                v-model="confPassword"
                :rules="confPassRules"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || loading"
            >
              Register
            </v-btn>
          </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
export default {
  data () {
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters'
      ],
      confPassword: '',
      confPassRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters',
        v => v === this.password || 'Password should match'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const email = this.email
        const password = this.password
        this.$store.dispatch('clearError')
        this.$store.dispatch('setLoading', true)
        createUserWithEmailAndPassword(getAuth(), email, password)
          .then(() => {
            this.$store.dispatch('setUser', email, password)
            this.$store.dispatch('setLoading', false)
            return this.$router.push('/')
          })
          .catch(error => {
            console.log(error.message)
            this.$store.dispatch('setLoading', false)
            this.$store.dispatch('setError', error.message)
          })
      }
    }
  }
}
</script>

<style>

</style>
