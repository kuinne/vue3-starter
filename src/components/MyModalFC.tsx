import { computed, defineComponent, FunctionalComponent as FC, inject, ref, unref, useSlots } from 'vue'
import styles from './style.module.scss'
import { myInjectionKey } from './keys'
import { ConfigInjectKey } from './ConfigProvider'
import { useModalStore } from '../hooks/useModalStore'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
const MyModalFC = defineComponent({
  props: {
    msg: String
  },
  slots: ['header'],
  setup(props, { slots }) {
    const { msg} = inject(myInjectionKey, () => ({msg: 'zzz'}))
     
    const list = ref<string[]>(['item1', 'item2'])
    const injectVal = inject(ConfigInjectKey)
    const changeLang = () => {
      if (injectVal) {
        injectVal.lang = 'zh'
      }
    }
    const store = useModalStore()
    const { visible } = storeToRefs(store)
    const { toggle } = store

    const { t, locale } = useI18n({
      // inheritLocale: true,
      // useScope: 'local'
    })
    const changLocale = () => {
       locale.value = 'ja'
}

  return () => (
    <>
      <div class={styles.title}>{props.msg}</div>
      {list.value.map(item => <span>{item}</span>)}
      <h1>{slots.default ? slots.default() : 'web前端'}</h1>
      <h1>依赖注入{unref(msg)}</h1>
      <h1>ConfigProvider {injectVal?.lang}</h1>
      <h1>ConfigProvider {injectVal?.theme}</h1>
      <button onClick={changeLang}>child change theme=</button>
      <div>modal store visible {visible.value? 'show': 'hidden'}</div>
      <button onClick={toggle}>toggle modal store visible</button>
      <div></div>
       <form>
      <label>{ t('language') }</label>
      <select v-model={locale.value}>
        <option value="en">en</option>
        <option value="ja">ja</option>
        </select>
       
      </form>
       <button onClick={changLocale}>chang locale</button>
      <p>{t('hello')}</p>

    </>
  )
  }
})

export default MyModalFC