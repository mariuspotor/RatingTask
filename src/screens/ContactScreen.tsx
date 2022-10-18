import React, {type PropsWithChildren} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../App';
import {useStarRating} from '../contexts/StarRatingProvider';
import {triggerAction} from '../api/starRatingApi';
import {triggerAction as testTriggerAction} from '../api/testRatingApi';
// import {getRemoteValue} from '../services/firebase';

type Props = NativeStackScreenProps<RootStackParamList, 'Contact'>;

const ContactScreen: React.FC<PropsWithChildren<Props>> = () => {
  const {setIsVisible} = useStarRating();
  const experiment = 'current'; //getRemoteValue('rating');

  const accept = () => {
    const action = experiment === 'current' ? triggerAction : testTriggerAction;
    action().then(result => {
      setIsVisible(result.canDisplayRating);
    });
  };

  return (
    <View style={styles.wrapper}>
      <Text>Contact Screen</Text>
      <Button title="Accept invitation" onPress={accept} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ContactScreen;
