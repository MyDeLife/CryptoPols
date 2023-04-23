/* createCompletion.js */
import { openai } from './api.js'

async function createCompletion() {
    try {
        const response = await openai.createCompletion({
            model: 'babbage:ft-mydelife-2023-04-19-22-36-26',
            prompt: `how many states are there in the US?`,
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