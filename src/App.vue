<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app temporary v-model="drawer">
        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="link in links"
            :key="link.title"
            :to="link.link"
            color="primary"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="!isUserLogined"
            color="primary"
            @click="cancelUser = !cancelUser"
          >
            <v-list-item-icon>
              <v-icon>mdi-cancel</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-card>
        <v-app-bar
          dark
          color="primary"
        >
          <v-app-bar-nav-icon
            @click="drawer = !drawer"
            class="d-md-none"
          >
          </v-app-bar-nav-icon>

          <v-toolbar-title>
            <router-link to="/" tag="h2" class="pionter">Vuetify</router-link>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn
            text
            v-for="link of links"
            :key="link.title"
            :to="link.link"
            class="d-none d-md-flex"
          >
            <v-icon left>{{link.icon}}</v-icon>
            {{link.title}}
          </v-btn>
          <v-btn
            text
            class="d-none d-md-flex"
            @click="cancelUser = !cancelUser"
            v-if="!isUserLogined"
          >
            <v-icon left>mdi-cancel</v-icon>
            Logout
          </v-btn>

        </v-app-bar>
      </v-card>

      <v-main>
        <router-view></router-view>
      </v-main>

      <v-snackbar
        v:timeout="5000"
        :value="true"
        color="info"
        v-model="cancelUser"
      >
        Are really want to leave us ?
        <template v-slot:action="{ attrs }">
          <v-btn
            color="light"
            text
            v-bind="attrs"
            @click="canceled"
          >
            Yes
          </v-btn>
          <v-btn
            color="light"
            text
            v-bind="attrs"
            @click="cancelUser = !cancelUser"
          >
            No
          </v-btn>
        </template>
      </v-snackbar>

      <template v-if="error">
        <v-snackbar
          v:timeout="5000"
          :value="true"
          @input="errorClear"
          color="error"
        >
          {{ error }}
          <template v-slot:action="{ attrs }">
            <v-btn
              color="light"
              text
              v-bind="attrs"
              @click="errorClear"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </template>
    </v-app>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth'
export default {
  data () {
    return {
      drawer: false,
      cancelUser: false
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLogined () {
      return this.$store.getters.isUserLogined
    },
    links () {
      if (this.isUserLogined) {
        return [
          { title: 'Login', icon: 'mdi-account', link: '/login' },
          { title: 'Registration', icon: 'mdi-face-agent', link: './registration' }
        ]
      }
      return [
        { title: 'Orders', icon: 'mdi-bookmark-multiple', link: '/orders' },
        { title: 'New ad', icon: 'mdi-file-plus', link: '/newads' },
        { title: 'My ads', icon: 'mdi-clipboard-list', link: '/list' }
      ]
    }
  },
  methods: {
    errorClear () {
      this.$store.dispatch('clearError')
    },
    canceled () {
      const auth = getAuth()
      signOut(auth).then(() => {
        this.cancelUser = false
      }).catch((error) => {
        alert(error.message)
      })
      this.$store.dispatch('setUser', null)
      this.$router.push('/')
    }
  }
}
</script>

<style >

</style>
