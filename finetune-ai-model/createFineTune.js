/* createFineTune.js */
import { openai } from './api.js'

async function createFineTune() {
    try {
        const response = await openai.createFineTune({
            training_file: 'file-eEVczudnj3D9X5mLL1Q4jF0q',
            model: 'davinci'
        })
        console.log('response: ', response)
    } catch (err) {
        console.log('error: ', err.response.data.error)
    }
}

createFineTune()