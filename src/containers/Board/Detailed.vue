<template>
  <section v-if="board" class="boarddetailed" data-test="boardDetailed">
    <board-total :board="board" />
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { Board } from '@/@types';
import BoardTotal from '@/components/Board/Total.vue';
import { ACTION_BOARD_FETCH_ITEM } from '@/store/board/actions';

const namespace = 'board';

@Component({ components: { BoardTotal } })
export default class BoardDetailed extends Vue {
  @Action(ACTION_BOARD_FETCH_ITEM, { namespace }) fetchBoard!: Function;
  @Getter('current', { namespace }) board?: Board | null;
  @Prop({ default: -1 }) readonly boardId!: number;

  async mounted() {
    await this.fetchBoard(this.boardId);
  }
}
</script>
