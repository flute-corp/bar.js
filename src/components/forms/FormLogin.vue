<template>
  <v-form>
    <v-text-field
            v-model="_value.user"
            label="Utilisateur"
    />
    <v-text-field
            v-model="_value.password"
            :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
            @click:append="() => (hidePassword = !hidePassword)"
            :type="hidePassword ? 'password' : 'text'"
            label="Mot de passe"
    />
    <p class="text-xs-center font-weight-bold">ou</p>
    <p class="text-xs-center">
      <sso-google></sso-google>
      <sso-facebook></sso-facebook>
    </p>
  </v-form>
</template>

<script>
  import formMixin from '../mixins/formMixin'
  import SsoGoogle from '../sso/google'
  import SsoFacebook from '../sso/facebook'

  export default {
    name: 'form-login',
    components: {SsoGoogle, SsoFacebook},
    mixins: [formMixin],
    data() {
      return {
        hidePassword: true,
      }
    }
  }
</script>

<style scoped>
</style>
