<template>
  <section
    v-if="loading === false && board !== null"
    class="boarddetailed"
    data-test="boardDetailed"
  >
    <transition-slide :enter="{ active: true, delay: 250, inverse: true }">
      <board-total :board="board" :key="boardId" />
    </transition-slide>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter, State } from 'vuex-class';
import TransitionSlide from '@libs/components/Transition/Slide.vue';
import { Board } from '@app/@types';
import BoardTotal from '@app/components/Board/Total.vue';
import { ACTION_BOARD_FETCH_ITEM } from '@app/store/board/actions';

const namespace = 'board';

@Component({
  components: { BoardTotal, TransitionSlide },
})
export default class BoardDetailed extends Vue {
  @Action(ACTION_BOARD_FETCH_ITEM, { namespace }) fetchBoard!: Function;
  @Getter('current', { namespace }) board?: Board | null;
  @Prop({ default: -1 }) readonly boardId!: number;
  @State('loading') loading!: boolean;

  async mounted() {
    await this.fetchBoard(this.boardId);
  }
}
</script>
