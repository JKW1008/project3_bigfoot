import IntroduceRepository from "../repository/IntroduceReposittory"

export const getArtsandScience = async () => {
    try {
        let arts_and_science = await IntroduceRepository.arts_and_science_courseList();
        let history_and_culture = await IntroduceRepository.history_and_culture_courseList();
        let nature_and_relaxation = await IntroduceRepository.nature_and_relaxation_courseList();
        let tourism_and_shopping = await IntroduceRepository.tourism_and_shopping_courseList();
        let coursArray = {
            arts_and_science: arts_and_science,
            history_and_culture: history_and_culture,
            nature_and_relaxation: nature_and_relaxation,
            tourism_and_shopping: tourism_and_shopping,
        }
        console.log("Data from service:", arts_and_science);
        return coursArray;
    } catch (error) {
        console.error("Error in getArtsandScience:", error);
        throw error;
    }
}