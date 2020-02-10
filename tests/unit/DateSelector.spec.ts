import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import DateSelector from '@components/DateSelector.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(DateSelector);
    expect(wrapper.text()).to.include(msg);
  });
});
