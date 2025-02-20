import {
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";
export interface ContextType {
  account: AccountProps | null;
  setAccount: Dispatch<
    SetStateAction<AccountProps | null>
  >;
}
export interface AccountProps {
  _id: string;
  uid: string;
  name: string;
  pin: number;
}
export interface ChildProps {
  children: ReactNode;
}
export interface AxsiosResponseT {
  success: boolean;
  messege?: string;
}
export interface AxiosType
  extends AxsiosResponseT {
  data: AccountProps[] | AccountProps;
}
