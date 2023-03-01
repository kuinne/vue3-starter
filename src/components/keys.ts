import { InjectionKey, Ref } from "vue";
export type MyInjection ={
    msg: Ref<string>
}
export const myInjectionKey: InjectionKey<MyInjection> = Symbol()

