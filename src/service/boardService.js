import BoardRepository from "../repository/BoardRepository"

export const board_input = async (user_id, subject, content, files) => {
    try {
        await BoardRepository.boardInput(user_id, subject, content, files)
        return true;
    } catch (error) {
        console.error("Error in boardInput :", error);
        throw error;
    }
}

export const getBoardList = async () => {
    try {
        let boardList = await BoardRepository.boardList();
        console.log(boardList);
        return boardList;
    } catch (error) {
        console.error("Error in getBoardList:", error);
        throw error;
    }
}

export const getBoardDetail = async (idx) => {
    return await BoardRepository.detailboard(idx);
}