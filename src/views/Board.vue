<template>
  <main class="board">
    <date-selector />
  </main>
</template>
<script lang="ts">
import Vue from 'vue';
import DateSelector from '@/components/DateSelector.vue';

export default Vue.extend({
  components: {
    DateSelector,
  },
});
</script>
<style lang="scss" scoped>
.board {
}
</style>
