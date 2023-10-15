import db from "../config/db";

export default class BoardRepository {
    static async boardInput(user_id, subject, content, files) {
        const now = new Date(); // 현재 시간 생성
        const QUERY = `INSERT INTO bigfootboard (user_id, subject, content, files, create_at) VALUES (?, ?, ?, ?, ?)`;
        await db.execute(QUERY, [user_id, subject, content, files, now]); // 'await'를 사용해야 함
    }

    static async boardList() {
        const QUERY = `SELECT * FROM bigfootboard`;
        try {
          return await db.execute(QUERY).then((result) => result[0]);
        } catch (error) {
          console.error('Error in bigfootboard_boardList:', error);
          throw error;
        }
    }

    static async detailboard(idx){
        const QUERY = `SELECT * FROM bigfootboard WHERE idx = ?`;
        return await db.execute(QUERY, [idx]).then((result) => result[0][0]);  
    }
}
