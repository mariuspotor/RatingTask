import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={47} height={48} fill="none" {...props}>
    <Path
      d="M42.167.667H4.833C2.267.667.19 2.767.19 5.333l-.023 42L9.5 38h32.667a4.68 4.68 0 0 0 4.666-4.667v-28A4.68 4.68 0 0 0 42.167.667Zm-32.667 28v-5.764L25.553 6.85a1.155 1.155 0 0 1 1.657 0l4.13 4.13c.467.467.467 1.19 0 1.657l-16.077 16.03H9.5Zm28 0H20L24.667 24H37.5v4.667Z"
      fill="#FFC34E"
    />
  </Svg>
);

export default SvgComponent;
