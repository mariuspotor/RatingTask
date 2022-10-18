import React, {
  type PropsWithChildren,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Animated,
} from 'react-native';

import StarRating from './StarRating';
import ModalIcon from '../assets/icons/StarRatingModalIcon';

type Props = {
  isVisible: boolean;
  setIsVisible: (x: boolean) => void;
  onClose: () => void;
  onSave: (stars: number, feedback?: string) => void;
};

const StarRatingModal: React.FC<PropsWithChildren<Props>> = ({
  isVisible,
  setIsVisible,
  onClose,
  onSave,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isFeedbackVisible, setFeedbackVisible] = useState<boolean>(false);
  const feedbackHeight = useRef(new Animated.Value(0)).current;
  const remindButtonHeight = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    setFeedbackVisible(rating != 0 && rating <= 3);
    rating > 3 && onSaveModal(rating);
  }, [rating]);

  useEffect(() => {
    isFeedbackVisible ? expandView() : collapseView();
  }, [isFeedbackVisible]);

  const collapseView = () => {
    Animated.timing(feedbackHeight, {
      duration: 1000,
      toValue: 0,
      useNativeDriver: false,
    }).start();
    Animated.timing(remindButtonHeight, {
      duration: 1000,
      toValue: 100,
      useNativeDriver: false,
    }).start(() => setIsVisible(false));
  };

  const expandView = () => {
    Animated.timing(feedbackHeight, {
      duration: 1000,
      toValue: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(remindButtonHeight, {
      duration: 1000,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const hideAndReset = () => {
    setIsVisible(false);
    setRating(0);
    setFeedback('');
  };

  const onCloseModal = () => {
    hideAndReset();
    onClose();
  };

  const onSubmit = (feedback: string) => {
    hideAndReset();
    onSave(rating, feedback);
  };

  const onSaveModal = (stars: number) => {
    setTimeout(hideAndReset, 1100);
    onSave(stars);
  };

  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setIsVisible(!isVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.icon}>
            <ModalIcon />
          </View>
          <Text style={styles.title}>Enjoying RacketPal?</Text>
          <Text style={styles.text}>
            Tap a star to rate it on the App store
          </Text>

          <StarRating onRate={r => setRating(r)} />

          <Animated.View
            style={[styles.feedbackWrapper, {maxHeight: feedbackHeight}]}>
            <Text style={styles.feedbackText}>Any feedback for us?</Text>
            <TextInput
              style={styles.input}
              multiline
              onChangeText={setFeedback}
            />
            <Pressable
              style={[styles.button, styles.buttonSubmit]}
              onPress={() => onSubmit(feedback)}>
              <Text style={[styles.buttonText, styles.buttonSubmitText]}>
                Submit
              </Text>
            </Pressable>
          </Animated.View>

          <Animated.View
            style={{maxHeight: remindButtonHeight, overflow: 'hidden'}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onCloseModal}>
              <Text style={[styles.buttonText, styles.buttonCloseText]}>
                Remind me later
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 6,
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 84,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -25,
  },
  title: {
    marginTop: 30,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  text: {
    fontSize: 12,
    marginBottom: 16,
  },
  button: {
    borderRadius: 6,
    elevation: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
    padding: 15,
  },
  buttonClose: {
    marginTop: 28,
  },
  buttonCloseText: {
    color: '#9E9DA2',
    textTransform: 'uppercase',
  },
  buttonSubmit: {
    marginTop: 16,
    backgroundColor: '#FFC34E',
  },
  buttonSubmitText: {
    color: 'white',
  },
  feedbackWrapper: {
    width: '100%',
    overflow: 'hidden',
    marginTop: 20,
  },
  feedbackText: {
    color: '#FFC34E',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  input: {
    height: 112,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#FFC34E',
    borderRadius: 6,
    padding: 10,
  },
});

export default StarRatingModal;
