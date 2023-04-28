const users = [];
export default async function handler(req, res) {
  
    const { email, password, confirmarPass } = req.body;

    if (!email || !password || !confirmarPass) {
        res.status(400).json({error:"Error user not was added"})
    } else {
      users.push(req.body);
      res.send({ msg: "user was added sucefully" });
    }
  
}
