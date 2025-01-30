export function corrigeData(date: Date): Date {
  date.setHours(date.getHours() + 3);
  return date;
}