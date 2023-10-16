import db from "../config/db";

export default class CourseRepository {
  static async checkVisited(id, qr) {
    const QUERY = `SELECT visited FROM containcourse WHERE user_id = ? AND qr_code = ?`;
    const chk = await db.execute(QUERY, [id, qr]).then((result) => result[0]);
    return chk 
   
  };

  static updateVisited = async (user_id, qr_code) => {
    const QUERY = 'UPDATE containcourse SET visited = 1 WHERE user_id = ? AND qr_code = ?';
    try {
      return await db.execute(QUERY, [user_id, qr_code]);
    } catch (error) {
      console.error('Error in updateVisited', error);
      throw error;
    }
  };
  
}
