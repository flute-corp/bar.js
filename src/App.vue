<template>
  <v-app>
    <v-toolbar
        app
        dense
        dark
        color="blue darken-2"
    >
      <img width="42" height="42" src="@/assets/img/bar.svg" alt="">
      <v-toolbar-title>{{$route.name}}</v-toolbar-title>
      <v-spacer/>
      <avatar :size="40" @click="toggle"/>
    </v-toolbar>
    <v-content>
      <v-slide-x-transition mode="out-in">
        <router-view :key="$route.path"/>
      </v-slide-x-transition>
    </v-content>
    <v-navigation-drawer
        temporary
        right
        v-model="rightDrawer"
        fixed
        app
    >
      <div class="user-area">
        <div>
          <div>
            <avatar :size="64"/>
            <div class="pa-2 body-2 white--text">
              {{ user.name }}
            </div>
          </div>
        </div>
      </div>
      <v-list class="pt-0" dense>
        <v-divider/>
        <v-list-tile v-for="item in items" :key="item.title" @click="rightDrawer = !rightDrawer">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer
        app
    >
      <v-toolbar>
        <v-toolbar-items class="d-flex flex">
          <router-link v-for="item in items" v-if="item.icon" :key="item.name" :to="item.path" tag="div" v-ripple
                       class="d-flex flex pt-1">
            <div class="text-xs-center caption"
                 :style="{color: $route.path === item.path ? $vuetify.theme.primary : ''}">
              <v-icon :color="$route.path === item.path ? 'primary' : ''">{{ item.icon }}</v-icon>
              <br/>{{ item.name }}
            </div>
          </router-link>
        </v-toolbar-items>
      </v-toolbar>
    </v-footer>

    <v-dialog v-model="loginModal" max-width="500px">
      <v-card flat>
        <v-tabs
            grow
            v-model="activeTab"
        >
          <v-tabs-slider/>
          <v-tab>
            Connexion
          </v-tab>
          <v-tab>
            Enregistrement
          </v-tab>
          <v-tab-item class="overflow-auto">
            <v-card-text>
              <form-login :value="user" style="height: 300px" />
            </v-card-text>
          </v-tab-item>
          <v-tab-item class="overflow-auto">
            <v-card-text>
              <form-profile style="height: 300px" />
            </v-card-text>
          </v-tab-item>
        </v-tabs>
        <v-card-actions>
          <v-spacer/>
          <v-btn flat @click.native="loginModal = false">Annuler</v-btn>
          <v-btn flat @click.native="loginModal = false">Envoyer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
        v-for="toast in ui.toast"
        v-bind="toast"
        :key="toast.key"
    >
      {{ toast.text }}
    </v-snackbar>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import Avatar from './components/core/Avatar'
import FormLogin from './components/forms/FormLogin'
import FormProfile from './components/forms/FormProfile'

export default {
  name: 'App',
  components: {
    Avatar,
    FormLogin,
    FormProfile
  },
  created () {
    this.$router.options.routes.forEach(route => {
      this.items.push(route)
    })
  },
  data () {
    return {
      items: [],
      rightDrawer: false,
      loginModal: false,
      activeTab: 0,
      login: {
        user: '',
        password: '',
        _hidePassword: true,
        _valid: false
      },
      register: {
        user: '',
        password: '',
        _hidePassword: true,
        _valid: false
      }
    }
  },
  methods: {
    toggle () {
      if (this.user.id) {
        this.rightDrawer = !this.rightDrawer
      } else {
        this.loginModal = true
      }
    }
  },
  computed: {
    ...mapState([
      'user',
      'ui'
    ])
  }
}
</script>

<style scoped>
  .user-area {
    background: #cccccc url("./assets/img/bar.svg") no-repeat 50% 25%;
    background-size: 15rem;
    padding: 32px 32px 0;
    width: 100%;
  }
</style>
