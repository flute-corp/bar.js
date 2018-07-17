<template>
  <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError">
    <div>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
           width="18px" height="18px" viewBox="0 0 48 48"
           class="abcRioButtonSvg">
        <g>
          <path fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
          <path fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
          <path fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
          <path fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
          <path fill="none" d="M0 0h48v48H0z"></path>
        </g>
      </svg>
    </div>
    <span>Connexion</span>
  </g-signin-button>
</template>

<script>
  export default {
    name: "sso-google",
    data() {
      return {
        hidePassword: true,
        googleSignInParams: {
          client_id: '798783669611-0gsh6nnviqsgii3cdqtp0rp0os4alnq5.apps.googleusercontent.com'
        },
      }
    },
    methods: {
      onSignInSuccess: function (googleUser) {
        let auth = googleUser.getBasicProfile();
        let user = {
          id: auth.getId(),
          token: googleUser.getAuthResponse().id_token,
          mail: auth.getEmail(),
          name: auth.getName(),
          avatar: auth.getImageUrl()
        };
        window.USER = user;
        console.info('Connexion réussi avec Google');
        console.info('ID : ' + user.id);
        console.info("Token : " + user.token);
        console.info('Nom : ' + user.name);
        console.info('Mail : ' + user.mail);
        console.info('Avatar : ' + user.avatar);
      }
    },
    onSignInError(error) {
      console.error('Erreur de connexion avec Google', error)
    },

  }
</script>

<style scoped>
  .g-signin-button {
    margin-left:    10px;
    margin-right:   10px;
    margin-top:     20px;
    display:        inline-block;
    height:         36px;
    width:          120px;
    padding:        4px 8px;
    border-radius:  3px;
    cursor:         pointer;
    outline:        none;
    overflow:       hidden;
    position:       relative;
    text-align:     center;
    vertical-align: middle;
    white-space:    nowrap;
    transition:     background-color .218s, border-color .218s, box-shadow .218s;
    box-sizing:     border-box;
    /* Personnalisation Google */
    background-color: #fff;
    color:            #757575;
    box-shadow:       0 2px 4px 0 rgba(0, 0, 0, .25);

  }
  .g-signin-button span {
    font-size:      14px;
    line-height:    32px;
    letter-spacing: 0.21px;
  }
  .g-signin-button div {
    padding: 5px;
    float:   left;
  }
  .g-signin-button:hover {
    box-shadow: 0 0 3px 3px rgba(66, 133, 244, .3);
  }
  .g-signin-button:active {
    background-color: #eee;
    color:            #6d6d6d;
  }
</style>