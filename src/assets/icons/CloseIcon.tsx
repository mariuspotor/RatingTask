import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path d="m4.5 19.5 15-15M4.5 4.5l15 15" stroke="#000" strokeWidth={2} />
  </Svg>
);

export default SvgComponent;
