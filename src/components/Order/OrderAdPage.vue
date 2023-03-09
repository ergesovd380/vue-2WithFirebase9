<template>
  <v-container>
    <v-row>
      <v-col
        xs='12'
        sm='8'
        offset-sm="2"
      >
        <h1 class="text--secondary my-3">Card</h1>
        <v-card
          class="pa-2 ma-2"
          elevation="8"
        >
          <v-img
            :src="order.imageSrc"
            height="300"
          >
          </v-img>
          <v-card-text>
            <h1>
              {{order.title}}
            </h1>
            <p>{{order.description}}</p>
          </v-card-text>
          <v-card-actions>
            <app-edit :order="order"></app-edit>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditOrderAdPage from './EditOrderAdPage.vue'
export default {
  props: ['id'],
  components: {
    appEdit: EditOrderAdPage
  },
  computed: {
    order () {
      const id = this.id
      return this.$store.getters.orderById(id)
    }
  }
}
</script>

<style>

</style>
