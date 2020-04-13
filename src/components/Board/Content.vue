<template>
  <section class="content" data-test="board">
    <board-total v-if="board" :board="board" />
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { Board } from '@/@types';
import BoardTotal from '@/components/Board/Total.vue';

@Component({
  components: { BoardTotal },
  computed: {
    ...mapGetters({
      board: 'board',
    }),
  },
})
export default class BoardContent extends Vue {
  board!: Board;
}
</script>
