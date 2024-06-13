const jwt = require("jsonwebtoken");

const secret_key = "mern-market";

const auth = async (req, res, next) => {
  if (req.method === "GET") {
    // return next();
    return handler(req, res);
  }

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE4MTQ5MzE1LCJleHAiOjE3MTgyMzIxMTV9.osbGBMvEBkicj6uZGgI9nqoP2HreO6YPCYieDbTDhCA";

  const token = await req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(400).json({ messge: "トークンがありません" });
  }

  try {
    const decoded = jwt.verify(token, secret_key);
    // console.log(decoded);
    req.body.email = decoded.email;
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "トークンが正しくないので、ログインしてください" });
  }
};

module.exports = auth;
