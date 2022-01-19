export const parseDate = (date: Date | null) => {
    if (date) {
        date.setDate(date.getDate());
        return date.toISOString().substring(0, 10);
    }
}
