<template>
  <fb-signin-button
          :params="fbSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 216 216" class="_5h0m"
           color="#FFFFFF">
        <path fill="#FFFFFF" d="
          M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9
          11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1
          11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2
          15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3
          11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"></path>
      </svg>
    </div>
    <span>Connexion</span>
  </fb-signin-button>
</template>

<script>
  export default {
    name: "sso-facebook",
    data() {
      return {
        fbSignInParams: {
          scope: 'email,user_likes',
          return_scopes: true
        }
      }
    },
    methods: {
      onSignInSuccess(response) {
        FB.api('/me', {local: 'fr_FR', fields: 'name, email'}, u => {
          let auth = response.authResponse;
          let user = {
            id: auth.userID,
            token: auth.accessToken,
            mail: u.email,
            name: u.name,
          };
          FB.api('/' + user.id + '/picture?height=200&width=200&redirect=false', 'GET', function (avatar) {
            user.avatar = avatar.data.url
            window.USER = user;
            console.info('Connexion réussi avec Facebook');
            console.info('ID : ' + user.id);
            console.info("Token : " + user.token);
            console.info('Nom : ' + user.name);
            console.info('Mail : ' + user.mail);
            console.info('Avatar : ' + user.avatar);
          });
        });
      },
      onSignInFError(error) {
        console.error('Erreur de connexion Facebook', error)
      }
    }
  }
</script>

<style scoped>
  .fb-signin-button {
    margin-left:      10px;
    margin-right:     10px;
    margin-top:       20px;
    display:          inline-block;
    height:           36px;
    width:            120px;
    padding:          4px 8px;
    border-radius:    3px;
    cursor:           pointer;
    outline:          none;
    overflow:         hidden;
    position:         relative;
    text-align:       center;
    vertical-align:   middle;
    white-space:      nowrap;
    transition:       background-color .218s, border-color .218s, box-shadow .218s;
    box-sizing:       border-box;
    /* Personnalisation Facebook */
    background-color: #4267b2;
    color:            #fff;
  }
  .fb-signin-button span {
    font-size:      14px;
    line-height:    32px;
    letter-spacing: 0.21px;
  }
  .fb-signin-button div {
    padding: 5px;
    float:   left;
  }

</style>