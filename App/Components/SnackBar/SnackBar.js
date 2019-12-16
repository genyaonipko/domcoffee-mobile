import React from 'react';
import {View, Text, Animated} from 'react-native';

const SnackBar = ({error}) => {
  const [animation] = React.useState(new Animated.Value(0));
  console.log(error);
  React.useEffect(() => {
    if (error) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
      }).start();
    }
  }, [error]);
  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'red',
        height,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <Text style={{
        paddingBottom: 10,
        fontSize: 16,
        fontWeight: '500',
        color: 'white'
      }}>{error}</Text>
    </Animated.View>
  );
};

export default SnackBar;
