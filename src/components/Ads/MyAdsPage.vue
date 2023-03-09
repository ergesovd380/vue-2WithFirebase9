<template>
  <v-container>
    <v-row>
      <v-col
        xs='12'
        sm='8'
        offset-sm="2"
      >
        <h1 class="text--secondary my-3">My ads</h1>
        <v-card
          class="pa-2 ma-2"
          elevation="8"
          v-for="ad in ads"
          :key="ad.id"
        >
          <v-layout row>
            <v-flex xs5>
              <v-card-text>
                <v-img
                  :src="ad.imageSrc"
                  height="150"
                ></v-img>
              </v-card-text>
            </v-flex>
            <v-flex xs7 align-self-center>
              <v-card-title>
                {{ad.title}}
              </v-card-title>
              <v-card-text>
                {{ad.description}}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :to="/ad/ + ad.id">Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    ads () {
      return this.$store.getters.myAds
    }
  }
}
</script>
