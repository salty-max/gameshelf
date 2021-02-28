import PSLogo from '../assets/images/ps-logo.png';
import SwitchLogo from '../assets/images/switch-logo.png';

const getHardwareLogo = (platform: string) => {
  let source;
  if (platform.includes('Playstation')) source = PSLogo;
  else if (platform.includes('Switch')) source = SwitchLogo;
  console.log(source);
  return source;
};

export default getHardwareLogo;
