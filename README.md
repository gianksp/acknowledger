# Acknowledger 🥳 (A SuperHack 2023 Project)

*Great Cultures Starts with Acknowledgement*

**Acknowledger** is a peer-to-peer recognition platform tailored to community values, culture, and performance. Designed for SuperHack 2023 by Giancarlo.

In essence, is a project that leverage NFTs that people can mint for others. These NFTs generated are soulbound and capture a peace of feedback, kudos, recognition from the sender.

The recipient captures all these testimonials in a public, shareable wall that is timeless since data is fully stored in blockchain.

ChatGPT is used to generate a summarized 2 liner of all the testimonial provided by people for the recipient.

---

## Smart Contracts and Networks Supported

The Smart Contract used is a Soulbound Token using ERC721 standard. You can check the [source code here](https://github.com/gianksp/acknowledger/blob/main/contracts/AcknowledgerERC721.sol)

| Contract Address         | Testnet |
|--------------|:-----:|
| [0x2371d14D14C3dB50691eF0d02409eC660105ce5B](https://testnets.opensea.io/assets/optimism-goerli/0x2371d14D14C3dB50691eF0d02409eC660105ce5B) |  Optimism |
| [0xbD288d5988aC2Be2D50a3d4274f5fbc285e12C03](https://testnets.opensea.io/assets/base-goerli/0xbD288d5988aC2Be2D50a3d4274f5fbc285e12C03)      |  Base |
| [0xd7c58cbcd141dc5edcc5971e615c8c49cc8c2205](https://testnet.zora.co/collect/zgor:0xd7c58cbcd141dc5edcc5971e615c8c49cc8c2205)      |  Zora |

---

## Why Acknowledger

*Imagine the cultural impact if more communities adopted a mechanism encouraging “watching for” and “recognizing” bar-raising behaviors daily. This is recognition without cumbersome process-reviews-approvals, fostering a culture of continuous improvement.*

---

## How It Works

Acknowledgements are soulbound non-fungible tokens containing a kudos granted to other users as means of congratulating and acknowledging their contributions within a team, community or on a personal basis.

1. **Submit an Ack**: Any user can submit an ack (acknowledgement) for anyone else.
2. **Describe the Achievement**: Share in 500 characters or less, “What they did well.”
3. **Select Value/Principle**: Choose the related Value or Principle demonstrated.
4. **Submit**: After submitting, the person(s) receive a notification, as does their community.
5. **Community Recognition**: Recognized members may participate in community prize pools or reward plans.
6. **NFT Integration**: Acknowledgements are soulbound non-fungible tokens on Optimism, Zora, and Base Testnets.
---

## Tech and Bounties

For SuperHack2023 the use of the following technologies is detailed to argument the bounties the project applies for

| Tech         | Bounty | Description | Link to implementation
|--------------|:-----:|:-----:|:-----:|
| Optimism |  🏊‍♀️ $5,000 Super Pool Prize | SBT deployment in all 3 networks Optimism, Zora and Base Testnets | [constants](https://github.com/gianksp/acknowledger/blob/main/app/constants.js#L5), [API calls](https://github.com/gianksp/acknowledger/blob/main/app/api/index.js), [Networks supported](https://github.com/gianksp/acknowledger/blob/main/app/constants.js#L17)
| Base     |  Build a Consumer Product | Product for teams and communities to incentivize engagement  via bar raising examples | [Support for Base](https://github.com/gianksp/acknowledger/blob/main/app/constants.js#L25), [API Calls](https://github.com/gianksp/acknowledger/blob/main/app/api/index.js#L17)
| Zora    |  Bounty | SBT deployed on Zora Testnet | [Support for Zora](https://github.com/gianksp/acknowledger/blob/main/app/constants.js#L31), [API Calls](https://github.com/gianksp/acknowledger/blob/main/app/api/index.js#L16)
| Covalent    |  Bounty | API for NFT retrieval from Zora, Optimism and Base testnets | [API calls](https://github.com/gianksp/acknowledger/blob/main/app/api/index.js#L14)
| TheGraph | Best use of Existing Subgraph | ENS subgraph used to resolve 0x address from ENS domain and also ENS domain from 0x addresses | [API call](https://github.com/gianksp/acknowledger/blob/main/app/api/index.js#L49), [API call](https://github.com/gianksp/acknowledger/blob/main/app/api/index.js#L80)


---


## Benefits

- **Engaged Community**: Enhanced happiness, quality of contributions, and growth.
- **Quality Contribution**: Communities are more likely to contribute at their peak.
- **Stronger Culture**: Recognition fosters belonging, engagement, and productivity.

---

## The ROI of Recognition

Prioritizing contribution recognition and community engagement offers significant cultural and performance benefits.

---


## License

© 2023 Acknowledger. All Rights Reserved.