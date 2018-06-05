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
    </v-toolbar>
    <v-content>
      <v-slide-x-transition mode="out-in">
        <router-view :key="$route.path"/>
      </v-slide-x-transition>
    </v-content>
    <v-footer
        app
    >
      <v-toolbar>
        <v-toolbar-items class="d-flex flex">
          <router-link v-for="item in items" v-if="item.icon" :key="item.name" :to="item.path" tag="div" v-ripple class="d-flex flex pt-1">
            <div class="text-xs-center caption" :style="{color: $route.path === item.path ? $vuetify.theme.primary : ''}">
              <v-icon :color="$route.path === item.path ? 'primary' : ''">{{ item.icon }}</v-icon><br/>{{ item.name }}
            </div>
          </router-link>
        </v-toolbar-items>
      </v-toolbar>
    </v-footer>
  </v-app>
</template>

<script>
import * as types from './store/ui/mutation-types'
import {createNamespacedHelpers} from 'vuex'

const {mapState, mapMutations} = createNamespacedHelpers('ui')

export default {
  name: 'App',
  created () {
    this.$router.options.routes.forEach(route => {
      this.items.push(route)
    })
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    ...mapMutations({
      toggleMenu: types.UI_MENU_TOGGLE,
      toggleSize: types.UI_MENU_TOGGLE_SIZE
    })
  },
  computed: {
    ...mapState([
      'miniVariant'
    ]),
    isOpen: {
      get () {
        return this.$store.state.ui.isOpen
      },
      set (value) {
        if (value) {
          this.$store.commit('ui/menuOpen', value)
        } else {
          this.$store.commit('ui/menuClose', value)
        }
      }
    }
  }
}
</script>
