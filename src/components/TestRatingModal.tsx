import React, {type PropsWithChildren} from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import CloseIcon from '../assets/icons/CloseIcon';
import ModalIcon from '../assets/icons/TestRatingModalIcon';

type Props = {
  isVisible: boolean;
  setIsVisible: (x: boolean) => void;
  onClose: () => void;
  onRateUs: () => void;
  onFeedback: () => void;
};

const TestModal: React.FC<PropsWithChildren<Props>> = ({
  isVisible,
  setIsVisible,
  onClose,
  onRateUs,
  onFeedback,
}) => {
  const onGiveFeedback = () => {
    setIsVisible(false);
    onFeedback();
  };

  const onRateUsClick = () => {
    setIsVisible(false);
    onRateUs();
  };

  const onCloseModal = () => {
    setIsVisible(false);
    onClose();
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
          <Pressable
            style={{
              width: '100%',
              alignItems: 'flex-end',
            }}
            onPress={onCloseModal}>
            <CloseIcon />
          </Pressable>

          <ModalIcon />

          <Text style={styles.title}>Enjoying RacketPal?</Text>
          <Text style={styles.text}>
            Your App Store review greatly helps spread the word and grow the
            racket sports community!
          </Text>

          <Pressable
            style={[styles.button, styles.buttonRate]}
            onPress={onRateUsClick}>
            <Text style={[styles.buttonText, styles.buttonRateText]}>
              Rate us
            </Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonFeedback]}
            onPress={onGiveFeedback}>
            <Text style={[styles.buttonText, styles.buttonFeedbackText]}>
              Not yet? Give us feedback
            </Text>
          </Pressable>
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
  title: {
    marginTop: 40,
    marginBottom: 16,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    borderRadius: 6,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    padding: 15,
  },
  buttonFeedback: {
    marginTop: 28,
  },
  buttonFeedbackText: {
    color: 'black',
    textDecorationLine: 'underline',
  },
  buttonRate: {
    width: '100%',
    marginTop: 16,
    backgroundColor: '#1FB0F7',
  },
  buttonRateText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TestModal;
