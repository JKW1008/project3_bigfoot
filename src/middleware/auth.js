
import jwt from "jsonwebtoken";
import Exception from "../handler/Exception.js";
import UserRepository from "../repository/UserRepository.js";

export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer'))) {
    return res.status(Exception.AUTH_ERROR.statusCode).json(Exception.AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.SECRET_KEY,
    async (error, decoded) => {
      if (error) {
        if (error instanceof jwt.TokenExpiredError) {
          return res.status(Exception.AUTH_EXPIRED.statusCode).json(Exception.AUTH_EXPIRED);
        } else {
          return res.status(Exception.AUTH_ERROR.statusCode).json(Exception.AUTH_ERROR);
        }
      }
      console.log("==========")
      console.log(decoded)
      const id = decoded.id; // 이ㅇ메일 추출
      const user = await UserRepository.findById(id); // 이메일로 사용자 조회
      if (!user) {
        return res.status(Exception.AUTH_ERROR.statusCode).json(Exception.AUTH_ERROR);
      }
      req.user = user; // 사용자 정보 저장
      next();
    }
  );
};

export const isPageAuth = async (req, res, next) => {
  // 주소 : ?accessToken=token_value
  const accessToken = req.query.accessToken;
  if(!accessToken) res.redirect("/login");

  jwt.verify(
    accessToken,
    process.env.SECRET_KEY,
    async (error, decoded) => {
      if (error) {
        if (error instanceof jwt.TokenExpiredError) {
          return res.status(Exception.AUTH_EXPIRED.statusCode).json(Exception.AUTH_EXPIRED);
        } else {
          return res.status(Exception.AUTH_ERROR.statusCode).json(Exception.AUTH_ERROR);
        }
      }
      console.log("==========")
      console.log(decoded)
      const id = decoded.id; // 이ㅇ메일 추출
      const user = await UserRepository.findById(id); // 이메일로 사용자 조회
      if (!user) {
        return res.redirect("/loign?error=..");
      }
      req.user = user; // 사용자 정보 저장
      next();
    }
  );
};


export const handleKakaoLogin = async (accessToken, refreshToken, profile, done) => {
  try {
    // 카카오에서 받아온 profile 정보를 변수에 담습니다.
    const provider = profile.provider;
    const id = profile.id;
    const username = profile.username;
    const profileImage = profile._json.properties.profile_image;

    // id와 provider(ex: kakao)를 가지고 정보를 찾아서 user가 있으면 그대로 반환 없으면 저장후 반환
    let user = await UserRepository.findByIdAndProvider(id, provider);


    if (!user) {
      const newUser = {
        id,
        username,
        profileImage,
        provider,
      };
      // user를 저장합니다.
      const { insertId } = await UserRepository.save(newUser);
      user = { user_id : insertId }; 
    }
    return done(null, user);
  } catch (error) {
    console.error("Error during Kakao login:", error);
    return done(null, false, "server_error");
  }
}
