export function getPlanDateForToday(planYear = 2026) {
  const now = new Date();
  const planDate = new Date(planYear, now.getMonth(), now.getDate());
  planDate.setHours(0, 0, 0, 0);
  return planDate;
}
