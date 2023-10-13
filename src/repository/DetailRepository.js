import db from "../config/db";

export default class DetailRepository {
    static async findDetail(idx, table) {
  // repository로 뺴는게 좋음
        let QUERY = "";
        QUERY += "SELECT * FROM " + table + " WHERE idx = ?";

        return await db.execute(QUERY, [idx, table]).then((result) => result[0][0]);
    }
}
