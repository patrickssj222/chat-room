# chat-room
Author: Patrick Hao  
Version: 1.0.0  
Version Upload Date: Feb 11th 2020

####Deployment Process

```
Frontend:
1. cd frontend
2. npm install
3. npm run build 
* this will build the front end react application into backend/build

Backend:
1. cd backend
2. npm install
4. node server.js
5. open browser at localhost:3000
```

####Limitation & Constraints
```
1. User accounts are stored using local-storage, no database are involved
*That means if the express server is terminated, user accounts are lost.
2. Express server is server on port 3000 unless specified by env variable. 
3. Proxy are used to bypass CORS on port 3000
4. Authentication are stored using Cookies
```