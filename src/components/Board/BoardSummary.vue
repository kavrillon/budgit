<template>
  <router-link
    :to="`/board/${board.id}`"
    class="board-summary"
    data-test="boardSummary"
  >
    {{ board.name }}
  </router-link>
</template>
<script lang="ts">
import Vue from 'vue';

import { Board } from '@/@types';

export default Vue.extend({
  name: 'BoardSummary',
  props: {
    board: {
      type: Object as () => Board,
      required: true,
    },
  },
});
</script>
