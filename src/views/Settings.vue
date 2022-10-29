<template>
  <div class="settings-page">
    <div class="is-settings-box">
        <h1 class="header">
            {{ $t('settings.title') }}
        </h1>
        <div class="columns is-justify-content-center is-align-items-center">
            <div class="column is-3">
                <h3>
                    {{ $t('settings.currency') }}
                </h3>
            </div>
            <div class="column is-3">
                <select class="select" v-model="currency">
                    <option value="">
                        -
                    </option>
                    <option value="£">
                        {{ $t('settings.currencies.pound') }}
                    </option>
                    <option value="€">
                        {{ $t('settings.currencies.euro') }}
                    </option>
                    <option value="$" default>
                        {{ $t('settings.currencies.dollar') }}
                    </option>
                </select>
            </div>
        </div>

        <div class="columns is-justify-content-center is-align-items-center mb-6 mt-4">
            <div class="column is-3">
                <h3>
                    {{ $t('settings.language') }}
                </h3>
            </div>
            <div class="column is-3">
                <select
                    v-model="selectedLanguage"
                    class="select"
                    id="language"
                >
                    <option
                    v-for="(lang, i) in langs" :key="`Lang${i}`"
                    :value="lang"
                    >
                        {{ lang }}
                    </option>
                </select>
            </div>
        </div>
    </div>
    <button @click="home" class="button is-home-button">
        {{ $t('settings.home') }}
    </button>
    <button class="button is-support-button-2" id="support" @click="support">
      Watch Ad To Support The Developer
    </button>
  </div>
</template>

<script>
export default {
    data () {
        return {
            currency: '',
            language: '',
            langs: ['English', 'German'],
            selectedLanguage: ''
        }
    },
    created () {
        const localCurrency = localStorage.getItem('currency')
        if (localCurrency) {
            this.currency = JSON.parse(localCurrency)
        }
        this.selectedLanguage = localStorage.getItem('language')
        if (this.selectedLanguage) {
          this.selectedLanguage = JSON.parse(this.selectedLanguage)
        } else {
          this.selectedLanguage = ''
        }
    },
    watch: {
        currency (val) {
            localStorage.setItem('currency', JSON.stringify(val))
        },
        selectedLanguage (val) {
          this.$i18n.locale = val
          localStorage.setItem('language', JSON.stringify(val))
        }
    },
    methods: {
        home () {
            this.$router.push('/')
        },
        support () {
          if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.toggleMessageHandler) {
            window.webkit.messageHandlers.toggleMessageHandler.postMessage({
              "message": 'Trigger reward-ad:'
            });
          }
        }
    }
}
</script>