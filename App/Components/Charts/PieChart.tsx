import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

const d3 = {
  scale,
  shape,
};

export interface Item {
  value?: number;
  gradientStart?: string;
  gradientEnd?: string;
}

const getValue = (item: Item) => item.value;

export interface Props extends ViewProps {
  distribution: Item[];
  width: number;
  height: number;
  weight: number;
}

export default class PieChart extends React.PureComponent<Props, {}> {
  render() {
    const arcs = d3.shape
      .pie()
      .value(getValue)
      .sort(null)(this.props.distribution);
    const paths = arcs.map(arc =>
      d3.shape
        .arc()
        .outerRadius(this.props.width / 2) // Radius of the pie
        .padAngle(0.0) // Angle between sections
        .innerRadius(this.props.width / 2 - this.props.weight)(
        // Inner radius: to create a donut or pie
        arc,
      ),
    );
    return (
      <View style={{ width: this.props.width, height: this.props.height }}>
        <Svg width={this.props.width} height={this.props.height}>
          <Defs>
            {paths.map((_, index) => (
              <LinearGradient
                key={index}
                id={'grad' + index}
                x1="0"
                y1="1"
                x2="1"
                y2="0"
              >
                <Stop offset="0" stopColor={this.props.distribution[index].gradientStart} stopOpacity="1" />
                <Stop offset="0.5" stopColor={this.props.distribution[index].gradientEnd} stopOpacity="1" />
              </LinearGradient>
            ))}
          </Defs>
          <G x={this.props.width / 2} y={this.props.height / 2}>
            {paths.map((path, index) => (
              <Path key={index} d={path} fill={'url(#grad' + index + ')'} />
            ))}
          </G>
        </Svg>
        <View style={styles.message}>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  message: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
