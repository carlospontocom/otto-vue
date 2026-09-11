<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> wallet </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.label"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EssentialLink, {
  type EssentialLinkProps
} from "@/components/EssentialLink.vue";

const linksList = [
  // Links internos da sua aplicação
  {
    label: 'Home',
    caption: 'Página inicial',
    icon: 'home',
    link: '/'
  },
  {
    label: 'Gestor',
    caption: 'Gerenciar transações',
    icon: 'account_balance_wallet',
    link: '/gerenciadorCarteira'
  },

  // Link externo
  {
    label: 'Documentação Quasar',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  }
]
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
