# Project Name
 
Arkham Horror Deck Manager
 
## Contributing

TODO: Add Contributing Info   

## Installation
 
- Pull down the repository
- cd into the repository
- Run 'npm install'
- If you have not already, install the react-native-cli with the command 'npm install -g react-native-cli'
 
 
## Usage
 
### iOS
To Run the app on iOS, navigate to the iOS folder and open the .xcodeproj file with Xcode.

While making updates to the src, you do not need to rebuild the app every time. You can hit "cmd+r" to refresh the app in the emulator.

Hit control+cmd+z to enable live reload or you can refresh the Javascript with cmd+r

### Android
To run the app on Android, open Android Studio and open the android directory.

Then make sure to run the command "react-native start" in the repository root directory to start the packager. This runs automatically on iOS.

## Contributing

Create a Pull Request against the development branch
  
## Developing
  
It's highly recommended to set up your editor to use the .eslintrc.json file so you are alerted immediately by any lint errors.

## Reviewing

- Check that imports are ordered alphabetically.
- Check that imports are grouped together. React Libraries, Constants and Styles, and then Components.
- Check that there are no unused imports.
- Check that style properties are ordered alphabetically.
- Check that components have propTypes and default propTypes(if necessary).
- Any styles should be in a Stylesheet and not inline.
- If it makes sense, request documentation added to confluence.
- Packages versions in package.json should be locked.
- Methods only used in a class should be declared private with a leading underscore _method()
- Run `./node_modules/.bin/eslint ./app` from the root directory and make sure it comes back clean.
- Run `npm test` and make sure it comes back clean.

## Test

We make use of [Jest](https://facebook.github.io/jest/)
