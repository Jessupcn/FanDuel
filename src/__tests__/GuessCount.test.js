import React from 'react';
import { shallow, mount } from 'enzyme';

import { GuessCount } from '../components';

describe('<GuessCount />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<GuessCount />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a guess count', () => {
    const wrapper = mount(<GuessCount guessCount={3} />);
    const text = wrapper.find('#guessCount').text();

    expect(text).toBe('Total Guesses: 3');
  });

  it('renders a correct count', () => {
    const wrapper = mount(<GuessCount correctCount={7} />);
    const text = wrapper.find('#correctCount').text();

    expect(text).toBe('Total Correct: 7/10');
  });
});
