export const parseDate = (date: Date | null) => {
    if (date) {
        date.setDate(date.getDate() + 1);
        return date.toISOString().substring(0, 10);
    }
}
