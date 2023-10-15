import DetailRepository from "../repository/DetailRepository"

// 서비스
export const getDetailInfo = async (idx, table) => {
    return await DetailRepository.findDetail(idx, table);
  }