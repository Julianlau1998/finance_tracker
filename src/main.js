import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import langs from './lang'

Vue.config.productionTip = false

Vue.use(VueI18n)

const messages = {
  English: langs.en,
  German: langs.de
}

let chosenLanguage = JSON.parse(localStorage.getItem('language'))
if (chosenLanguage === null) {
  if (navigator.language === 'de-DE') {
    chosenLanguage = 'German'
  } else {
    chosenLanguage = 'English'
  }
  localStorage.setItem('language', JSON.stringify(chosenLanguage))
}

const i18n = new VueI18n({
  locale: chosenLanguage, // set locale
  messages // set locale messages
})


new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
