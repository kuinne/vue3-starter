import { Plugin } from 'vite'
import path from 'path'
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import {style} from './assets/juejin.style.ts'
const md = MarkdownIt()
export const transformMarkdown = (mdTxt: string): string => {
// 加上一个 class 名为 article-content 的 wrapper，方便我们等下添加样式
    return `<section class='article-content'>
        ${md.render(mdTxt)}
    </section>
    `
}
const mdRelationMap = new Map<string, string>()
export default function markdownPlugin(): Plugin {
    return {
        name: 'vite:markdown',
        // 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
        enforce: 'pre',
        transform(code, id, opt) {
            const vueRE = /\.vue$/;
            const markdownRE = /\<g-markdown.*\/\>/g;
            // 要对文件进行过滤，将非 vue 文件、未使用 g-markdown 标签的 vue 文件进行过滤，不做转换。
            if (!vueRE.test(id) || !markdownRE.test(code)) return code;
            let transformCode = code;
            const mdList = code.match(markdownRE)
            const filePathRE =/(?<=file=("|')).*(?=('|"))/;

            mdList?.forEach(md => {
                // 匹配 markdown 文件目录
                const fileRelativePaths = md.match(filePathRE)
                if (!fileRelativePaths?.length) return;

                // markdown 文件的相对路径
                const fileRelativePath = fileRelativePaths[0]
                // 找到当前 vue 的目录
                const fileDir = path.dirname(id)
                // 根据当前 vue 文件的目录和引入的 markdown 文件相对路径，拼接出 md 文件的绝对路径
                const mdFilePath = path.resolve(fileDir, fileRelativePath)
                // 读取 markdown 文件的内容
                const mdText = fs.readFileSync(mdFilePath, 'utf-8')
                transformCode = transformCode.replace(md, transformMarkdown(mdText))
                mdRelationMap.set(mdFilePath, id)
            })
            transformCode = `
                ${transformCode}
                <style scoped>${style}</style>
            `
            return transformCode
        },
        handleHotUpdate(ctx) {
            const { file, server, modules } = ctx;

            // 过滤非 md 文件
            if (path.extname(file) !== '.md') return;

            // 找到引入该 md 文件
            const relationId = mdRelationMap.get(file) as string;
            // 找到该 vue 文件对应的 moduleNode
            const relationModule = [...server.moduleGraph.getModulesByFile(relationId)!][0];
            // 发送 websocket 消息，进行单文件热重栽
            server.ws.send({
                type: 'update',
                updates: [{
                    type: 'js-update',
                    path: relationModule!.file,
                    acceptedPath: relationModule!.file,
                    timestamp: new Date().getTime()
                }]
            });
             // 指定需要重新编译的模块
            return [...modules, relationModule]
        }
    }
}