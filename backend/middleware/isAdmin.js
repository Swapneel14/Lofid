import { getAuth,clerkClient } from "@clerk/express";

export const isAdmin = async(req,res,next)=>{
    try{
        console.log(req.headers.authorization);

        const {userId} = getAuth(req);

        if(!userId){
            return res.status(401).json({message:"Unauthorized"});       
         }

        
        const user = await clerkClient.users.getUser(userId);

       const email = user.primaryEmailAddress?.emailAddress;

       if(email!=process.env.ADMIN_EMAIL){
         return res.status(403).json({message:"Forbidden"});
       }

       next();

    }catch(e){
        console.log(e);
       return res.status(500).json({message:"Server Error"})
    }
}