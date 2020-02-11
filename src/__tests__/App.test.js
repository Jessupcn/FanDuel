import React from 'react';
import { shallow, mount } from 'enzyme';

import App from '../App';
import { Matchup } from '../components';

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders with game in an inactive state', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Matchup)).toHaveProp({ activeGame: false });
  });
});
