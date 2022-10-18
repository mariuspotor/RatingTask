import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={35} height={32} fill="none" {...props}>
    <Path
      d="m17.493 25.148-.344-.208-.344.208-9.07 5.466 2.407-10.302.091-.392-.304-.264-8.012-6.93 10.55-.895.4-.034.157-.37 4.125-9.72 4.125 9.72.157.37.4.034 10.55.894-8.012 6.932-.304.263.091.392 2.407 10.302-9.07-5.466Z"
      fill="#FFC34E"
      stroke="#FFC34E"
      strokeWidth={1.333}
    />
  </Svg>
);

export default SvgComponent;
