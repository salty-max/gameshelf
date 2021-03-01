import React from 'react';
import PSLogo from '../assets/images/ps-logo.png';
import SwitchLogo from '../assets/images/switch-logo.png';

const getHardwareLogo = (platform: string) => {
  return (
    <>
      {platform.includes('Playstation') && (
        <img src={PSLogo} alt={platform} className="w-full h-full" />
      )}
      {platform.includes('Switch') && (
        <img src={SwitchLogo} alt={platform} className="w-full h-full" />
      )}
      {platform.includes('PC') && <i className="fab fa-steam text-lg text-blue-dark" />}
    </>
  );
};

export default getHardwareLogo;
