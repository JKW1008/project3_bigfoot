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

  static async save({ user_id, password, user_name }) {
    // console.log(user_id, password, user_name);
    const QUERY = `
      INSERT INTO people 
        (user_email, user_password, user_name) 
      VALUES 
        (?, ?, ?)`;
    return db.execute(QUERY, [user_id, password, user_name]).then((result) => result[0]);
  }

  static async findByIdAndProvider(id, provider) {
    const QUERY = `SELECT user_id, user_email, user_name, user_provider FROM people WHERE user_id=? AND user_provider=?`;

    return db.execute(QUERY, [id, provider]).then((result) => result[0][0]);
  }
}
