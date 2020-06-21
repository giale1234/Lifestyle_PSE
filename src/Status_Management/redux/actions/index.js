import * as ActionType  from "./../constants/ActionType"
//Budget
export const actSubmitBudget = (budget) => {
    return{
        type: ActionType.SUBMIT,
        budget
    }
}
export const actDeleteBudget = (budget) => {
    return {
      type: ActionType.DELETE,
      budget
    };
  };
export const actEditBudget = (budget)=> {
    return {
        type: ActionType.EDIT,
        budget
    }
}
//Exercise
export const actSubmitExercise = (exercise) => {
    return{
        type: ActionType.SUBMIT_E,
        exercise
    }
}
export const actDeleteExercise = (exercise) => {
    return {
      type: ActionType.DELETE_E,
      exercise
    };
  };
export const actEditExercise = (exercise)=> {
    return {
        type: ActionType.EDIT_E,
        exercise
    }
}
//Meal
export const actSubmitMeal = (meal) => {
    return{
        type: ActionType.SUBMIT_M,
        meal
    }
}
export const actDeleteMeal = (meal) => {
    return {
      type: ActionType.DELETE_M,
      meal
    };
  };
export const actEditMeal = (meal)=> {
    return {
        type: ActionType.EDIT_M,
        meal
    }
}
//Water
// export const actSubmitWater = (water) => {
//     return{
//         type: ActionType.SUBMIT_W,
//         water
//     }
// }