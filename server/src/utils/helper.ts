export const isEmpty = (value) => value === undefined || value === null || new String(value).length === 0;

export const getIstTime = (date = null) => {
    let dateUTC: any = date ? new Date(date) : new Date();
    dateUTC = dateUTC.getTime();
    const dateIST = new Date(dateUTC);
    // date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() + 5);
    dateIST.setMinutes(dateIST.getMinutes() + 30);
    return dateIST;
};
