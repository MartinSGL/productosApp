# Productos App


This is a mobile app built over the course of Udemy React Native - Fernando Herrera. This works as a guide on how to consume an API,use the async storage to save the tokens, and to use the camera and gallery in order to save images to a web server.
\
\
![****](/screen-app.png)

News

- In this code navigation.replace() was used to avoid the user returning to the login screen once they are logged (check register screen)
- A middleware in axios was used to be sure that every request has the token (check Api/CafeAPi)
- A hook was used in order to throw an error when context is called outside of its provider
- Button on the left and right of the header in the stacknavigator (check ProductsScreen.tsx)


Features:

- [react-native-picker/picker](https://github.com/react-native-picker/picker) - to make the selector
- [react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage) - to save the tokens
- [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker) - to pick a photo from the camera or the gallery
- [generador iconos android](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=clipart&foreground.clipart=android&foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(68%2C%20138%2C%20255)&crop=0&backgroundShape=square&effects=none&name=ic_launcher) - download the icons choosen (square and round), replace them in mipmap folders acording to their size (android/src/main/res) and to change the name just change the app_name in string.xml (android/src/main/res/values) 
- [generador iconos ios](https://www.appicon.co/) - to change the name just open file.workspace, once the file is open in xcode, select foldername/general and change the display name. Afterward in order to change the icon, in the same file opened in xcode, select images go to the generator images for ios drop the image and download the images and drag and drop the folder AppIcon.appiconset, select the iphone number and push play
- [splashscreen](https://github.com/crazycodeboy/react-native-splash-screen) to make the splash screen in ios and android
    ### Adroid 
    (look for comment splashscreen)
    - android/settings.gradle
    - android/app/build.gradle
    - adnorid/app/src/main/java/com/name/MainApplication.java
    - adnorid/app/src/main/java/com/name/MainActivity.java
    - create the folder app/src/main/res/layout
    - open the folder android in adroid studio and check video 369 at minute 10
    ![****](/android-studio.png)
    - create a file android/app/src/main/res/values/colors.xml
    - consult [this](https://stackoverflow.com/questions/30342933/blank-screen-comes-before-splash) in case remove first white screen wants to be done 
    ### Ios
    (look for comment splashscreen)
    - ios/nameproject/AppDelegate.mm
    - create LounchScreen.storyboard in xcode check vide 271 at minute 2 and a half 
    ![****](/xcode.png)
