export default function handleRequest(req,res){
    console.log(req)
    return res.status(200).json({ text: req.cookies });
}