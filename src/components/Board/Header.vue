<template>
  <div class="header">
    <h1 v-if="board" class="header__title" data-test="pageTitle">
      {{ board.name }}
    </h1>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { Board } from '@/@types';

@Component({
  computed: {
    ...mapGetters({
      board: 'board',
    }),
  },
})
export default class BoardHeader extends Vue {
  board!: Board;
}
</script>
<style lang="scss" scoped>
.header {
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
