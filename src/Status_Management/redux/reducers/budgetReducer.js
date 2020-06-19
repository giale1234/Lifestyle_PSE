import * as ActionType from "./../constants/ActionType";


let initialState = {
    budgetList: [],
    budgetEdit: null,
  };

  const budgetReducer = (state = initialState, action) => {
    switch (action.type) {
   
      case ActionType.SUBMIT:
        if (action.budget.id) {
          //UPDATE
          let index = state.budgetList.findIndex(budget => {
            return budget.id === action.budget.id;
          });
          if (index !== -1) {
            let budgetListUpdate = [...state.budgetList];
            budgetListUpdate[index] = action.budget;
            state.budgetList = budgetListUpdate;
          }
        }else{
            //ADD
          let budgetAdd = { ...action.budget , id: Math.random()};
          state.budgetList = [...state.budgetList, budgetAdd];
          }
        return { ...state };
  
      case ActionType.EDIT:
          state.budgetEdit = action.budget;
          return { ...state };
      
      case ActionType.DELETE:
      
        let index = state.budgetList.findIndex(budget => {
        return budget.id === action.budget.id;
      });
      if(index !== -1){
        let budgetListUpdate = [...state.budgetList];
        budgetListUpdate.splice(index,1);
        state.budgetList = budgetListUpdate;
      }
      
      return { ...state };
      
      default:
        return { ...state };
    }
  };
  
  export default budgetReducer;
  