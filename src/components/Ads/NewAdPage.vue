<template>
  <v-container>
    <v-row>
      <v-col
        xs='12'
        sm='6'
        offset-sm="3"
      >
        <h1
          class="my-3 text--secondary"
        >Create new ad</h1>
        <v-card
          elevation="0"
        >
          <v-form
            class="my-3"
            v-model="valid"
            ref="form"
            lazy-validation
          >
            <v-card-text>
              <v-text-field
                label="Ad title*"
                type="text"
                autocomplete="none"
                v-model="title"
                :rules="[v => !!v || 'Title is required']"
                required
              ></v-text-field>
              <v-textarea
                label="Ad description*"
                type="text"
                autocomplete="none"
                v-model="description"
                :rules="[v => !!v || 'Description is required']"
                required
                multi-line
              ></v-textarea>
            </v-card-text>
          </v-form>
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
          <v-layout>
            <v-flex xs12>
              <img :src="imageSrc" height="100" v-if="imageSrc" class="mt-3">
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <v-switch
                v-model="promo"
                label="Add promo"
              ></v-switch>
            </v-flex>
          </v-layout>
          <v-btn
            @click="createAd"
            color="secondary"
            :disabled="!valid || !imageSrc || loading"
            :loading="loading"
          >
            Create ad
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { doc, setDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../firebase/firebase'
export default {
  data () {
    return {
      title: '',
      description: '',
      valid: false,
      promo: false,
      image: null,
      imageSrc: ''
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
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    },
    createAd () {
      if (this.$refs.form.validate() && this.image) {
        const file = this.image
        const ownerId = this.$store.getters.user.uid
        this.$store.dispatch('clearError')
        this.$store.dispatch('setLoading', true)
        const storageRef = ref(storage, 'ads/' + file.name)
        uploadBytes(storageRef, file)
        getDownloadURL(storageRef)
          .then(function (url) {
            this.imageSrc = url
          })
        setDoc(doc(collection(db, 'ads')), {
          title: this.title,
          description: this.description,
          promo: this.promo,
          imageSrc: this.imageSrc,
          image: this.image.name,
          ownerId
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
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
