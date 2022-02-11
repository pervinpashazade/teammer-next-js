import config from "../../../src/configuration";

export default async function handeUserFUnction(req, res) {
    const users = await fetch(config.BASE_URL + 'auth/user?include=skills,positions,experiences');
    const userList = users.json()
    return userList
}