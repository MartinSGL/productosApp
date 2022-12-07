# Pokedex App


This is a mobile app built over the course of Udemy React Native - Fernando Herrera. This works as a guide on how to consume an API,use the async storage to save the tokens, and to use the camera and gallery in order to save images to a web server.
\
\
![****](/screen-app.png)

News

- In this code navigation.replace() was used to avoid the user returning to the login screen once they are logged (check register screen)
- A middleware in axios was used to be sure that every request has the token (check Api/CafeAPi)
- A hook was used in order to throw an error when context is called outside of its provider


Features:

- [react-native-picker/picker](https://github.com/react-native-picker/picker) - to make the selector
- [react-native-async-storage/async-storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage) - to save the tokens
- [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker) - to pick a photo from the camera or the gallery