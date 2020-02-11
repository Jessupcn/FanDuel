import React from 'react';
import { shallow, mount } from 'enzyme';

import { Matchup } from '../components';

describe('<Matchup />', () => {
  let mockMatchup;
  beforeEach(() => {
    mockMatchup = [
      {
        images: { default: { url: '' } },
        id: 1,
        first_name: 'Kevin',
        last_name: 'Durant',
        fppg: 39.98
      },
      {
        images: { default: { url: '' } },
        id: 2,
        first_name: 'Steph',
        last_name: 'Curry',
        fppg: 39.99
      }
    ];
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<Matchup />);
    expect(wrapper.exists()).toBe(true);
  });

  describe('Play Button', () => {
    it('contains a play button on activeGame is false', () => {
      const wrapper = shallow(<Matchup />);
      expect(wrapper).toContainMatchingElement('.playButton');
    });

    it('Play button should call nextMatchup callback when clicked', () => {
      const callback = jest.fn();
      const wrapper = mount(<Matchup nextMatchup={callback} />);
      wrapper
        .find('.playButton')
        .first()
        .simulate('click');
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('Next Matchup Button', () => {
    it('contains a Next Matchup button on guessSubmitted is true and correctCount is less than 10', () => {
      const wrapper = mount(
        <Matchup
          currentMatchup={mockMatchup}
          activeGame={true}
          guessSubmitted={true}
          correctCount={5}
        />
      );
      expect(wrapper).toContainMatchingElement('#nextMatchupButton');
    });

    it('Next Matchup button should call nextMatchup callback when clicked', () => {
      const callback = jest.fn();
      const wrapper = mount(
        <Matchup
          currentMatchup={mockMatchup}
          activeGame={true}
          guessSubmitted={true}
          correctCount={5}
          nextMatchup={callback}
        />
      );
      wrapper.find('#nextMatchupButton').simulate('click');
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('Next Restart Button', () => {
    it('contains a Restart button on guessSubmitted is true and correctCount is 10', () => {
      const wrapper = mount(
        <Matchup
          currentMatchup={mockMatchup}
          activeGame={true}
          guessSubmitted={true}
          correctCount={10}
        />
      );
      expect(wrapper).toContainMatchingElement('#restartButton');
    });

    it('Next Matchup button should call resetGame callback when clicked', () => {
      const callback = jest.fn();
      const wrapper = mount(
        <Matchup
          currentMatchup={mockMatchup}
          activeGame={true}
          guessSubmitted={true}
          correctCount={10}
          resetGame={callback}
        />
      );
      wrapper.find('#restartButton').simulate('click');
      expect(callback).toHaveBeenCalled();
    });
  });
});
