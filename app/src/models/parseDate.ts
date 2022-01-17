export const parseDateMin = (): string => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    return currentDate.toISOString().substring(0,10);
}

export const parseDateMax = (value: string): string => {
    let currentDate = new Date(value);
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate.toISOString().substring(0,10);
}