import React from 'react';
import { Text} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

const {Value, timing, interpolate} = Animated;

const SnackBar = ({error}) => {
  const [animation] = React.useState(new Value(0));
  const [errorState, setError] = React.useState('');
  React.useEffect(() => {
    if (error) {
      setError(error);
      timing(animation, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
      }).start();
    } else {
      timing(animation, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
      }).start();
    }
  }, [animation, error]);
  const height = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [0, 80],
    extrapolate: Easing.ease,
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#d32f2f',
        height,
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <Text
        style={{
          paddingBottom: 10,
          fontSize: 16,
          fontWeight: '500',
          color: 'white',
        }}>
        {errorState}
      </Text>
    </Animated.View>
  );
};

export default SnackBar;
