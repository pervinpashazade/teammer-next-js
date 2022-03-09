export default function handleRequest(req,res){
    console.log(req)
   if(req.method === "POST") return res.status(200).json({ text: req.body });
     return res.status(400).json({ text: 'Opss' })
}