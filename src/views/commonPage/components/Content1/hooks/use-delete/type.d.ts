import { ComputedRef } from "vue";
import { User } from "../../type";

export type Props = {
  visible: boolean;
  formData: User | null;
};

export type Emits = {
  ($event: "close"): void;
  ($event: "confirm"): void;
};

export type UseDeleteOptions = {
  // visible: ComputedRef<boolean>;
  // formData: ComputedRef<User | undefined>;
  onConfirm?: () => void;
};
