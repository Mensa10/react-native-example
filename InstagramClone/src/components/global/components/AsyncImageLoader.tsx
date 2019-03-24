import * as React from 'react';
import { Animated } from 'react-native';

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
    let src = this.props.source;
    if (!loading) {
      src = this.props.source.uri === '' ? this.props.placeholder : this.props.source;
    }

    return (
      <Animated.Image 
        onLoad={this.onLoad}
        source={loading ? this.props.placeholder : src}
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