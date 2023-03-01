export type Props = {
  tabPaneRender1: () => JSX.Element;
  tabPaneRender2: () => JSX.Element;
};

export type Emits = {
  ($event: "tabChange", name: any): void;
};

export type UseTabOptionsType = Props;
