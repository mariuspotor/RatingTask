import AsyncStorage from '@react-native-async-storage/async-storage';
import {hasOneMonthPassed, hasOneWeekPassed} from '../utils/date';

const USER_ID = '2';

type Rating = {
  registerDate: string;
  lastDisplayed: string;
  rated: boolean;
};

export const subtractOneWeek = async () => {
  const rating = await getUserRating();
  const lastDisplayed = rating?.lastDisplayed || new Date();
  const date = new Date(lastDisplayed);
  date.setDate(date.getDate() - 7);
  setUserRating({...rating, lastDisplayed: date.toISOString()});
};

export const subtractOneMonth = async () => {
  const rating = await getUserRating();
  const register = rating?.registerDate || new Date();
  const date = new Date(register);
  date.setMonth(date.getMonth() - 1);
  setUserRating({...rating, registerDate: date.toISOString()});
};

export const getUserRating = async (): Promise<Rating | null> => {
  let rating;
  try {
    rating = await AsyncStorage.getItem(USER_ID);
  } catch (e) {
    rating = null;
  }
  return rating ? JSON.parse(rating) : rating;
};

const setUserRating = async (rating: Partial<Rating>) => {
  const jsonValue = JSON.stringify(rating);
  await AsyncStorage.setItem(USER_ID, jsonValue);
};

export const registerUser = async () => {
  const now = new Date();
  setUserRating({
    registerDate: now.toISOString(),
  });
};

export const closeRating = async () => {
  const rating = await getUserRating();
  const now = new Date();

  setUserRating({...rating, lastDisplayed: now.toISOString()});
};

export const saveRating = async () => {
  const rating = await getUserRating();
  const now = new Date();
  setUserRating({...rating, rated: true, lastDisplayed: now.toISOString()});
};

// triggering actions: create pulbic game, join game, invite, accept
export const triggerAction = async () => {
  // after the user has completed the action, check if the rating popup can be displayed in the UI
  const result = await canDisplayRating();
  return {
    canDisplayRating: result,
  };
};

const canDisplayRating = async () => {
  const rating = await getUserRating();

  if (!rating?.registerDate) {
    await registerUser();
  }

  const registerDate = rating?.registerDate;
  const lastDisplayed = rating?.lastDisplayed;

  if (!lastDisplayed || !registerDate) return true;

  const conditon1 =
    !hasOneMonthPassed(registerDate) && hasOneWeekPassed(lastDisplayed);
  const conditon2 =
    hasOneMonthPassed(registerDate) && hasOneMonthPassed(lastDisplayed);

  return !rating?.rated && (conditon1 || conditon2);
};
