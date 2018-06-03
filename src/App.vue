<template>
  <v-app>
    <v-navigation-drawer
        :mini-variant="miniVariant"
        v-model="isOpen"
        fixed
        app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-btn icon @click.stop="toggleSize">
              <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/>
            </v-btn>
            <v-list-tile-content>
              <v-list-tile-title>Réduire</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider/>
        <v-list-tile v-for="item in items" v-if="item.icon" :key="item.name" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
        app
        dark=""
        color="blue darken-2"
    >
      <v-toolbar-side-icon @click.stop="toggleMenu"/>
      <v-toolbar-title>{{$route.name}}</v-toolbar-title>
      <v-spacer/>

      <img width="50" height="50" src="@/assets/img/bar.svg" alt="">
    </v-toolbar>
    <v-content>
      <v-slide-x-transition mode="out-in">
        <router-view :key="$route.path"/>
      </v-slide-x-transition>
    </v-content>
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
