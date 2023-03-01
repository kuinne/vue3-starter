import { defineComponent, PropType, renderSlot, InjectionKey, provide, readonly} from "vue";
export type ConfigType = {
    /** 语言 */
    lang: 'zh' | 'en';
    /** 主题 */
    theme: 'dark' | 'light'
}
export const ConfigInjectKey: InjectionKey<ConfigType> = Symbol()
const ConfigProvider = defineComponent({
    name: 'ConfigProvider',
    props: {
        config: {
            type: Object as PropType<ConfigType>,
            default: () => ({
                lang: 'zh',
                theme: 'light'
            })
        }
    },
    setup(props, { slots }) {
        // `readonly()` 预防了用户修改全局状态
        provide(ConfigInjectKey, readonly(props.config))
        return () => renderSlot(slots, 'default')
    }

})

export default ConfigProvider;