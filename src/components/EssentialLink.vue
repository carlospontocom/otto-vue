<template>
  <!-- Se for link externo (http/https), usa a tag <a> e href. Se for interno, usa o Vue Router (to) -->
  <q-item
    clickable
    :tag="isExternal ? 'a' : 'div'"
    :href="isExternal ? link : undefined"
    :target="isExternal ? '_blank' : undefined"
    :to="!isExternal ? link : undefined"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface EssentialLinkProps {
  label: string;
  caption?: string;
  link?: string;
  icon?: string;
}

const props = withDefaults(defineProps<EssentialLinkProps>(), {
  caption: "",
  link: "#",
  icon: ""
});

// Identifica se a URL começa com http:// ou https://
const isExternal = computed(() => {
  return props.link.startsWith('http://') || props.link.startsWith('https://')
})
</script>