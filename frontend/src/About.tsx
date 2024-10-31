import React from "react";
import { AppContainer } from "./AppContainer";
import Markdown from "react-markdown";

const pageContents = `
## About

Welcome to the Factorio Mapshot website tool, developed by Robert Massaioli.

This tool is designed to allow you to save multiple factorio games and display them in the one place especially when
this tool was first created, the goal was to be able to have multiple saves for the same game all in the one place and
to be able to switch between them so that you could see how the factory has grown over time. After all, the factory must
 grow and we need to be able to see it growing over time.

This website was built to be run as a static site on AWS and hosted by a CDN. That means that everybody that views your
saves can load them quickly without issue. It also does not have a back end so is pretty secure.
`;

export const About: React.FC = () => {
   return (
      <AppContainer>
         <Markdown>{pageContents}</Markdown>
      </AppContainer>
   );
}