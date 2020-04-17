<script lang="ts">
import Vue from 'vue';
import { Transition, SlideGroup } from './@types';
import { sleep } from '@libs/promise';

const DEFAULT_ENTER_DELAY = 0;
const DEFAULT_ENTER_DURATION = 480;
const DEFAULT_ENTER_INTERVAL = 150;

const DEFAULT_LEAVE_DELAY = 0;
const DEFAULT_LEAVE_DURATION = 320;
const DEFAULT_LEAVE_INTERVAL = 150;

const DEFAULT_GROUP_TAG = 'div';
const DEFAULT_GROUP_TAG_CLASS = '';

export default Vue.extend({
  functional: true,
  props: {
    enter: {
      type: Object as () => Transition,
      required: false,
      default: () => ({ active: false } as Transition),
    },
    leave: {
      type: Object as () => Transition,
      required: false,
      default: () => ({ active: false } as Transition),
    },
    group: {
      type: Object as () => SlideGroup,
      required: false,
      default: () => ({ active: false } as SlideGroup),
    },
  },
  render(h, ctx) {
    const type = ctx.props.group.active ? 'transition-group' : 'transition';
    const data = {
      class: ctx.props.group.tagClass || DEFAULT_GROUP_TAG_CLASS,
      props: {
        name: 'opacity',
        mode: 'out-in',
        css: false,
        appear: true,
        tag: ctx.props.group.tag || DEFAULT_GROUP_TAG,
      },
      on: {
        beforeEnter(el: HTMLElement) {
          if (ctx.props.enter.active === true) {
            const duration =
              typeof ctx.props.enter.duration === 'number'
                ? ctx.props.enter.duration
                : DEFAULT_ENTER_DURATION;

            el.style.opacity = '0';
            el.style.transitionProperty = 'opacity';
            el.style.transitionDuration = `${duration}ms`;
          }
        },
        async enter(el: HTMLElement, done: Function) {
          if (ctx.props.enter.active === true) {
            const index = parseInt(el.dataset.index || '0', 10);
            const delay =
              typeof ctx.props.enter.delay === 'number'
                ? ctx.props.enter.delay
                : DEFAULT_ENTER_DELAY;
            const interval =
              typeof ctx.props.enter.interval === 'number'
                ? ctx.props.enter.interval
                : DEFAULT_ENTER_INTERVAL;
            const timeout = delay + index * interval;

            await sleep(timeout);

            el.style.opacity = '1';
            done();
          }
        },
        beforeLeave(el: HTMLElement) {
          if (ctx.props.leave.active === true) {
            const duration =
              typeof ctx.props.leave.duration === 'number'
                ? ctx.props.leave.duration
                : DEFAULT_LEAVE_DURATION;

            el.style.transitionProperty = 'opacity';
            el.style.transitionDuration = `${duration}ms`;
          }
        },
        async leave(el: HTMLElement, done: Function) {
          if (ctx.props.leave.active === true) {
            const index = parseInt(el.dataset.index || '0', 10);
            const delay =
              typeof ctx.props.leave.delay === 'number'
                ? ctx.props.leave.delay
                : DEFAULT_LEAVE_DELAY;
            const interval =
              typeof ctx.props.leave.interval === 'number'
                ? ctx.props.leave.interval
                : DEFAULT_LEAVE_INTERVAL;
            const timeout = delay + index * interval;
            const duration =
              typeof ctx.props.leave.duration === 'number'
                ? ctx.props.leave.duration
                : DEFAULT_LEAVE_DURATION;

            await sleep(timeout);

            el.style.opacity = '0';

            await sleep(duration);
            done();
          }
        },
      },
    };
    return h(type, data, ctx.children);
  },
});
</script>
