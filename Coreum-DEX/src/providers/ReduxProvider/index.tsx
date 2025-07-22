import { Provider } from "react-redux";
import { store } from "../../store/store";

type ReduxProviderProps = {
  children: any;
};

export const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
