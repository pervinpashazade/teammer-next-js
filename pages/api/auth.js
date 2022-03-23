export default function handleRequest(req, res) {
    const cookieId = req.cookies["teammers-id"];
    const cookieToken = req.cookies["teammers-access-token"];
    const cookieType = req.cookies['teammers-type']
    const cookieUser = req.cookies['user']

    // if (!cookieId || !cookieToken || !cookieType) {
    if (!cookieId || !cookieToken) {
        return res.status(200).send({ success: false });
    }

    return res.status(200).send({
        success: true,
        token: cookieToken,
        user: {
            "id": cookieId ? Number(cookieId) : null,
            "token": cookieToken ? `Bearer ${cookieToken}` : null,
            "type": cookieType ? cookieType : null,
            "full_name": cookieUser ? cookieUser : ''
        }
    });
}