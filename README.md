# EverlastingGobStopper

## Background Information
The EverlastingGobStopper is a project from a hackathon happening at the HCL CWP factory in chelmsford, MA on 10.th and 11.th of July 2018.

It aims at giving a Domino web app a homescreen icon on smart devices, technically a progressive web app (PWA) that is doing a form based login process and then caches a secure java web token for the user not having to logon to the app on next start (native-like mobile app experience for domino web apps).

## Technical Approach
```
 ---------------           --------------           --------------
| Progressive   |   jwt   | Node.js      |  LTPA   | Domino       |
| web           | <-----> | server       | <-----> | server       | 
| app           |         |              |         | app.nsf      |
 --------------            --------------           --------------
 ```
 
