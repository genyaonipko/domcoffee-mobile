import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Svg, {Defs, G, LinearGradient, Path, Stop, Text, TSpan} from 'react-native-svg';

const d3 = {
  scale,
  shape,
};

const getValue = item => item.value;

export default class PieChart extends React.PureComponent {
  render() {
    const arcs = d3.shape
      .pie()
      .value(getValue)
      .sort(null)(this.props.distribution);
    const paths = arcs.map(arc =>
      d3.shape
        .arc()
        .outerRadius(this.props.width / 2.1) // Radius of the pie
        .padAngle(0.01) // Angle between sections
        .innerRadius(this.props.width / 2.1 - this.props.weight)(
        // Inner radius: to create a donut or pie
        arc,
      ),
    );
    return (
      <>
        <Svg width={this.props.width} height={this.props.height}>
          <G x={this.props.width / 2} y={this.props.height / 2}>
            {paths.map((path, index) => (
              <Path
                strokeWidth={index === this.props.selectedIndex ? 2.5 : 0}
                stroke={'#000000'}
                key={index}
                onPress={() => this.props.onPressChartItem(index)}
                d={path}
                fill={
                  index === this.props.selectedIndex
                    ? 'red'
                    : this.props.color
                }
              />
            ))}
          </G>
        </Svg>
        <View style={styles.message}>{this.props.children}</View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  message: {
    zIndex: -5,
    position: 'absolute',
    bottom: 10,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
