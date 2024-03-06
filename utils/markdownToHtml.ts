import { remark } from "remark";
import remarkHtml from 'remark-html'

export async function markdownToHtml(value: string) {
    const html = await remark().use(remarkHtml).process(value)

    return html.toString()
}