<template>
  <div>
    <div v-if="!loading">
      <v-container fluid>
        <v-row>
          <v-col xs12>
            <v-carousel>
              <v-carousel-item
                v-for="promo in promoAds"
                :key="promo.id"
                :src="promo.imageSrc"
              >
                <div class="btnCard">
                  <v-btn
                    text
                    color="error"
                    :to="/ad/ + promo.id"
                  >
                    {{promo.title}}
                  </v-btn>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col
            xs='12'
            sm='6'
            md='4'
            v-for="ad of ads"
            :key="ad.id"
          >
            <v-card
              max-width="400"
            >
              <v-img
                class="white--text align-end"
                height="200px"
                :src="ad.imageSrc"
              >
                <v-card-title> {{ad.title}} </v-card-title>
              </v-img>
              <v-card-text class="text--primary">
                {{ad.description}}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  :to="/ad/ + ad.id"
                  class="ma-2"
                >
                  Open
                </v-btn>
                <app-order :ad="ad"></app-order>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else class="loading">
      <v-progress-circular
        :size="100"
        :width="10"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    ads () {
      return this.$store.getters.ads
    },
    promoAds () {
      return this.$store.getters.promoAds
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>
  .btnCard {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background-color: rgba(0, 0, 0, .5);
    transform: translate(-50%, 0);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 10px;
  }
  .v-progress-circular {
    margin: 1rem;
  }
  .loading {
    text-align: center;
    margin-top: 20%;
  }
</style>
