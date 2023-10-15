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
        // console.log("Data from service:", arts_and_science);
        return coursArray;
    } catch (error) {
        console.error("Error in getArtsandScience:", error);
        throw error;
    }
}

// 서비스에서 중복 검사 후 저장을 수행
export const ContainCourse = async (user_id, table_name, course_id, course_name, lat, lon) => {
    const isCourseExist = await IntroduceRepository.Existcourse(user_id, course_id);
  
    if (!isCourseExist) {
      // 데이터가 존재하지 않으면 저장
      await IntroduceRepository.containCourse(user_id, table_name, course_id, course_name, lat, lon);
      return true;
    } else {
      // 데이터가 이미 존재하므로 저장하지 않음
      return "Data already exists";
    }
  }
  
export const allMyCourse = async (id) => {
    try {
        const allmycourse = IntroduceRepository.allMyCourse(id);
        return allmycourse;
    } catch (error) {
        console.error("Error in allMyCourse:", error);
        throw error;
    }
}

export const delet_myCourse = async (idx) => {
    try {
        let result = await IntroduceRepository.deleteMyCourse(idx);
        return result;
    } catch (error) {
        console.error('Error in deleteMyCourse', error);
        throw error;
    }
}


