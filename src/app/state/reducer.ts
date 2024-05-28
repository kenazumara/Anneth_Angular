import { createReducer, on } from "@ngrx/store";
import { toggleNavBar } from "./action/app-page-action";

export interface InitialAppState {
displayNavBar: boolean;
}

const initialState = {
  displayNavBar: true,
}

export const appReducer = createReducer<InitialAppState>(
  initialState,
  on(toggleNavBar, (state): InitialAppState => {
    return {
      ...state,
      displayNavBar: false
    }
  } )
)