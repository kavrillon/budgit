<template>
  <div class="list">
    <transition-group
      name="slide"
      tag="ul"
      class="list__content"
      data-test="boardsList"
      appear
      mode="out-in"
    >
      <li
        class="list__content__item"
        v-for="(item, key) in items"
        :key="key"
        :style="`transition-delay: ${200 * (key + 1)}ms;`"
      >
        <board-summary :board="item" />
      </li>
    </transition-group>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

import { Board } from '@/@types';
import BoardSummary from '@/components/Board/Summary.vue';

@Component({
  components: { BoardSummary },
  computed: {
    ...mapGetters({
      items: 'list',
    }),
  },
})
export default class BoardsContent extends Vue {
  items!: Board[];
}
</script>
<style lang="scss" scoped>
.list {
  &__content {
    margin: 0 auto;
    padding: 0;
    list-style: none;

    @media (min-width: $sm) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    &__item {
      margin-top: var(--gutter-lg);
      transition-delay: 1s;

      &:first-of-type {
        margin-top: 0;
      }

      @media (min-width: $sm) {
        flex: 0 0 calc(50% - var(--gutter));

        &:nth-of-type(2) {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
