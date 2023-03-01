import type { Plugin } from 'vite';
let resolvedConfig
let server
export default function VitePluginTestPlugin(): Plugin {
    const virtualModuleId = 'virtual:my-module'
    const resolvedVirtualModuleId = '\0' + virtualModuleId
    return {
        name: 'vite-plugin-test',
        enforce: 'post',
        apply: 'serve',
        /** 在解析 Vite 配置前调用 */
        config: (config, { command}) => {
            if (command === 'build') {
                config.root = 'foo'
            }
        },
        /** 在解析 Vite 配置后调用 */
        configResolved(config) {
            resolvedConfig = config
        },
        /** 是用于配置开发服务器的钩子 */
        configureServer(_server) {
            server = _server
            // server.middlewares.use((req, res, next) => {
 
            //     next()
            // })
            server.ws.send('my:greetings', {msg: 'hello'})
            /** 被调用的后置钩子 */
            // return () => {
            //         server.middlewares.use((req, res, next) => {

            //     next()
            // })
            // }
            server.ws.on('my:from-client', (data, client) => {
                console.log('Message from client:', data.msg) // Hey!
                // reply only to the client (if needed)
                client.send('my:ack', { msg: 'Hi! I got your message!' })
            })
           
        },
        /** 与 configureServer 相同但是作为预览服务 */
        configurePreviewServer(server) {
            return () => {
                server.middlewares.use((req, res, next) => {
                    next()
                })
            }
        },
        /** 转换 index.html 的专用钩子 */
        transformIndexHtml(html, ctx) {
            // return html.replace(/<title>(.*?)<\/title>/, `<title>Title replaced!</title>`)
            return {
                html,
                tags: [{
                    tag: 'title',
                    children: 'Title replaced!'
                }]
            }
        },
        handleHotUpdate({file, timestamp, modules, read, server}) {
            console.log(modules) /** 是受更改文件影响的模块数组 */
         },
        resolveId: {
            order: 'pre',
            handler(source, importer, options) { 
                // console.log('source: ', source)
                // console.log('importer: ', importer)
            if (source === virtualModuleId) {
                return resolvedVirtualModuleId
            }
        },
        },
        load(id) {
            if (id === resolvedVirtualModuleId) {
                return 'export const msg = "form virtual module"'
            }
        },
        transform(code, id) {
            if (resolvedConfig.command = "serve") {
                // dev: 由开发服务器调用的插件
            } else {
                // build: 由 Rollup 调用的插件
            }

            if (server) {
                
            }
        },
        resolveDynamicImport(){}
    }
}