<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <img style="width: 60px; height: 60px" src="https://cdn.icon-icons.com/icons2/2225/PNG/512/puppy_icon_134477.png">
          <span class="q-ml-sm texto_logo">SoS Caramelo</span>
        </q-toolbar-title>

        <q-space />

  <div class="q-pa-md q-gutter-sm">
    <q-btn color="white" text-color="black" label="BOTÃO 1" />
    <q-btn color="primary" label="BOTÃO 2" />
    <q-btn color="secondary" label="BOTÃO 3" />
  </div>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white"
      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item class="GNL__drawer-item" v-ripple v-for="link in links1" :key="link.text" clickable @click="redirecionar(link.name)">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm" />

          <q-item class="GNL__drawer-item" v-ripple v-for="link in links2" :key="link.text" clickable @click="redirecionar(link.name)">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm" />

          <q-item class="GNL__drawer-item" v-ripple v-for="link in links3" :key="link.text" clickable @click="redirecionar(link.name)">
            <q-item-section>
              <q-item-label>{{ link.text }} <q-icon v-if="link.icon" :name="link.icon" /></q-item-label>
            </q-item-section>
          </q-item>

          <div class="q-mt-md">
            <div class="flex flex-center q-gutter-xs">
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Privacy">Privacy</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Terms">Terms</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="About">About Google</a>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { fasEarthAmericas, fasFlask } from '@quasar/extras/fontawesome-v6'

export default {
  name: 'GoogleNewsLayout',

  setup () {
    const router = useRouter()
    const leftDrawerOpen = ref(false)
    const search = ref('')
    const showAdvanced = ref(false)
    const showDateOptions = ref(false)
    const exactPhrase = ref('')
    const hasWords = ref('')
    const excludeWords = ref('')
    const byWebsite = ref('')
    const byDate = ref('Any time')

    function onClear () {
      exactPhrase.value = ''
      hasWords.value = ''
      excludeWords.value = ''
      byWebsite.value = ''
      byDate.value = 'Any time'
    }

    function changeDate (option) {
      byDate.value = option
      showDateOptions.value = false
    }

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    function redirecionar (name) {
      router.push(name) // Redireciona para o URL desejado usando o Vue Router do Quasar
    }

    return {
      leftDrawerOpen,
      search,
      showAdvanced,
      showDateOptions,
      exactPhrase,
      hasWords,
      excludeWords,
      byWebsite,
      byDate,

      links1: [
        { icon: 'web', text: 'Cadastre Um Regaste', name: 'NovoChamado' },
        { icon: 'person', text: 'Sobre o SOS Caramelo', name: '' },
        { icon: 'star_border', text: 'Ajude Nossa Causa', name: 'AjudeNossaCausa' },
        { icon: 'search', text: 'Conscientize-se', name: '' }
      ],
      links2: [
        { icon: fasEarthAmericas, text: 'Mapa de Chamados', name: 'Mapa' },
        { icon: 'domain', text: 'Adoçao Responsavel', name: '' },
        { icon: 'memory', text: 'Como Agir', name: '' },
        { icon: 'local_movies', text: 'Nao se cale denuncie', name: '' },
        { icon: 'directions_bike', text: 'Noticias', name: '' },
        { icon: fasFlask, text: 'O que fazemos', name: '' },
        { icon: 'fitness_center', text: 'Ajude Nossa causa ', name: '' }
      ],
      links3: [
        { icon: '', text: 'Language & region', name: '' },
        { icon: '', text: 'Settings', name: '' },
        { icon: 'open_in_new', text: 'Get the Android app', name: '' },
        { icon: 'open_in_new', text: 'Get the iOS app', name: '' },
        { icon: '', text: 'Send feedback', name: '' },
        { icon: 'open_in_new', text: 'Help', name: '' }
      ],

      onClear,
      changeDate,
      toggleLeftDrawer,
      redirecionar
    }
  }
}
</script>

<style lang="sass">
.GNL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 55%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      .q-icon
        color: #5f6368

    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Carter+One&display=swap');
.texto_logo {
     font-family: 'Carter One';
     font-style: normal;
     font-weight: 400;
     background-color: rgb(224, 221, 27);

   }

   .minhaBarraPesquisa {
    width: 20%;
    padding: 2px;
    border: 3px solid #ccc;
    border-radius: 30px; /* Isso faz as bordas arredondadas */
}
</style>
