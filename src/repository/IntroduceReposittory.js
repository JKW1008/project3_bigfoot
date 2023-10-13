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

      static async containCourse(user_id, table_name, course_id) {
        const QUERY = `INSERT INTO containcourse (user_id, table_name, course_id) VALUES (?, ?, ?)`;
        try {
          return await db.execute(QUERY, [user_id, table_name, course_id]).then((result) => result[0]);
        } catch (error) {
          console.error('Error in insert', error);
          throw error;
        }
      }
}