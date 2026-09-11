<template>
    <input :type="type" :placeholder="placeholder" v-model="model"/> 
</template>

<script setup lang="ts">
    defineProps <{
        type: 'text' | 'number' 
        placeholder: string
    }>()

    const model = defineModel<string | number | null>();
</script>