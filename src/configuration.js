// const config = process.env.NODE_ENV === "production" ? {
//     BASE_URL: "teammer.com"
// } : {
//     BASE_URL: "http://159.223.3.251/v1/"
// }

const config = {
    // BASE_URL: "https://159.223.3.251/v1/",
    BASE_URL: "https://api-dev.teammers.com/v1/",
}

export const NEXT_URL = process.env.NODE_ENV === "production" ? "https://teammer-next-js.vercel.app/" :
    "http://localhost:3000/"

// export const EMAIL_REGEX = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';
// export const USERNAME_REGEX = '/^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/';

// month array
export const months = [{
    id: 1,
    name: 'January',
}, {
    id: 2,
    name: 'February',
}, {
    id: 3,
    name: 'March',
}, {
    id: 4,
    name: 'April',
}, {
    id: 5,
    name: 'May',
}, {
    id: 6,
    name: 'June',
}, {
    id: 7,
    name: 'July',
}, {
    id: 8,
    name: 'August',
}, {
    id: 9,
    name: 'September',
}, {
    id: 10,
    name: 'October',
}, {
    id: 11,
    name: 'November',
}, {
    id: 12,
    name: 'December',
}];

export default config