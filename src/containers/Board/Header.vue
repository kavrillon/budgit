<template>
  <div v-if="loading === false && board !== null" class="boardheader">
    <transition-slide :enter="{ active: true, delay: 50 }">
      <h1 class="boardheader__title" data-test="pageTitle">
        {{ board.name }}
      </h1>
    </transition-slide>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter, State } from 'vuex-class';
import TransitionSlide from '@libs/components/Transition/Slide.vue';
import { Board } from '@/@types';
import { ACTION_BOARD_FETCH_ITEM } from '@/store/board/actions';

const namespace = 'board';

@Component({ components: { TransitionSlide } })
export default class BoardHeader extends Vue {
  @Action(ACTION_BOARD_FETCH_ITEM, { namespace }) fetchBoard!: Function;
  @Getter('current', { namespace }) board?: Board | null;
  @Prop({ default: -1 }) readonly boardId!: number;
  @State('loading') loading!: boolean;

  mounted() {
    this.fetchBoard(this.boardId);
  }
}
</script>
<style lang="scss" scoped>
.boardheader {
  &__title {
    @include title;

    transition: font-size $transition-duration-fast $transition-effect-default;
    will-change: font-size;

    .app--scrolled & {
      font-size: var(--font-size-subtitle);
    }
  }
}
</style>
