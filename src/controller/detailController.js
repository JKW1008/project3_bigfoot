import { getDetailInfo } from "../service/detailService";

export const detailPage = async (req, res) => {
    const idx = req.query.idx; // 18
    const table = req.query.table_name; // arts_and_science
    const detailData = await getDetailInfo(idx, table);
  
    return res.render("detailPage", { detailData : detailData })
  }