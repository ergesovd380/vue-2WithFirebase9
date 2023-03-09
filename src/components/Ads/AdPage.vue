<template>
  <v-container>
    <v-row>
      <v-col
        xs='12'
        sm='8'
        offset-sm="2"
      >
        <h1 class="text--secondary my-3">Ad</h1>
        <v-card
          class="pa-2 ma-2"
          elevation="8"
        >
          <v-img
            :src="ad.imageSrc"
            height="300"
          >
          </v-img>
          <v-card-text>
            <h1>
              {{ad.title}}
            </h1>
            <p>{{ad.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-edit :ad="ad" v-if="isOwner"></app-edit>
            <div class="ma-2"></div>
            <app-order :ad="ad"></app-order>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditPage from './EditPage.vue'
export default {
  props: ['id'],
  components: {
    appEdit: EditPage
  },
  computed: {
    ad () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    isOwner () {
      return this.ad.ownerId === this.$store.getters.user.uid
    }
  }
}
</script>

<style>

</style>
