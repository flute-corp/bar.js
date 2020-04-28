<template>
  <v-form>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex xs6 sm6>
          <v-text-field v-model="_value.user" label="Nom d'utilisateur" />
        </v-flex>
        <v-flex xs6 sm6>
          <v-text-field label="Nom public" hint="Nom qui apparaitra publiquement" />
        </v-flex>
        <v-flex xs6 sm6>
          <v-text-field
              v-model="_value.password"
              :append-icon="hidePassword[0] ? 'visibility' : 'visibility_off'"
              @click:append="() => (hidePassword[0] = !hidePassword[0])"
              :type="hidePassword[0] ? 'password' : 'text'"
              label="Mot de passe"
          />
        </v-flex>
        <v-flex xs6 sm6>
          <v-text-field
              v-model="_value.passwordConfirm"
              :append-icon="hidePassword[1]? 'visibility' : 'visibility_off'"
              @click:append="() => (hidePassword[1] = !hidePassword[1])"
              :type="hidePassword[1] ? 'password' : 'text'"
              label="Confirmer le passe"
          />
        </v-flex>

        <v-flex xs12>
          <file-uploader select-label="Avatar" remove-label="Supprimer" accept="image/*" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import formMixin from '../mixins/formMixin'
import FileUploader from '../fields/FileUploader'

export default {
  name: 'form-profile',
  components: {
    FileUploader
  },
  mixins: [formMixin],
  data () {
    return {
      hidePassword: [true, true]
    }
  }
}
</script>

<style scoped>

</style>
