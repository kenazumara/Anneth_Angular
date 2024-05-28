import { createFeatureSelector } from "@ngrx/store";
import { InitialAppState } from "./reducer";

export const getAppFeature = createFeatureSelector<InitialAppState>('')