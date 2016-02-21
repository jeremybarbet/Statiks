import React, {
  Navigator,
  Dimensions
} from 'react-native';


const { width } = Dimensions.get('window');

export const FloatFromRight = {
  ...Navigator.SceneConfigs.FloatFromRight,
  gestures: {
    pop: {
      ...Navigator.SceneConfigs.FloatFromRight.gestures.pop,
      edgeHitWidth: width,
    },
  },
};

// Remove scale on back scene
export const FloatFromBottom = {
  ...Navigator.SceneConfigs.FloatFromBottom,
  gestures: {
    pop: {
      ...Navigator.SceneConfigs.FloatFromBottom.gestures.pop,
      edgeHitWidth: 150,
    },
  },
};
