import { getStorybookUI, configure } from '@storybook/react-native';
import './rn-addons';

// import stories
configure(() => {
  require('../components/Buttons.stories.tsx');
}, module);

// Refer to https://github.com/storybookjs/react-native/tree/master/app/react-native#getstorybookui-options
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
});

export default StorybookUIRoot;
