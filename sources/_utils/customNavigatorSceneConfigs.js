import React from 'react-native';


const {
  Navigator,
  Dimensions
} = React;

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
