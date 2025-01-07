import { Request, Response, NextFunction } from "express";
import { asyncHandler, ApiResponse, ApiError } from "../utils";
import User from "../models/user.model";

interface verifiedRequest extends Request {
  user?: any;
}

const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, isAdmin = true } = req.body;

    if (
      [name, email, password].some((field) => !field || field.trim === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }

    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError(400, "Invalid email format");
    }

    // Check if user already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      isAdmin,
    });

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }
    res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User Registered Sucessfully"));
  }
);

const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      throw new ApiError(400, "email and password is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError(400, "Invalid email format");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User does not exists with email");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid User Credentials");
    }
    const accessToken = user.generateAccessToken();

    const loggedInUser = await User.findById(user._id).select("-password");
    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
          },
          "User logged in Sucessfully"
        )
      );
  }
);

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res
    .status(200)
    .clearCookie("accessToken")
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const getCurrentUser = asyncHandler(
  async (req: verifiedRequest, res: Response) => {
    res
      .status(200)
      .json(new ApiResponse(200, req.user, "User info fetched successfully"));
  }
);

export { registerUser, loginUser, logoutUser, getCurrentUser };
