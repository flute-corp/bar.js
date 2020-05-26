<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="fas fa-bars"
        />

        <q-toolbar-title>
          Bar.js
        </q-toolbar-title>

      </q-toolbar>
      <div class="absolute z-fab" style="top: 20px; right: 30px;">
        <q-btn color="positive" fab icon="fa fa-receipt"
               @click="showReceipt = true" />
      </div>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        bordered
        content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="fas fa-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showReceipt">
      <q-card>
        <q-tabs v-model="tabs">
          <q-tab name="total">Total</q-tab>
        </q-tabs>
        <q-tab-panels v-model="tabs">
          <q-tab-panel name="total" class="q-pa-none">
            <table-commande :commande="articlesCommande.articles" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import TableCommande from '@/components/table/TableCommande'

const storeCommande = createNamespacedHelpers('commandes')
export default {
  name: 'LayoutDefault',
  components: { TableCommande },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      showReceipt: false,
      tabs: 'total'
    }
  },
  computed: {
    ...storeCommande.mapGetters({
      articlesCommande: 'articlesCommande'
    })
  },
  methods: {
    onShowReceipt () {
      this.tabs = 'total'
      this.showReceipt = true
    }
  }
}
</script>
