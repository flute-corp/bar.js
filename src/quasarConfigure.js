import Vue from 'vue'
import './styles/quasar.styl'
import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import lang from 'quasar/lang/fr.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {
  Dialog,
  Notify,
  QBtn,
  QCard,
  QCardSection,
  QColor,
  QDialog,
  QDrawer,
  QExpansionItem,
  QFab,
  QFabAction,
  QFooter,
  QHeader,
  QIcon,
  QInput,
  QItem,
  QItemLabel,
  QItemSection,
  QLayout,
  QList,
  QPage,
  QPageContainer,
  QPageSticky,
  QPopupProxy,
  QSeparator,
  QToolbar,
  QToolbarTitle,
  QTooltip,
  Quasar
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QPageSticky,
    QFooter,
    QInput,
    QFab,
    QFabAction,
    QCard,
    QCardSection,
    QDialog,
    QPopupProxy,
    QColor,
    QTooltip,
    QExpansionItem,
    QSeparator
  },
  directives: {},
  plugins: {
    Dialog,
    Notify
  },
  lang: lang,
  iconSet: iconSet
})
