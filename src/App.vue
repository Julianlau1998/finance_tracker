<template>
  <div id="app">
    <topnav />
    <router-view/>
  </div>
</template>

<script>
import topnav from '@/components/TopNav'
export default {
  components: {
    topnav
  },
  data () {
    return  {
      selectedLanguage: ''
      }
  },
  created() {
    this.selectedLanguage = localStorage.getItem('language')
    if (this.selectedLanguage) {
      this.selectedLanguage = JSON.parse(this.selectedLanguage)
    } else {
      this.selectedLanguage = ''
    }
  },
  watch: {
    selectedLanguage (val) {
      if (val.length) this.$i18n.locale = val
    }
  }
}
</script>

<style>
@import './assets/styles/main.css';
@import './assets/styles/topnav.css';
@import './assets/styles/calculator.css';
@import './assets/styles/overview.css';
@import './assets/styles/helpers.css';
@import './assets/styles/settings.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #6f8ca8;
}
</style>
