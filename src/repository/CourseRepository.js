import db from "../config/db";

export default class CourseRepository {
  static async checkVisited(id, qr) {
    const QUERY = `SELECT visited FROM containcourse WHERE user_id = ? AND qr_code = ?`;
    try {
      const chk = await db.execute(QUERY, [id, qr]).then((result) => result[0][0]);
      return chk === 0 ? true : false;
    } catch (error) {
      console.error('Error in get', error);
      throw error;
    }
  };

  static async updateVisited(id, qr) {
    const QUERY = 'UPDATE containcourse SET visited = 1 WHERE user_id = ? AND qr_code = ?';
    try {
      return await db.execute(QUERY, [id, qr]);
    } catch (error) {
      console.error('Error in updateVisited', error);
      throw error;
    }
  };  
}
