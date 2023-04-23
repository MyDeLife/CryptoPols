/* testCompletion.js */
import { openai } from './api.js'

async function createCompletion() {
    try {
        const response = await openai.createCompletion({
            model: 'text-babbage-001',
            /*prompt: `Review the following article and provide two responses back in an array format for a JSON file. The first response is called “Rating” and refers to whether a politician is pro, anti or neutral towards the crypto industry. The rating scale is 1-11, where 1 is strongly anti-crypto, 6 is neutral and 11 is strongly pro-crypto. The following provides a guidance on how to rate the article accurately:
Evaluate only actual statements made by politicians that are quoted in the article
Disregard opinions expressed by others about a politician.
The following classifications are to be interpreted as anti-crypto, which includes statements made by a politician that he/she:
Supports implementing central bank digital currencies (CBDCs). CBDCs open the door for governments to place tighter controls over financial transactions of their people and are therefore against the spirit of freedom, liberty and universal access to finance that crypto aims to accomplish.
Supports restricting access to crypto via regulations, so that residents have a more difficult time to buy, sell or do business in crypto & web3.
Claims that crypto is inherently bad or does not produce any value for society.
States that crypto is exclusively used by bad actors, such as money launderers, terrorist groups and pariah countries.
Supports shutting down the crypto industry as a whole.
The following classifications are to be interpreted as pro-crypto, which includes statements made by a politician that he/she:
Views crypto, web3 and blockchain technology as a highly innovative segment with significant potential for future growth.
Shows active engagement in meaningful regulation of the crypto industry, which includes making crypto a more secure place for everyday citizens to engage in financial transactions with minimized risks of getting scammed, hacked, or otherwise attacked by bad actors.
Expresses the important need for privacy granted to citizens in the crypto space, where governments don’t take advantage of blockchain benefits, such as transparency, to monitor and control their people.
Expresses opposition against the idea of implementing CBDCs.
Shows support for investing into important decentralized crypto infrastructure and applications, both in the public and private sector.
If the review of the article does not allow concluding reasonable rating, then the result for Rating in the response should be “NA”. Possible reasons could be that the article doesn’t cover the topic of crypto deep enough, there are no quotes in the article by a politician, or the politicians quote is not meeting any of the above criteria.
The second data point to return in the response is “Quote”, which is the one evaluated quote from the politician in the article that was most heavily used to determine the rating. Only one quote should be referenced, not more.
The name of the politician to evaluate in the following article is <name>. Disregard any other politicians mentioned or quoted in this article.

Article:
Democratic United States Senator Elizabeth Warren, who is one of the most influential politicians, launched her re-election campaign yesterday, focusing on the “building of an anti-crypto army”. Although Warren’s hostile efforts against Bitcoin and crypto are nothing new, the choice of words as well as the central role in particular is frightening.In her latest Twitter post, she calls on her followers to join the campaign and praises her plans as well as past achievements. The accomplishments include providing over-the-counter hearing aids and lowering the cost of child care in the state of Massachusetts – but also the formation of the “anti-crypto army.”I’m in this fight to put our government on the side of working families. Join our re-election campaign today: https://t.co/KuZwvrwkqT pic.twitter.com/fCUcqE9PZM— Elizabeth Warren (@ewarren) 
March 29, 2023With this, Warren is referring to a February 2023 Politico article, which stated that “the progressive Democrat” is starting to recruit conservative Republicans in the Senate to her anti-crypto movement, and is uniting “progressives and conservatives, watchdog groups and bankers, who share common cause in wanting to derail the unfettered growth of crypto.”Warren’s efforts to harm the industry culminated in the introduction of the Digital Asset Anti-Money Laundering Act of 2022 in December, although the bill was opposed by both Republicans and other Democrats.In February, Warren promised to reintroduce the bill this year. The pretext, as in the re-election campaign: Elizabeth Warren wants to protect the “most vulnerable people” from digital assets.Because of this, she plans to widely implement anti-money laundering (AML) policies,
 even for DeFi platforms and self-hosted wallets. In addition, Warren wants to ban the use of mixers.Coin Center, a leading non-profit focused on the policy issues facing cryptocurrencies, called the act “an opportunistic, unconstitutional assault on self custody, developers, and node operators.” Jerry Brito, executive director of Coin Center added that this “is the most direct attack on the personal freedom and privacy of cryptocurrency users and developers we’ve yet seen.”More explosively, in January 2023, it was revealed by the Heritage Foundation that Warren is apparently working with the US Securities and Exchange Commission (SEC) chief Gary Gensler to execute operation Choke Point 2.0.The organization revealed that Warren sent the questions and answers to the SEC chairman before his hearing before Congress in January and even asked if he agreed with the wording.🚨 🚨: What was @SenWarren's staff doing coordinating questions & testimony with officials from the Securities and Exchange Commission before their leader testified before Warren's committee in 2021? @jasoninthehouse breaks down the emails the Oversight Project just uncovered: pic.twitter.com/swFomkew8x— Heritage Foundation (@Heritage) January 27, 2023Besides that, the threat of a backdoor ban on private cryptocurrency transactions is currently seen by some experts as a result of the RESTRICT act. Messari CEO Ryan Selkis today retweeted an assessment by J.W. Verret, an associate professor at the George Mason Law School.The latter wrote via Twitter that “this bill can and will be used to ban crypto privacy tools and any other privacy tools. Congressman Tom Emmer, we need your help on this.”At press time, the Bitcoin price continued to flourish on the new  macroeconomic environment and brewing banking crisis, trading at $28,577.For updates and exclusive offers enter your email.
Bitcoin news portal providing breaking news, guides, price analysis about decentralized digital money & blockchain technology.© 2022 Bitcoinist. All Rights Reserved.
`, */
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