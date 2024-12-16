import asyncHandler from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import JsonWebToken from "jsonwebtoken";
import bcrypt from 'bcrypt';



const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        // const refreshToken = user.generateRefreshToken();

        // user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return accessToken;

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    if ([fullname, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({email});
    if (existedUser) {
        throw new ApiError(409, "Email or Username already exists");
    }


    
    // Create a new user
    const user = await User.create({
        fullname,
        email,
        password,
    });

    const createdUser = await User.findById(user._id)
        .select('-password -refreshToken');

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { email, username, password } = req.body

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const accessToken = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken
                },
                "User logged In Successfully"
            )
        )

})


const google = asyncHandler(async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email })
        if (user) {


            const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
            const expiryDate = new Date(Date.now() + 3600000);
            res.status(200)
                .cookie("accessToken", accessToken, { expires: expiryDate, httpOnly: true, secure: true })
                .cookie("refreshToken", refreshToken, { expires: expiryDate, httpOnly: true, secure: true })
                .json(new ApiResponse(200, user, { message: "User logged in successfully" }, "User logged in successfully"))
        }
        else {
            const genratedPassword = Math.random().toString(36).slice(-8)
                + Math.random().toString(36).slice(-8)
            const hashedPassword = await bcrypt.hash(genratedPassword, 10);
            const newUser = await User({
                username: req.body.name.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                fullname: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            })
            await newUser.save();
            const { accessToken, refreshToken } = await generateAccessAndRefreshToken(newUser._id)
            const expiryDate = new Date(Date.now() + 3600000);
            res.status(200)
                .cookie("accessToken", accessToken, { expires: expiryDate, httpOnly: true, secure: true })
                .cookie("refreshToken", refreshToken, { expires: expiryDate, httpOnly: true, secure: true })
                .json(new ApiResponse(200, newUser, { message: "User logged in successfully" }, "User logged in successfully"))

        }
    }
    catch (error) {
        next(error)
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true,
        }

    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = JsonWebToken.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
    } catch (error) {
        // Handle token verification errors gracefully
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)
    // console.log(user);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password");
    }

    user.password = newPassword
    await user.save("validateBeforeSave:false")

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200)
        .json(new ApiResponse(
            200,
            req.user, "Cureent user Fetched Successfully"))
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.user?._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }
    console.log(user);


    return res.status(200).json(
        new ApiResponse(200, {}, "User deleted successfully"))


})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullname, email } = req.body

    if (!fullname || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const updateUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname,
                email: email
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, updateUser, "Account Deatils updated successfully"))

})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    deleteUser,
    updateAccountDetails,
    google,
}