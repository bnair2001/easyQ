# easyQ
easyQ - A simple queue management application

### Description:
A simple queue management system for the modern age.
Most queue management systems work on assigning a number to each customer and would have to wait for his turn at the bank which usually ends up with high wait times and low customer satisfaction. easyQ aims to achieve that by having a queue system that works both in the bank and outside. 

### Installation:
Use normal react imstallation method using npm to test it.<br />
All the code is deployed on netlify.<br />
Links:<br />
* [Product-Page](http://easyq.rf.gd/)<br />
* [Client-app](https://client-2.netlify.com)<br />
* [Employee/agent-app](https://client-agent-2.netlify.com/)<br />
* The backend is deployed on heroku.

### Features:
* An intuitive interface with realtime updates to keep them posted about their position in the line.<br />
* An inbuilt mini-game to keep them entertained while they are waiting.<br />
* A chatbot is also added to the application to answer simple queries about the bank.<br />
* A user-friendly dashboard for the bank employees to control the queue.<br />
* A vibration based alert system when its the user's turn.<br />


### How it works:
A verification server is set up in the bank's network and so when the user leaves the bank the connection to the verification server is cut therefore the app knows if the user is present inside or outside the bank and if he is outside the bank when it's his turn, his ticket would be cancelled.
IMPORTANT NOTE: For the demo version we have set up a developer toolbar at the bottom of the app that allows you to simulate the verification server thereby helping you get a better feel of it. In the actual deployed version of the app, the verification server would be set up along with the captive portal in the bank's network and the toolbar will not be there.<br />
###### The backend part:
![The Backend part](https://i.imgur.com/6g2BwJ9.jpg)

### Credits:
[Steve Paul](https://github.com/ST2-EV),&nbsp; [Bharath Nair](https://github.com/bnair2001)
