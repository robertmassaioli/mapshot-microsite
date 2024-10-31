import React from "react";
import { AppContainer } from "./AppContainer";
import Markdown from "react-markdown";

const pageContents = `
## How do I get one of these for myself?

The git repo is available on [GitHub][1].

Please feel free to read the README and set one up for yourself. Knowledge of shell scripting and AWS will be required.

## Where do I go to raise issues?

Please raise issues in the [bug tracker](https://github.com/robertmassaioli/mapshot-microsite/issues).

## How do I go and build new features?

Please go to the [repository][1] and contribute at will.

 [1]: https://github.com/robertmassaioli/mapshot-microsite
`;

export const Contact: React.FC = () => {
   return (
      <AppContainer>
         <Markdown>{pageContents}</Markdown>
      </AppContainer>
   );
}