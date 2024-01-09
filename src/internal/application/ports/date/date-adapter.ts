export interface IDateAdapter {
  addMinutes(date: Date, minutes: number): string;
  subtractDate(date: string): Date;
}
