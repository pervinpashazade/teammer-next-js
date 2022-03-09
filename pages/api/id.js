export default function handleRequest(req, res) {
    const userId = req.cookies["teammers-id"]
    let id = null;
    if (userId) {
        id = Number(userId)
    }

    // res.userId = userId
    return res.status(200).send({ userId: id });
}