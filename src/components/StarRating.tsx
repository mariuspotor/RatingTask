import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import FilledStar from '../assets/icons/FilledStar';
import EmptyStar from '../assets/icons/EmptyStar';

const MAX_RATING = 5;

type Props = {
  onRate: (rate: number) => void;
};

const StarRating: React.FC<Props> = ({onRate}) => {
  const [rating, setRating] = useState<number>(0);

  const updateRating = (i: number) => {
    setRating(i);
    onRate(i);
  };

  let stars = [];

  for (var i = 1; i <= MAX_RATING; i++) {
    stars.push(
      <TouchableOpacity
        key={i}
        activeOpacity={0.7}
        onPress={updateRating.bind(null, i)}>
        {i <= rating ? <FilledStar /> : <EmptyStar />}
      </TouchableOpacity>,
    );
  }

  return <View style={styles.childView}>{stars}</View>;
};

const styles = StyleSheet.create({
  childView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default StarRating;
