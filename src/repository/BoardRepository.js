import db from "../config/db";

export default class BoardRepository {
    static async boardInput(user_id, subject, content, files) {
        const QUERY = `INSERT INTO bigfootboard (user_id, subject, content, files, create_at) VALUES (?, ?, ?, ?, ?)`;
        db.execute(QUERY, [user_id, subject, content, files, now]);
    }
}