export type BarContent = {
  tag: string;
  defaultImg: string;
  selectedImg: string;
  link: string;
};

export type LogInState = "Pending" | "Success" | "Fail";

export type codeType = "Auth" | "Refresh";

export type Methods = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
