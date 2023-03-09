<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        v-bind="attrs"
        v-on="on"
      >Buy</v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
          color="primary"
          dark
        >Change card</v-toolbar>
        <v-form
        class="my-3 pa-3"
        lazy-validation
        v-model="valid"
        ref="form"
        >
            <v-img
              :src="changeImageSrc"
              height="200"
            >
            </v-img>
            <v-card-text>
              <v-text-field
                label="Your name*"
                type="text"
                autocomplete="none"
                v-model="name"
                :rules="[v => !!v || 'Name is required']"
                required
              ></v-text-field>
              <v-text-field
                label="Your phone*"
                type="number"
                autocomplete="none"
                v-model="phone"
                :rules="[v => !!v || 'Phone is required']"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="buyDoc"
                :disabled="!valid || loading"
                :loading="loading"
              >
                Buy
              </v-btn>
              <v-btn
                color="warning"
                @click="dialog.value = false"
                :disabled="loading"
                :loading="loading"
              >Close</v-btn>
            </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
import { doc, setDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
export default {
  props: ['ad'],
  data () {
    return {
      valid: false,
      name: '',
      phone: '',
      loading: false,
      changeImageSrc: this.ad.imageSrc,
      done: false
    }
  },
  methods: {
    buyDoc () {
      if (this.$refs.form.validate()) {
        const ownerId = this.$store.getters.user.uid
        const adId = this.ad.id
        const imageSrc = this.ad.imageSrc
        const description = this.ad.description
        const title = this.ad.title
        const image = this.ad.image

        this.loading = true
        setDoc(doc(collection(db, 'orders')), {
          name: this.name,
          phone: this.phone,
          done: this.done,
          ownerId,
          adId,
          title,
          description,
          imageSrc,
          image
        })
          .then(() => {
            this.loading = false
            window.location.reload()
          })
          .catch(error => {
            this.loading = false
            console.error(error)
          })
      }
    }
  }
}
</script>
