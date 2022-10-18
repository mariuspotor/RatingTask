import AsyncStorage from '@react-native-async-storage/async-storage';
import {hasOneDayPassed} from '../utils/date';

// Mock backend calls

const USER_ID = '1';

type Rating = {
  stars: number;
  closeCount: number;
  lastDisplayed: string;
  feedback?: string;
};

// backend utils
export const subtract24h = async () => {
  const rating = await getUserRating();
  const lastDisplayed = rating?.lastDisplayed || new Date();
  const date = new Date(lastDisplayed);
  date.setDate(date.getDate() - 1);
  setUserRating({...rating, lastDisplayed: date.toISOString()});
};

export const resetStorage = async () => {
  await AsyncStorage.clear();
};

// API calls
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

export const closeRating = async () => {
  const rating = await getUserRating();
  const now = new Date();

  const newRating = {
    closeCount: rating ? rating.closeCount + 1 : 1,
    lastDisplayed: now.toISOString(),
  };

  setUserRating(newRating);
};

export const saveRating = async (stars: number, feedback: string = '') => {
  const now = new Date();
  setUserRating({stars, feedback, lastDisplayed: now.toISOString()});
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
  const closeCount = rating?.closeCount || 0;
  const stars = rating?.stars;
  const lastDisplayed = rating?.lastDisplayed;

  if (!lastDisplayed) return true;

  // max 3 times
  // min 24h between displays
  // once rated, do not display
  return !stars && closeCount < 3 && hasOneDayPassed(lastDisplayed);
};
