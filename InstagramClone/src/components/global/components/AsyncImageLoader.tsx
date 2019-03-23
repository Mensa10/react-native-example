import * as React from 'react';
import { Image, Animated } from 'react-native';

class AsyncImageLoader extends React.PureComponent<any, {}> {
  state = {
    opacity: new Animated.Value(0),
    loading: true,
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    this.setState(() => ({ loading: false }));
  }

  render() {
    const { loading } = this.state;

    return (
      <Animated.Image 
        onLoad={this.onLoad}
        source={loading ? this.props.placeholder : this.props.source}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                })
              }
            ]
          },
          this.props.style,
        ]}
      />
    )
  }
}


export default AsyncImageLoader;