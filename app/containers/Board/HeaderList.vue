<template>
  <div v-if="loading === false && boards.length > 0" class="headerlist">
    <transition-slide :enter="{ active: true, delay: 50, inverse: true }">
      <h1 class="headerlist__title" data-test="pageTitle">
        Your boards ({{ boards.length }})
      </h1>
    </transition-slide>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter, State } from 'vuex-class';
import TransitionSlide from '@libs/components/Transition/Slide.vue';
import { Board } from '@types';
import { ACTION_BOARD_FETCH_LIST } from '@app/store/board/actions';

const namespace = 'board';

@Component({ components: { TransitionSlide } })
export default class BoardHeaderList extends Vue {
  @Action(ACTION_BOARD_FETCH_LIST, { namespace }) fetchBoards!: Function;
  @Getter('list', { namespace }) boards!: Board[];
  @State('loading') loading!: boolean;

  async mounted() {
    await this.fetchBoards();
  }
}
</script>
<style lang="scss" scoped>
.headerlist {
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
