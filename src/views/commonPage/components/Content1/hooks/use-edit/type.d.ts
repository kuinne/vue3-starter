import type { User } from "../../type";
import type { ComputedRef } from "vue";
export type Props = {
  visible: boolean;
  formData: User | null;
};

export type Emits = {
  ($event: "close"): void;
  ($event: "submit"): void;
};

export type UseEditOptions = {
  onSubmit?: () => void;
};
