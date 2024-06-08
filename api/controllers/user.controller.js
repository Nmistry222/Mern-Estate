import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import {errorHandler} from '../utils/error.js'
import Listing from '../models/listing.model.js';

export const test = (req, res) => {
    res.json({ message: "API Route is working!" });
}

export const updateUser = async (req, res, next) => {
    // Check if the logged-in user is trying to update their own account
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You are only allowed to update your own account!"));
    }

    try {
        const updateFields = {};

        // Check and update each field if it exists in the request body
        if (req.body.username) updateFields.username = req.body.username;
        if (req.body.email) updateFields.email = req.body.email;
        if (req.body.avatar) updateFields.avatar = req.body.avatar;
        if (req.body.password) {
            updateFields.password = bcryptjs.hashSync(req.body.password, 10);
        }

        // Update the user document in the database
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: updateFields
        }, { new: true });

        // Remove the password field from the response
        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id ) return next (errorHandler(401, 'You can only delete your own account!'))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('User has been deleted!').clearCookie('access_token');
    } catch (error) {
        next(error)

    }
};

export const getUserListings = async (req, res, next ) => {
    if(req.user.id === req.params.id) {
       try{
        const listings = await Listing.find({userRef: req.params.id});
        res.status(200).json(listings);     
       } 
       catch(error) {
        next(error);
       }

    } else {
        return next(errorHandler(401, 'You can only view your own listing'))
    }
}

export const getUser = async(req, res , next) => {
    try {

        const user = await User.findById(req.params.id);

        if(!user) return next(errorHandler(404, 'User not found!'));
    
        const {password: pass, ...rest} = user._doc
    
        res.status(200).json(rest);

    }

    catch(error) {

        next(error)

    }

}