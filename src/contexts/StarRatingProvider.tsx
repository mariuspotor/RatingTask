import React, {
  createContext,
  useState,
  useContext,
  type PropsWithChildren,
} from 'react';
import {
  closeRating as starRatingClose,
  saveRating as starRatingSave,
} from '../api/starRatingApi';
import {
  closeRating as testRatingClose,
  saveRating as testRatingSave,
} from '../api/testRatingApi';

import StarRatingModal from '../components/StarRatingModal';
import TestRatingModal from '../components/TestRatingModal';
import {getRemoteValue, logEvent} from '../services/firebase';

type Context = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const StarRatingData = createContext<Context>({
  setIsVisible: () => {},
});

export const useStarRating = () => useContext(StarRatingData);

type Props = {
  navigation: any;
};

const StarRatingContext: React.FC<PropsWithChildren<Props>> = ({
  children,
  navigation,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const experiment = getRemoteValue('rating');

  const onStarRatingClose = () => {
    starRatingClose();
  };

  const onStarRatingSave = (stars: number, feedback?: string) => {
    starRatingSave(stars, feedback);
    logEvent('rating_event', {experiment});
  };

  const onTestRatingClose = () => {
    testRatingClose();
  };

  const onTestRatingSave = () => {
    testRatingSave();
    logEvent('rating_event', {experiment});
  };

  const onTestRatingFeedback = () => {
    testRatingSave();
    navigation.navigate('Contact');
  };

  return (
    <StarRatingData.Provider
      value={{
        setIsVisible,
      }}>
      {experiment === 'current' ? (
        <StarRatingModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          onClose={onStarRatingClose}
          onSave={onStarRatingSave}
        />
      ) : (
        <TestRatingModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          onClose={onTestRatingClose}
          onRateUs={onTestRatingSave}
          onFeedback={onTestRatingFeedback}
        />
      )}

      {children}
    </StarRatingData.Provider>
  );
};

export default StarRatingContext;
