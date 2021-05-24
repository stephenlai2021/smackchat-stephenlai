# Smackchat App

## Chapter 1
Build Layout Page
---

## Chapter 2
Build Users Page
---

## Chapter 3
Build Chat Page
---

## Chapter 4
Build Auth Page
---

## Chapter 5
Setup Firebase: 
- path: `/firebase/config.js`

Create Vuex
- path: `/store/index.js`

I didn't use Vuex, instead I use Composition API for state management, it works better than Vuex 😁😁😁

Reference
[Vue JS 3: Composition API for State Management (Vuex Killer?)/Danny Connel](https://www.youtube.com/watch?v=_k4GM5cmm68
---

## Chapter 6
- path: `/src/data/db.json`

Create a json file with users info, and upload to firebase realtime database, we structure users and chats objects. 

However I use firestore instead because realtime datbase is kinda deprecated and is not recommended by Firebase team 😎😎😎
---

## Chapter 7
- Create registerUser, loginUser methods in store and connects to Firebase auth & firestore
- path: `/src/store/index.js`
---

## Chapter 8
- Save user details to firestore after user register
- Listern to auth state change whenever page is refreshed
- retrieve user details from firestore and save to user state
---

## Chapter 9
- implement logout functionality
- redirect user to auth page after logout; redirect user to user page after login
---

## Chapter 10








