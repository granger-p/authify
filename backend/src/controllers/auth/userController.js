import asyncHandler from "express-async-handler";
import User from "../../models/auth/UserModel.js";


export const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   if(!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all fields");
   }
   
   if(password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters");
   }

   const userExists = await User.findOne({ email });

   if(userExists) {
      res.status(400);
      throw new Error("User already exists");
   }
      //creating new user
   const user = await User.create({
      name,
      email,
      password,
   });   
   if(user) {  
      res.status(201).json({
         _id: user._id,
         name: user.name,  
         email: user.email,
         photo: user.photo,   
         bio: user.bio,
         role: user.role,
         isVerified: user.isVerified,
      });
   } else {
      res.status(400);
      throw new Error("Invalid user data");
   }
});