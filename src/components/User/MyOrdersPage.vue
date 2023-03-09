<template>
  <v-container>
    <v-row>
      <v-col
        xs='12'
        sm='6'
        offset-sm="3"
      >
        <h1 class="text--secondary my-3">Orders</h1>
        <v-card
          class="mx-auto"
          elevation="0"
        >
          <v-list
            subheader
            two-line
          >
            <v-list-item
              v-for="order in orders"
              :key="order.id"
            >
              <v-list-item-content>
                <v-list-item-title> Name: {{order.name}} </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle>Phone: {{order.phone}} </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  raised
                  color="primary"
                  :to="'/order/' + order.id"
                  :disabled="loading"
                  :loading="loading"
                >Order</v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    orders () {
      return this.$store.getters.myOrders
    }
  }
}
</script>

<style scoped>
  .done {
    background-color: rgb(138, 245, 143);
    text-decoration: line-through;
  }
</style>
