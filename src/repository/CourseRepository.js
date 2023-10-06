import db from "../config/db";

export default class CourseRepository {
  static async findCourseListWithUser(user_no) {
    const QUERY = `
      SELECT c.*, pc.user_courses_id 
      FROM course c 
      LEFT JOIN people_course pc ON c.course_no = pc.course_no AND pc.user_no=?
    `;
    return db.execute(QUERY,[user_no]).then((result) => result[0]);
  }

  static async findCourseByQrCode(qrCode) {
    const QUERY = `SELECT * FROM course WHERE course_qr = ?`;
    return db.execute(QUERY, [qrCode]).then((result) => result[0][0]);
  }

  static async findUsersCourse(user_no, course_no) {
    const QUERY = `SELECT * FROM people_course WHERE user_no = ? AND course_no = ?`;
    return db.execute(QUERY, [user_no, course_no]).then((result) => result[0][0]);
  }

  static async updateCourseVisited(user_no, course_no) {
    const QUERY = `INSERT INTO people_course (user_no, course_no) VALUES (?, ?)`;
    db.execute(QUERY, [user_no, course_no]);
  }
}
