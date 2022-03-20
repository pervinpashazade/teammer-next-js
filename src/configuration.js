// const config = process.env.NODE_ENV === "production" ? {
//     BASE_URL: "teammer.com"
// } : {
//     BASE_URL: "http://159.223.3.251/v1/"
// }

const config = {
    // BASE_URL: "https://159.223.3.251/v1/",
    BASE_URL: "https://api-dev.teammers.com/v1/",
}

export const NEXT_URL = process.env.NODE_ENV === "production" ? "https://teammer-next-js.vercel.app/" : "http://localhost:3000/"

export default config