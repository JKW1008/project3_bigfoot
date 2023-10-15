import db from "../config/db";

export default class BoardRepository {
    static async boardInput(user_id, subject, content, files) {
        const now = new Date(); // 현재 시간 생성
        const QUERY = `INSERT INTO bigfootboard (user_id, subject, content, files, create_at) VALUES (?, ?, ?, ?, ?)`;
        await db.execute(QUERY, [user_id, subject, content, files, now]); // 'await'를 사용해야 함
    }
}
