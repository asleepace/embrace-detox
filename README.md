# embrace-detox
A sample example of the issue(s) we are facing with Embrace, Detox & Jest for react native. This is a minimum verifiable example which illustrates the build errors between these two frameworks. This project was created with the latest version of React Native using `react-native init`. We then implemented the Embrace framework (android only) and were able to build the debug version of the application. After installing the Detox & Jest testing frameworks, we then ran into the same issues which are occuring on our host application. Hopefully this can help debug the issue!

# Getting Started

To download this project from Github, please run the following command:

```bash
git clone git@github.com:Asleepace/embrace-detox.git
```

You should then see a folder name *embrace-detox* which contains the sample project, to get started run the following commands:

 ```bash
 cd embrace-detox
 cd example
yarn
```

Once yarn is finished installing the modules, try running the project in debug mode to make sure it builds. It should build and you will see a welcome screen with some sample text and a button. You can build by running the following command:

```bash
react-native run-android
```

# Installing Detox

The next step is to install the Detox testing framework, you can find more detailed instructions on this [here](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md). You will need to install *node* (8.3.0+) and the *detox-cli* tools, which can be done by running the following script:

```bash
brew update && brew install node
npm install -g detox-cli
```

Then add the *detox* testing framework to the *example* project as well:

```bash
yarn add detox -D
```

The next step will be installing a test runner which handles the actual Javascript code execution.

