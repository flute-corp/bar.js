<template>
  <v-container fluid grid-list-md>
    <v-layout wrap align-center>
      <v-flex xs6 sm6>
        <v-btn raised @click="onPickFile" v-if="!imageUrl">
          {{ selectLabel }}
        </v-btn>
        <v-btn raised class="error" @click="removeFile" v-else>
          {{ removeLabel }}
        </v-btn>
        <input
            type="file"
            ref="image"
            name="image"
            :accept="accept"
            @change="onFilePicked"
        >
      </v-flex>
      <v-flex xs6 sm6>
        <img
            :src="imageUrl"
            ref="imageUrl"
            @click="onPickFile"
            style="cursor: pointer; width: 100%"
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    accept: {
      type: String,
      default: '*'
    },
    selectLabel: {
      type: String,
      default: 'Select an image'
    },
    removeLabel: {
      type: String,
      default: 'Remove'
    }
  },

  data () {
    return {
      imageUrl: ''
    }
  },

  watch: {
    value (v) {
      this.imageUrl = v
    }
  },

  mounted () {
    this.imageUrl = this.value
  },

  methods: {
    onPickFile () {
      this.$refs.image.click()
    },

    onFilePicked (event) {
      const files = event.target.files || event.dataTransfer.files

      if (files && files[0]) {
        let filename = files[0].name

        if (filename && filename.lastIndexOf('.') <= 0) {
          return
        }

        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])

        this.$emit('input', files[0])
      }
    },

    removeFile () {
      this.imageUrl = ''
    }
  }
}
</script>

<style scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
</style>
