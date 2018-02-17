<template>
  <div class="form-year-selector">
    <v-menu bottom
            transition="slide-y-transition"
            left
            dark
            class="form-year-selector__menu">
      <v-btn
        :icon="!menuYears.includes(activeYear)"
        slot="activator"
        class="form-year-selector__menu__button"
        :class="{'form-year-selector__menu__button--active': menuYears.includes(activeYear)}"
        flat
        dark>
        <v-icon v-show="!menuYears.includes(activeYear)">more_horiz</v-icon>
        <span v-show="menuYears.includes(activeYear)">{{ activeYear }}</span>
      </v-btn>
      <v-list>
        <v-list-tile v-for="item in menuYears" :key="item" @click="selectYear(item)">
          <v-list-tile-title>{{ item }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-btn v-for="item in buttonYears"
           color="white"
           class="form-year-selector__button"
           :class="{'form-year-selector__button--active': activeYear === item}"
           flat
           :key="item"
           @click="selectYear(item)">
      {{ item }}
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'BiFormYearSelector',
    props: {
      data: {
        type: Array,
        required: true,
      },
      activeYear: {
        type: Number,
        default: parseInt((new Date()).getFullYear())
      },
      visibleItems: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {}
    },
    computed: {
      menuYears() {
        return this.data.slice(0, -this.visibleItems).reverse()
      },
      buttonYears() {
        return this.data.slice(-this.visibleItems)
      },
    },
    methods: {
      selectYear: function (item) {
        this.$emit('formYearSelectorYearChange', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'year-selector';
</style>
