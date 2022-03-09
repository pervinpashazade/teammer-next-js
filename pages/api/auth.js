export default function handleRequest(req, res) {
    const cookieId = req.cookies["teammers-id"];
    const cookieToken = req.cookies["teammers-access-token"];
    return res.status(200).send({
        user: {
            "id": cookieId ? cookieId : null,
            "token": cookieToken ? `Bearer ${cookieToken}` : null,
        }
    });
}