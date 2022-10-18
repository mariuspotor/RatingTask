export const hasOneDayPassed = (date: string) => {
  const now = new Date();
  const d = new Date(date);
  return now.getDate() - d.getDate() >= 1;
};

export const hasOneWeekPassed = (date: string) => {
  const now = new Date();
  const d = new Date(date);
  const msInWeek = 1000 * 60 * 60 * 24 * 7;

  return Math.trunc(Math.abs(now.getTime() - d.getTime()) / msInWeek) >= 1;
};

export function hasOneMonthPassed(date: string) {
  const d1 = new Date(date);
  const d2 = new Date();
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months >= 1;
}
