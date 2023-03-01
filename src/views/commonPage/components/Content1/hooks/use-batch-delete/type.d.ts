import { Ref, ComputedRef } from "vue";
import { User } from "../../type";

export type Props = {
  visible: boolean;
  multipleSelection: User[];
};

export type Emits = {
  ($event: "close"): void;
  ($event: "confirm"): void;
};

export type UseBatchDeleteOptions = {
  multipleSelection: Ref<User[]>;
  onConfirm?: () => void;
};
