<template>
  <v-container>
    <div class="account-categories">
      <div class="account-categories__title">{{ title }}</div>
      <div
        class="account-categories__list"
        v-for="c in parsedData"
        :key="c.name"
      >
        <v-layout row wrap class="account-categories__list__item">
          <v-flex xs6 md5 class="account-categories__list__item__title">
            {{ c.name }}
          </v-flex>
          <v-flex xs6 md3 lg2 class="account-categories__list__item__value">
              {{ c.total }} €
          </v-flex>
          <v-flex xs12 md4 lg5 class="account-categories__list__item__chart">

            <div
              class="account-categories__list__item__chart__container"
              :style="'width:' + getPercentage(c.total) + '%;'"
            >
              <div
                class="account-categories__list__item__chart__container__bar"
                :style="'background-color:' + color + ';'"
              ></div>
            </div>

          </v-flex>
        </v-layout>
      </div>
    </div>
  </v-container>
</template>

<script>
  import { orderBy } from 'lodash';

  export default {
    name: 'BiAccountCategories',
    components: {},
    props: {
      color: {
        type: String,
        default: '#1e88e5',
      },
      title: {
        type: String,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
      maxItems: {
        type: Number,
        default: 3
      }
    },
    computed: {
      parsedData() {
        return orderBy(this.data, 'total', 'desc').filter(d => d.total > 0).slice(0, this.maxItems);
      },
      maxValue() {
        return Math.max(...this.data.map((d) => d.total));
      },
      chartOptions() {
        return {}
      }
    },
    methods: {
      getPercentage: function (value) {
        return parseInt(value * 100 / this.maxValue);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'categories';
</style>
