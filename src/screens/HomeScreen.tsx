import React, {type PropsWithChildren} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../App';
import {useStarRating} from '../contexts/StarRatingProvider';
import {
  triggerAction,
  getUserRating,
  subtract24h,
  resetStorage,
} from '../api/starRatingApi';
import {
  triggerAction as testTriggerAction,
  getUserRating as testGetUserRating,
  subtractOneMonth,
  subtractOneWeek,
} from '../api/testRatingApi';
import {checkToken, getRemoteValue, refreshConfig} from '../services/firebase';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<PropsWithChildren<Props>> = ({navigation}) => {
  const {setIsVisible} = useStarRating();
  const experiment = getRemoteValue('rating');
  // checkToken();

  const invite = () => {
    const action = experiment === 'current' ? triggerAction : testTriggerAction;
    action().then(result => {
      setIsVisible(result.canDisplayRating);
    });
  };

  return (
    <View style={styles.wrapper}>
      <Button title="Invite user to game" onPress={invite} />
      {/* <Button
        title="Go to Contact"
        onPress={() => navigation.navigate('Contact')}
      /> */}
      <Text>Current implementation helper</Text>
      <Button title="Subtract 24h" onPress={subtract24h} />
      <Text>Test implementation helper</Text>
      <Button title="Subtract 1 week" onPress={subtractOneWeek} />
      <Button title="Subtract 1 month" onPress={subtractOneMonth} />
      <Text>Other helpers</Text>
      <Button
        title="See storage"
        onPress={async () => {
          const storage =
            experiment === 'current' ? getUserRating : testGetUserRating;
          const rating = await storage();
          console.log(rating);
        }}
      />
      <Button title="Reset storage" onPress={resetStorage} />
      <Button
        title="Refresh config"
        onPress={() => {
          refreshConfig().then(() => {
            const experiment = getRemoteValue('rating');
            console.log({experiment});
          });
        }}
      />
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

export default HomeScreen;
