import db from "../config/db";

export default class IntroduceRepository{
    static async arts_and_science_courseList() {
        const QUERY = `SELECT * FROM arts_and_science`;
        try {
          const [rows] = db.execute(QUERY);
          return rows; // 반환값 수정
        } catch (error) {
          console.error('Error in arts_and_science_courseList:', error);
          throw error;
        }
      }
}