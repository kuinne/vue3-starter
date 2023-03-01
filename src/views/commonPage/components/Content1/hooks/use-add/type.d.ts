import { ComputedRef, Ref } from "vue";
export type Props = {
  visible: boolean;
};

export type Emits = {
  ($event: "close"): void;
  ($event: "submit"): void;
};

export type UseAddOptions = {
  onSubmit?: () => void;
};
