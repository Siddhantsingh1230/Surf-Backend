export const isAuthenticated = (req, res, done) => {
  if (!req.user) {
   return res.status(400).json({ success: false, message: "Login first!" }); 
  }
  done();
};
