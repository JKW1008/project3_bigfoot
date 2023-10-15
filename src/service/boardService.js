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