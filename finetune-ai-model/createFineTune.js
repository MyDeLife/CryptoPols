/* createFineTune.js */
import { openai } from './api.js'

async function createFineTune() {
    try {
        const response = await openai.createFineTune({
            training_file: 'file-ZEzWqMgLUsRmcxHsojVPiWUP',
            model: 'babbage'
        })
        console.log('response: ', response)
    } catch (err) {
        console.log('error: ', err.response.data.error)
    }
}

createFineTune()