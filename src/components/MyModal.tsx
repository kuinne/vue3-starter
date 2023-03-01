import { defineComponent, ref, toRefs } from 'vue'
interface MyModalProps {
  msg?: string
}
export default defineComponent({
  setup(props: MyModalProps, ctx) {
    const isShow = ref(false)
    const toggle = () => {
      isShow.value = !isShow.value
    }
   
      return () => <>
        {isShow.value ? <div>{props.msg}</div>: <div>no Show</div>}
        <button onClick={toggle}>toggle</button>
        
      </>
    }
})