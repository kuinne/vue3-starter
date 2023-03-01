import { isRef, Ref, ref, shallowRef, unref, watchEffect } from "vue";
type MaybeRef<T> = T | Ref<T>
export function useFetch(url: MaybeRef<string>) {
    const data = shallowRef(null)
    const error = shallowRef<Error | null>(null)
    const isFinished = ref(false)

    async function doFetch() {
        data.value = null;
        error.value = null;

        const urlValue = unref(url)
        try {
            await timeout()

            const res = await fetch(urlValue)
      
            data.value = await res.json()
     
        } catch (e) {
            error.value = e as Error
        } finally {
            isFinished.value = true
        }
    }

    if (isRef(url)) {
        watchEffect(doFetch)
    } else {
        doFetch()
    }

    return {data, error, retry: doFetch}


}

function timeout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.3) {
                resolve(null)
            } else {
                reject(new Error('random error'))
            }
        }, 300);
    })
}