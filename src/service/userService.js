
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repository/UserRepository.js";
import Exception from "../handler/Exception.js";

export const userJoinService = async ( userId, userPassword, userName ) => {
  const user = await UserRepository.findByEmail(userId);
  if(user) throw Exception.ID_EXIST;
  const hashedPw = await bcrypt.hash(userPassword, 8);
  await UserRepository.save( userId, hashedPw, userName )
}

export const userLoginService = async ({ userId, userPassword }) => {
  // console.log(userId, userPassword);
  const user = await UserRepository.findByEmail(userId);
  // console.log(user);

  if(!user) throw Exception.NOT_USER_FOUND;
  if (!await passwordCheck(userPassword, user.user_password)) throw Exception.NOT_EQUAL_PASSWORD;

  const accessToken = jwt.sign({ id: user.user_id }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
  return { accessToken };
}

const passwordCheck = async (userPassword, databasePassword) => {
  return await bcrypt.compare(userPassword, databasePassword);
}

export const myPage = async (userId) => {
  const userInfo = await UserRepository.findById(userId);
  return userInfo;
}
