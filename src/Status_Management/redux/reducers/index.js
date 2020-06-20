import { combineReducers } from "redux";
import budgetReducer from "./budgetReducer";
import exerciseReducer from "./exerciseReducer"
import mealReducer from "./mealReducer"

const rootReducer = combineReducers({
    budgetReducer ,
    exerciseReducer,
    mealReducer
});

export default rootReducer;