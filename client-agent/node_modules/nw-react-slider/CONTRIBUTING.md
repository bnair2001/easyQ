# How to contribute
You can contribute by:

- Reporting bugs
- Suggesting enhancements
- Writing code

## Reporting bugs
Before creating a bug report, please check if the bug has already been reported. If it hasn't, then please go ahead and [report it](https://github.com/NerdWallet/nw-react-slider/issues/new) and label it as a bug. Please keep the following guidelines in mind:

- Use a clear and descriptive title for the issue to identify the problem.
- Describe the problem as clearly as you can.
- Provide the steps, or better still a code sample to reproduce the problem.
- Explain how the current behavior is different from expected behavior.

## Suggesting enhancements
We like to keep components focussed and only providing features that actually relate to the component itself. That being said we are open to feature requests. If you feel there is some feature that nw-react-slider should offer then [report it](https://github.com/NerdWallet/nw-react-slider/issues/new) and label it as an enhancement. Just like when reporting bugs, be clear and descriptive, and explain why you think the feature would make sense as part of nw-react-slider.

## Writing Code
To contribute code to nw-react-slider,

- Pick a bug or feature-request from the [issues list](https://github.com/NerdWallet/nw-react-slider/issues).
- Fork the repository and make your changes.
- Please include the issue number and description in your commit message.
- Include a [tldr;](http://www.dictionary.com/browse/tldr) summary of your changes.
- Using your judgement, include an explanation of changes.
- Consider adding a test when you fix a bug. We use [Mocha](https://mochajs.org/), [ChaiJS](http://chaijs.com/) and [Enzyme](https://github.com/airbnb/enzyme).
- Ensure you don't break existing tests. Executing `$npm run test` to run tests and lint the code. We are using [StandardJS](http://standardjs.com/) style at the moment but this might change in the future.
- Double check changes work by adding it to the examples
- Update the version in package.json in accordance with [semver](https://docs.npmjs.com/getting-started/semantic-versioning) guidelines.
