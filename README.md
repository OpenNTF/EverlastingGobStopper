# EverlastingGobStopper

## Background Information
The EverlastingGobStopper is a project from a hackathon happening at the HCL CWP factory in chelmsford, MA on 10.th and 11.th of July 2018.

It aims at giving a [Domino](https://www.ibm.com/collaboration/ibm-domino) web app a homescreen icon on smart devices, technically a progressive web app ([PWA](https://de.wikipedia.org/wiki/Progressive_Web_App)) that is doing a form based login process and then caches a secure [json web token](https://de.wikipedia.org/wiki/JSON_Web_Token) for the user not having to logon to the app on next start (native-like mobile app experience for domino web apps).

## Technical Approach
```
 ---------------           --------------           --------------
| Progressive   |   jwt   | Node.js      |  LTPA   | Domino       |
| web           | <-----> | server       | <-----> | server       | 
| app           |         |              |         | app.nsf      |
 --------------            --------------           --------------
```
 
## User Experience

### Current State
The user opens a domino web app in his browser and decides to place it on the home screen of his smart device.
On Adroid, this leads to a cached logon and stateful app experience. You'll get back to where you left in the app.
On iOS, the app does start the configured URL every time the user starts the app, asking for a logon again and again.

### Intended State
The user adds the app to his homescreen.
On first start, the app asks for a logon with username and password.
The serviceworker launches a function that calls out to the node.js server to create a JWT for that user.
The JWT allows to save a secure expression of the users identity without saving the password in any way.
The node.js server will then call out to the domino server and create an LTPA token for that user.
The LTPA token is loaded to the browser of the user as a cookie.
Then the browser will be redirected to the final URL of the domino web app.
The second and following starts of the app will use the cached JWT to repeat the login process without involving the user again.
This way the app starts just like a native app without need for logging in again and again.

## Known Issues
The above approach can not solve some other features that a user will expect from a native mobile app:
- [deep linking](https://en.wikipedia.org/wiki/Deep_linking)
- push notifications (at least not on iOS)
- save navigation state to start with the latest used URL next time
