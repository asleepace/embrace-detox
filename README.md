# Getting Started
This is a minimum verifiable example which illustrates the build errors with Embrace, Detox & Jest. This project was created with the latest version of React Native using `react-native init`. Implemented via the current Embrace react-native guide (android only) as well as Detox and Jest. Hopefully this can help debug the issue!

To download this project from Github, please run the following command:

```bash
git clone git@github.com:Asleepace/embrace-detox.git
```

You should then see a folder named **embrace-detox**, which contains the sample project, to get started run the following commands:

 ```bash
 cd embrace-detox
 cd example
yarn
```

Once yarn is finished installing, try running the project in debug mode to make sure everything was installed properly, you can build by running the following command:

```bash
react-native run-android
```

The project should build correctly, and you will see a simple welcome screen with some text and a button.

# Installing Detox

The next step is to install the Detox testing framework, you can find more detailed instructions on this [here](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md). You will need to install **node** (8.3.0+) and the global **detox-cli** tool, which can be done by running the following script:

```bash
brew update && brew install node
npm install -g detox-cli
```

Then add the **detox** package to the **example** project by running this command in the `./embrace-detox/example` folder:

```bash
yarn add detox -D
```

Next install Jest, the test runner which handles the actual Javascript code execution, you can read more about that [here](https://github.com/wix/Detox/blob/master/docs/Guide.Jest.md). Run the following script:

```bash
yarn add jest jest-circus -D
```

And now we are almost ready to run our test suite!

# Running the tests

The goal of Detox and Jest is to run automated tests on our application. This can help us identify issues before they reach production, and thus are vitally important for our organization. Please not the following lines in the **.detoxrc.json**.

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

Next please make note of the test device which will be running these tests, you will need to create these in Android Studio and then change the `advName` to match one of the devices you created.

### Creating virtual machines

You can learn more about creating virtual devices [here](https://developer.android.com/studio/run/managing-avds).

# Running the tests

Once all of the above has been completed we can now try running our test suite, in this case a simple test which just checks to see if the welcome screen is visible when the application is started. First things first we will need to build the test (make sure you are in the ./example/ directory when running these commands):

```bash
detox build -c android.emu.debug
```

This will build our debug testing application, which we can then run our test suite on by running the folling command:

```bash
detox run -c android.emu.debug
```

What we have noticed is that when building the debug version of the application fails, and the issue appears to be related to Embrace (more details below).

# Sample error output

Below is a snippet of the specific error which occurs when building the test suite for debug mode:

```bash
> Transform artifact android-retrostreams-1.6.3.jar (net.sourceforge.streamsupport:android-retrostreams:1.6.3) with DexingNoClasspathTransform
AGPBI: {"kind":"error","text":"Default interface methods are only supported starting with Android N (--min-api 24): void java9.util.Spliterator.forEachRemaining(java9.util.function.Consumer)","sources":[{}],"tool":"D8"}

> Task :react-native-embrace:mergeExtDexDebugAndroidTest FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':react-native-embrace:mergeExtDexDebugAndroidTest'.
> Could not resolve all files for configuration ':react-native-embrace:debugAndroidTestRuntimeClasspath'.
   > Failed to transform embrace-android-sdk-4.2.2.aar (embrace-io:embrace-android-sdk:4.2.2) to match attributes {artifactType=android-dex, dexing-enable-desugaring=false, dexing-is-debuggable=true, dexing-min-sdk=16, org.gradle.category=library, org.gradle.libraryelements=jar, org.gradle.status=release, org.gradle.usage=java-runtime}.
      > Execution failed for DexingNoClasspathTransform: /Users/phoenix/.gradle/caches/transforms-2/files-2.1/cbc2aa55cf3dd036108a8a4b18d809f1/jetified-embrace-android-sdk-4.2.2-runtime.jar.
         > Error while dexing.
   > Failed to transform android-retrostreams-1.6.3.jar (net.sourceforge.streamsupport:android-retrostreams:1.6.3) to match attributes {artifactType=android-dex, dexing-enable-desugaring=false, dexing-is-debuggable=true, dexing-min-sdk=16, org.gradle.category=library, org.gradle.libraryelements=jar, org.gradle.status=release, org.gradle.usage=java-runtime}.
      > Execution failed for DexingNoClasspathTransform: /Users/phoenix/.gradle/caches/modules-2/files-2.1/net.sourceforge.streamsupport/android-retrostreams/1.6.3/c42be8718a61aa62f5ea1f44fff167f1c7ef5ce6/android-retrostreams-1.6.3.jar.
         > Error while dexing.

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

Deprecated Gradle features were used in this build, making it incompatible with Gradle 7.0.
Use '--warning-mode all' to show the individual deprecation warnings.
See https://docs.gradle.org/6.2/userguide/command_line_interface.html#sec:command_line_warnings

BUILD FAILED in 17s
96 actionable tasks: 93 executed, 3 up-to-date
detox[47035] ERROR: [cli.js] Error: Command failed: cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..
```

# Troubleshooting

If you ar eunable to get this particular project running, it is quite easy to recreate this project from scratch. Just use the following guides for setting up.

### React native setup

[https://reactnative.dev/docs/0.61/getting-started](https://reactnative.dev/docs/0.61/getting-started)

### Detox setup

[https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md)

### Jest setup with Detox

[https://github.com/wix/Detox/blob/master/docs/Guide.Jest.md](https://github.com/wix/Detox/blob/master/docs/Guide.Jest.md)

### Running tests

[https://github.com/wix/Detox/blob/master/docs/Introduction.WritingFirstTest.md](https://github.com/wix/Detox/blob/master/docs/Introduction.WritingFirstTest.md)

