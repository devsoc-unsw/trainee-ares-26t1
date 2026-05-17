// Amount of money gained from completing a task
export const DAILY_AMOUNT = 5;
export const WEEKLY_AMOUNT = 25;
export const EASY_AMOUNT = 10;
export const MEDIUM_AMOUNT = 20;
export const HARD_AMOUNT = 40;

export enum TaskType {
  Daily = "Daily",
  Weekly = "Weekly",
  Custom = "Custom",
}

export enum CustomVariant {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export enum DayOfWk {
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun,
}