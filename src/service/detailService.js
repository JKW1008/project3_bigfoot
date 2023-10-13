import DetailRepository from "../repository/DetailRepository"

// 서비스
export const getDetailInfo = async (idx, table) => {
    // repository로 뺴는게 좋음
    return await DetailRepository.findDetail(idx, table);
  }