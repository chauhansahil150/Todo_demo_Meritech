import { useContext } from "react";
import { rootStoreContext } from "../store/index";
import { enableLogging } from "mobx-logger";
enableLogging();
export const useStore=()=>useContext(rootStoreContext)