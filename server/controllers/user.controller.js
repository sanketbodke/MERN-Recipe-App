import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";

const generateAccessAndRefreshToken = async(userId)=>{
    try{
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave : false})

        return { accessToken, refreshToken }

    } catch (error){
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}

const registerUser = asyncHandler(async(req,resp)=>{
    // get data from frontend

    const { username, email, password } = req.body;

    // validation

    if(
        [username, email, password].some((fields)=> fields.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // check if student already exists

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if (existedUser) {
        throw new ApiError(409, "user with email and password already exists")
    }

    // create user object

    const user = await User.create({
        username,
        email,
        password,
    })

    // remove password and refresh token from response

    const createdUser = await User.findById(user._id).select(
        "--password -refreshToken"
    )

    // return response

    return resp.status(201).json(
        new ApiResponse(200, createdUser, "User Register Successfully")
    )
})


const loginUser = asyncHandler(async (req,resp) => {
    // data from frontend

    const {username, password} = req.body;

    // validation

    if(!username){
        throw new ApiError(400, "Username is required")
    }

    // find user

    const user = await User.findOne({username})

    if(!user){
        throw new ApiError(400, "User does not exist")
    }

    // password check

    const isPasswordCheck = await user.isPasswordCorrect(password)

    if(!isPasswordCheck){
        throw new ApiError(401, "Invalid Password")
    }

    // access and refresh token

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select(" --password --refreshToken")

    return resp
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                },
                "User logged in successfully"
            )
        )
})

export {
    registerUser,
    loginUser
}