import React from 'react';

const Header = () => {
  return (
    <div id="header">
      <div className="primaryHeader flex-center">
        <img
          className="logo"
          src="https://s3.amazonaws.com/cdn.fanduel.com/images/2019/Homepage/Home/fd-shield-logo.svg"
        />
      </div>
      <div className="secondaryHeader flex-center">
        <p>FanDuel Guessing Game</p>
      </div>
    </div>
  );
};

export default Header;
