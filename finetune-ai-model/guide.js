/* Updating trainingData? After ensuring openAI API key is added [export OPENAI_KEY="your-api-key"],
follow these steps:

    1. add new info/data to trainingData.jsonl [ensure correct syntax]
    2. run the uploadFile script in terminal: node uploadFile.js 
        NOTE: when uploadFile is complete, a file ID will be displayed
    3. open createFineTune.js and update the file ID: training_file: 'your-file-id',
    4. run createFineTune script: node createFineTune.js
        NOTE: this may take several minutes
    5. to check status of createFineTune, run listFineTunes script: node listFineTunes.js
    6. to use your custom AI model after adding the new data 
        (and updating prompt in createCompletion.js if needed), 
        run createCompletion script: node createCompletion.js

source links:
openAI doc - https://platform.openai.com/docs/guides/fine-tuning
nader's doc - https://nader.substack.com/p/supercharge-your-gpt-model-custom

*/