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
