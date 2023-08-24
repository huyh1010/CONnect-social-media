<h1 align="center">Hi 👋, I'm Huy Huynh</h1>
<h3 align="center">A passionate Full Stack developer from Vietnam</h3>

<h3 align="left">Connect with me:</h3>
<a href="https://www.linkedin.com/in/huy-tien-huynh-4b0b3021b/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="https://www.linkedin.com/in/huy-tien-huynh-4b0b3021b/" height="30" width="40" /></a>
<a href="https://www.facebook.com/huy.huynh.1297943/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/facebook.svg" alt="https://www.facebook.com/huy.huynh.1297943/" height="30" width="40" /></a>
<a href="https://www.instagram.com/huyh1010/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="https://www.instagram.com/huyh1010/" height="30" width="40" /></a>
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://redux.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a> </p>


# CONnect Social Media App with React and Redux

A simple social media application made with the following features:


## Installation

To have this app running on your local computer, please follow the below steps:

Clone repository

```javascript
$ git clone https://github.com/huyh1010/HomeTech-Space-FE.git
```

Navigate to the project folder:

```javascript
$ cd CONnect-social-media
```

Install project dependencies:

```javascript
$ npm install
```

Set up environment variables (create an .env file)

```javascript
REACT_APP_BACKEND_API = "";
REACT_APP_CLOUDINARY_CLOUD_NAME = "";
REACT_APP_CLOUDINARY_UPLOAD_PRESET = "";
```

REACT_APP_BACKEND_API - enter the following link for api

```javascript
REACT_APP_BACKEND_API = "https://codercomm-api-dot-cs-platform-306304.et.r.appspot.com/api";
```

REACT_APP_CLOUDINARY_CLOUD_NAME & REACT_APP_CLOUDINARY_UPLOAD_PRESET

1. Navigate to <a href="https://cloudinary.com/" target="_blank">Cloudinary</a> and sign in.
2. Once signed in, you will be navigate to the Dashboard.
3. In the Dashboard section, will find **Cloud Name** section. Copy the name of the **Cloud Name** and place it into your **REACT_APP_CLOUDINARY_CLOUD_NAME**
4. ![Screenshot 2023-08-13 120838](https://github.com/huyh1010/HomeTech-Space/assets/117617750/1df32fef-5124-4195-b31d-af73fb98a668)
   ex:
   ex:

```javascript
REACT_APP_CLOUDINARY_CLOUD_NAME = "colbyfree";
```

2. Select **Setting** > **Upload**, and then scroll to the Upload presets section.
3. Create a new upload preset by clicking **Add upload preset** at the bottom of the upload preset list.
4. Once finished, copy the name of the "upload" preset and place it into your **REACT_APP_CLOUDINARY_UPLOAD_PRESET** variable
   ![Screenshot 2023-08-13 120424](https://github.com/huyh1010/HomeTech-Space/assets/117617750/f5ac315e-e6d7-45b6-9346-ab4eb82e664e)
   ex:

```javascript
REACT_APP_CLOUDINARY_UPLOAD_PRESET = "ml_default";
```

Run the project:

```javascript
$ npm start
```


### UI Display:

- Login Page
- User's homepage
- other user's homepage when clicked on their profile
- A friend list page comprised of the user's friends
- An incoming (sent by other users) and outgoing (sent by users) friend request.
- An "Add" Page where user can see a list of people who had registered for this app.
- A Setting page where user can update his/her personal information

### User:

- can post/delete his or her post
- can post/delete his or her commnet
- can update their personal information on the setting page (ex: profile picture, job title, social media links...etc )
- can send request to other user.
- can accept or decline friend reuqest from other user.
- can view other user's profile when clicked on their profile link.
