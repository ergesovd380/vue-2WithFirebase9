<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="warning"
        v-bind="attrs"
        v-on="on"
      >Edit</v-btn>
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
                label="Change title*"
                type="text"
                autocomplete="none"
                v-model="changeTitle"
                :rules="[v => !!v || 'Title is required']"
                required
              ></v-text-field>
              <v-textarea
                label="Change description*"
                type="text"
                autocomplete="none"
                v-model="changeDescription"
                :rules="[v => !!v || 'Description is required']"
                required
                multi-line
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-btn
                  color="yellow"
                  dark
                  @click="triggerFile"
                >
                  Upload
                  <v-icon dark right>
                    mdi-cloud-upload
                  </v-icon>
                </v-btn>
                <input
                type="file"
                class="d-none"
                accept="image/*"
                @change="changeFile"
                ref="fileRef"
                >
                <v-layout class="mx-3">
                  <v-flex xs12>
                    <v-switch
                      v-model="changePromo"
                      label="Add promo"
                    ></v-switch>
                  </v-flex>
                </v-layout>
            </v-card-actions>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="changeAd"
                :disabled="!valid || loading"
                :loading="loading"
              >
                Change ad
              </v-btn>
              <v-btn
                dark
                color="red"
                @click="deleteAd = !deleteAd"
                :loading="loading"
              >
                Delete ad
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
      <v-snackbar
        v:timeout="5000"
        :value="true"
        color="info"
        v-model="deleteAd"
      >
        Are really want delet this card ?
        <template v-slot:action="{ attrs }">
          <v-btn
            color="light"
            text
            v-bind="attrs"
            @click="deleteDoc"
          >
            Yes
          </v-btn>
          <v-btn
            color="light"
            text
            v-bind="attrs"
            @click="deleteAd = !deleteAd"
          >
            No
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-dialog>
</template>
<script>
import { doc, updateDoc, collection, deleteDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '../../firebase/firebase'
export default {
  props: ['ad'],
  data () {
    return {
      valid: false,
      changeTitle: '',
      changeDescription: '',
      changePromo: this.ad.promo,
      changeImageSrc: this.ad.imageSrc,
      image: null,
      deleteAd: false,
      id: this.ad.id
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    triggerFile () {
      this.$refs.fileRef.click()
    },
    changeFile (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.changeImageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    },
    changeAd () {
      if (this.$refs.form.validate() && this.image) {
        const file = this.image
        this.$store.dispatch('clearError')
        this.$store.dispatch('setLoading', true)
        const storageRef = ref(storage, 'ads/' + file.name)
        uploadBytes(storageRef, file)
        getDownloadURL(storageRef)
          .then(function (url) {
            this.changeImageSrc = url
          })
        const id = this.id
        updateDoc(doc(collection(db, 'ads'), id), {
          title: this.changeTitle,
          description: this.changeDescription,
          promo: this.changePromo,
          imageSrc: this.changeImageSrc
        })
          .then(() => {
            this.$store.dispatch('setLoading', false)
            window.location.reload()
          })
          .catch(error => {
            this.$store.dispatch('setLoading', false)
            this.$store.dispatch('setError', error.message)
          })
      } else if (this.$refs.form.validate()) {
        const id = this.id
        this.$store.dispatch('clearError')
        this.$store.dispatch('setLoading', true)
        updateDoc(doc(collection(db, 'ads'), id), {
          title: this.changeTitle,
          description: this.changeDescription,
          promo: this.changePromo,
          imageSrc: this.changeImageSrc
        })
          .then(() => {
            this.$store.dispatch('setLoading', false)
            window.location.reload()
          })
          .catch(error => {
            this.$store.dispatch('setLoading', false)
            this.$store.dispatch('setError', error.message)
          })
      }
    },
    deleteDoc () {
      const id = this.id
      const file = this.ad.image
      const storageRef = ref(storage, 'ads/' + file)
      deleteObject(storageRef, file)
      this.$store.dispatch('setLoading', true)
      deleteDoc(doc(collection(db, 'ads'), id))
        .then(() => {
          this.$store.dispatch('setLoading', false)
          window.location.reload()
        })
        .catch(error => {
          this.$store.dispatch('setLoading', false)
          this.$store.dispatch('setError', error.message)
        })
    }
  }
}
</script>
