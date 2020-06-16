import * as ActionType  from "./../constants/ActionType"

export const actSubmit = budget => {
    return{
        type: ActionType.SUBMIT,
        budget
    }
}
export const actDelete = budget => {
    return {
      type: ActionType.DELETE,
      budget
    };
  };
export const actEdit = budget=> {
    return {
        type: ActionType.EDIT,
        budget
    }
}