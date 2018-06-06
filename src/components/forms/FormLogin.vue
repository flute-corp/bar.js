<template>
  <v-form>
    <v-text-field
        v-model="_value.user"
        label="Utilisateur"
    />
    <v-text-field
        v-model="_value.password"
        :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (hidePassword = !hidePassword)"
        :type="hidePassword ? 'password' : 'text'"
        label="Mot de passe"
    />
  </v-form>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'form-login',
  mixins: [formMixin],
  data () {
    return {
      hidePassword: true
    }
  }
}
</script>

<style scoped>

</style>
