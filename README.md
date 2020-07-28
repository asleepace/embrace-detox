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

The next step will be installing a test runner which handles the actual Javascript code execution, you can read more about that [here](https://github.com/wix/Detox/blob/master/docs/Guide.Jest.md). Run the following script:

```bash
yarn add jest jest-circus -D
```

And now we are almost ready to run our test suite!

# Running the tests

The goal of Detox and Jest is to run automated tests on our application. This can help us identify issues before they reach production, and thus are vitally important for our organization. Please not the following lines in *.detoxrc.json*.

```json
{
  "testRunner": "jest",
  "runnerConfig": "e2e/config.json",
  "configurations": {
      "android.emu.debug": {
        "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
        "build": "cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..",
        "type": "android.emulator",
        "device": {
          "avdName": "Pixel_API_26"
        }
      },
      "android.emu.release": {
        "binaryPath": "android/app/build/outputs/apk/release/app-release.apk",
        "build": "cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..",
        "type": "android.emulator",
        "device": {
          "avdName": "Pixel_API_26"
        }
      }
  }
}
```

### Set apk binary path
In the configurations portion of the snippet above you see our two test schemas, one for debug and one for release. Please make sure that the `binaryPath` matches the actual binary path the of the generated apk. 

### Set target virtual machine
Next please make not of the device which will be running these tests, you will need to create these in Android Studio and then change the `advName` to match one of the devices you created.

### Creating virtual machines
You can learn more about creating virtual devices [here](https://developer.android.com/studio/run/managing-avds).

# Running the tests

Once all of the above has been completed we can now try running our test suite, in this case a simple test which just checks to see if the welcome screen is visible when the application is started. First things first we will need to build the test (make sure you are in the ./example/ directory when running these commands):

```bash
detox build -c android.emu.debug
```

This will build our debug release of the application, which we can then run our test suite on by running the folling command:

```bash
detox run -c android.emu.debug
```

What we have noticed is that building the debug version of the application fails, and the issue appears to be related to Embrace (more details below). 