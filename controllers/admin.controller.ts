
import express from 'express';
import * as jwt from 'jsonwebtoken';
import adminService from '../services/admin.service';

class AdminController{
     createNewAdminController = async(req:express.Request,  res:express.Response)=>{
        const admin = await adminService.createNewAdmin(req.body.username,req.body.password,req.body.isAdmin);
        if(!admin) return res.status(400).send({message:"Failed to create new admin"});
        return res.status(201).send(admin);
    }

    adminLoginController = async(req:express.Request,res:express.Response)=>{
        const admin = await adminService.Login(req.body.username,req.body.password);
        if(!admin) return res.status(300).send({message:"invalid credentials", success:false});
        const admin_id = admin._id;
        let payload = {admin_id};
        let token = jwt.sign(payload,"swsh23hjddnns",{
            algorithm: "HS256",
            expiresIn:86400
        })

        res.cookie("jwt",token,{secure:true, httpOnly:true});
        return res.status(200).send({
            accessToken:token,
            message:"Successful Login", 
            success:true,
            data: admin
        })
    }
}

export default new AdminController;