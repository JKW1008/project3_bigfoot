import IntroduceRepository from "../repository/IntroduceReposittory"

export const getArtsandScience = async () => {
    try {
        const arts_and_science = await IntroduceRepository.arts_and_science_courseList();
        console.log("Data from service:", arts_and_science);
        return arts_and_science;
    } catch (error) {
        console.error("Error in getArtsandScience:", error);
        throw error;
    }
}