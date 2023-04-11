/* createCompletion.js */
import { openai } from './api.js'

async function createCompletion() {
    try {
        const response = await openai.createCompletion({
            model: 'davinci:ft-mydelife-2023-04-10-19-38-33',
            prompt: 'Summarize how Joe Biden views crypto',
            max_tokens: 200
        })
        if (response.data) {
            console.log('choices: ', response.data.choices)
        }
    } catch (err) {
        console.log('err: ', err)
    }
}

createCompletion()