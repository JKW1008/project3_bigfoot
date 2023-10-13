import db from "../config/db";

export default class IntroduceRepository{
    static async arts_and_science_courseList() {
        const QUERY = `SELECT * FROM arts_and_science`;
        try {
          return await db.execute(QUERY).then((result) => result[0]);
        } catch (error) {
          console.error('Error in arts_and_science_courseList:', error);
          throw error;
        }
      }

      static async history_and_culture_courseList() {
        const QUERY = `SELECT * FROM history_and_culture`;
        try {
          return await db.execute(QUERY).then((result) => result[0]);
        } catch (error) {
          console.error('Error in history_and_culture_courseList:', error);
          throw error;
        }
      }

      static async nature_and_relaxation_courseList() {
        const QUERY = `SELECT * FROM nature_and_relaxation`;
        try {
          return await db.execute(QUERY).then((result) => result[0]);
        } catch (error) {
          console.error('Error in nature_and_relaxation_courseList:', error);
          throw error;
        }
      }

      static async tourism_and_shopping_courseList() {
        const QUERY = `SELECT * FROM tourism_and_shopping`;
        try {
          return await db.execute(QUERY).then((result) => result[0]);
        } catch (error) {
          console.error('Error in tourism_and_shopping_courseList:', error);
          throw error;
        }
      }

      static async Existcourse(user_id, course_id) {
        const QUERY = `SELECT * FROM containcourse WHERE user_id = ? AND course_id = ?`;
        try {
          const result = await db.execute(QUERY, [user_id, course_id]);
          if (result[0].length > 0) {
            // 결과가 하나 이상의 행을 반환했으므로 해당 데이터가 존재함
            return true;
          } else {
            // 결과가 행을 반환하지 않았으므로 해당 데이터가 존재하지 않음
            return false;
          }
        } catch (error) {
          console.error('Error in select', error);
          throw error;
        }
      }
      

      static async containCourse(user_id, table_name, course_id, lat, lon) {
        const QUERY = `INSERT INTO containcourse (user_id, table_name, course_id, latitude, longitude) VALUES (?, ?, ?, ?, ?)`;
        try {
          return await db.execute(QUERY, [user_id, table_name, course_id, lat, lon]).then((result) => result[0]);
        } catch (error) {
          console.error('Error in insert', error);
          throw error;
        }
      }
}