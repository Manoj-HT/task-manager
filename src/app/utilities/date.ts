export const dateFormat = (date: string) => {
    const dateObj = new Date(date)
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()} at ${dateObj.getHours()}:${dateObj.getMinutes()}`
}  