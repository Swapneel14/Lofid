import {getAuth} from "@clerk/express";
import Banneduser from "../models/Banneduser.js";

export const checkBan = async(req,res)=>{
    try{
     
        const {userId} = getAuth(req);

        if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const bannedUser = await Banneduser.findOne({
      userId,
      expiredAt: { $gt: new Date() },
    });

    if (bannedUser) {
      return res.json({
        banned: true,
        message: "Your account has been banned for 3 days.",
      });
    }

     res.json({
      banned: false,
    });
      

    }catch(err){
      console.log(e);

    res.status(500).json({
      message: "Internal Server Error",
    });
    }
}