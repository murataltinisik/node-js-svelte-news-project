const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

export const DateEditing = (date) => {
    const current_date = new Date(date);

    const day = days[current_date.getDay()];
    const month = months[current_date.getMonth()];
    const year = current_date.getFullYear();
    const hours = current_date.getHours();
    const minute = current_date.getMinutes();

    return `${day} ${month}, ${year} - ${hours}:${minute}`;
}