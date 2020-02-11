import React from 'react';
import { shallow, mount } from 'enzyme';

import { PlayerCard } from '../components';

describe('<PlayerCard />', () => {
  let mockPlayer;

  beforeEach(() => {
    mockPlayer = {
      images: { default: { url: '' } },
      id: 1,
      first_name: 'Kevin',
      last_name: 'Durant',
      fppg: 39.98
    };
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<PlayerCard player={mockPlayer} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders with a button', () => {
    const wrapper = mount(<PlayerCard player={mockPlayer} />);

    expect(wrapper.find('button').length).toBe(1);
  });

  it('button calls submitGuess function', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <PlayerCard submitGuess={callback} player={mockPlayer} />
    );
    wrapper
      .find('.playerButton')
      .first()
      .simulate('click');

    expect(callback).toHaveBeenCalled();
  });

  it('button is disabled after guess is submitted', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <PlayerCard
        guessSubmitted={true}
        submitGuess={callback}
        player={mockPlayer}
      />
    );
    const button = wrapper.find('.playerButton').first();
    button.simulate('click');

    expect(button).toBeDisabled();
    expect(callback).not.toHaveBeenCalled();
  });
});
