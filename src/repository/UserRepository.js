import db from "../config/db";

export default class UserRepository {
  static async findById(id) { // 이메일? 아이디
    const QUERY = `SELECT * FROM people WHERE user_id=?`;
    return db.execute(QUERY, [id]).then((result) => result[0][0]);
  }

  static async findByEmail(email) {
    const QUERY = `SELECT * FROM people WHERE user_email=?`;
    return db.execute(QUERY, [email]).then((result) => result[0][0]);
  }  

  static async save({ id, username, profileImage, provider }) {
    // console.log(user_id, password, user_name);
    const QUERY = `INSERT INTO people (user_email, user_name, user_image, user_provider) VALUES (?, ?, ?, ?)`;

    const data = await db.execute(QUERY, [id, username, profileImage, provider])
        .then((result) => result[0]);
    console.log(data);
    const user = { user_id: data.insertId }; // user 변수를 정의하고 설정
    return user; // 반환 값으로 user를 반환
  }

  static async findByIdAndProvider(id, provider) {
    const QUERY = `SELECT * FROM people WHERE user_email = ? AND user_provider = ?`;
    
    try {
      const [rows] = await db.execute(QUERY, [id, provider]);
      if (rows.length > 0) {
        return rows[0]; // Assuming you want the first row if there are multiple matching records
      } else {
        return null; // Return null or handle no results as per your requirements
      }
    } catch (error) {
      console.error('Error in findByIdAndProvider:', error);
      throw error;
    }
  }
}
