var React = require('react-native');

var {
  StyleSheet,
  View,
  Animated, 
  PanResponder
} = React;

export default React.createClass({  
  getInitialState() {
    return {
      pan: new Animated.ValueXY()
    };
  },

  componentWillMount() {
    this._animatedValueX = 0;
    this.state.pan.x.addListener((value) => this._animatedValueX = value.value);

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({ x: this._animatedValueX });
        this.state.pan.setValue({ x: 0 });
      },

      onPanResponderMove: Animated.event([
        null, {
          dx: this.state.pan.x
        },
      ]),

      onPanResponderRelease: () => {
        console.log(this.state.pan.x._value);

        if (this.state.pan.x._value < -150) {
          console.log('release me and you delete me');
        }

        Animated.spring(this.state.pan, {
          toValue: 0,
        }).start();
      }
    });
  },  

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();  
  },

  getStyle() {
    return [
      styles.square, 
      {
        transform: [
          {
            translateX: this.state.pan.x
          },
          {
            scale: this.state.pan.x.interpolate({
              inputRange: [-200, 0, 200],
              outputRange: [0.5, 1, 0.5]
            })
          }
        ]
      },
    ];
  },
  render() {
    return (
      <View style={ styles.container }>
        <Animated.View style={ this.getStyle() } { ...this._panResponder.panHandlers } />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'blue'
  } 
});
