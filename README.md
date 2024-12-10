# Trivia Titans
Trivia Titans is a dynamic and interactive application developed using the powerful MERN stack (MongoDB, Express.js, React, Node.js). The app is designed to host a thrilling game of 21 questions, challenging players to test their knowledge across a variety of topics.

As a "Final Project: MERN Stack Single-Page Application," this project highlights both collaborative and technical expertise developed throughout the course. It showcases the ability to create a polished, application that is scalable and responsive while incorporating modern development practices.

The gameplay is intuitive and engaging, providing players with instant feedback and scoring as they navigate through diverse trivia categories. With a seamless user interface and robust backend, Trivia Titans is more than just a game—it's a testament to teamwork and cutting-edge technology.

## Technologies

Trivia Titans is built on a solid technological foundation, leveraging industry-standard tools and frameworks to deliver an exceptional experience. Here's what makes it work:

-React: Used to create a fast, dynamic, and interactive front-end experience.
-Node.js: Provides a high-performance server-side runtime environment.
-Express.js: A lightweight and efficient framework for building the backend API.
-MongoDB: A NoSQL database ensuring flexibility and scalability for storing user data and trivia content.
-Apollo Server: Facilitates seamless communication between the frontend and backend with GraphQL, enabling efficient queries and mutations.
Each of these technologies plays a vital role in building a cohesive, robust, and user-friendly application, ensuring players enjoy every aspect of their Trivia Titans experience.

## Installation

npm install 

## Usage

To start the application, run the following command:

-npm run build
-npm run start:dev

# Github Link

https://github.com/kyand38/Trivia-Titans.git

##  Deploy Link

## Link to the deployed application




##  screenshot

<p align="center">
  <img src="./assets/Start.png" alt="login" width="600"/>
</p>

<p align="center">
  <img src="./assets/Logged.png" alt="Book Save" width="600"/>
</p>


## Credits
Kyle Anderson - GitHub Username ----- kyand38 
Devan Ballantine - GitHub Username ----- MrBalld
Josh Askew - GitHub Username ----- JoshAskew
Trinidad Peterson - GitHub Username ----- Trinigch


## License
MIT License

Copyright (c) 2024 Kyle Anderson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Questions
 If you have any questions, feel free to contact us:

- GitHub: Trinigch
- GitHub: JoshAskew
- GitHub: MrBalld
- GitHub: kyand38



[![License Badge](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description
Triva Titans allows a user to test their triva knowledge in one of our three modes, 21 questions, infinte streak, 21 questions by category. The quizmania api is used to generate questions for the user. When the user is loged in they are able to edit their profile, access the contribute page, and view the leaderboard. JWT encryption is used to protect user passwords and to authenticate users on the database.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Github Link](#github-link)
- [screenshot](#screenshot)
- [3 Game Modes](#3-game-modes)
- [User Authentication and Data Security](#user-authentication-and-data-security)
- [Contributing](#contributing-and-Credits)
- [License](#license)
- [Tests](#tests)
- [Questions?](#questions)

## Features
Profile Editing
- Users can input changes to their profile such as changing their username and password.
Contribute forms
- Two forms on the contribute page to submit your own question with answers and to submit general feedback
3 game modes
- Users can select from 3 game modes 21 questions, streak, and 21 questions by catagory.
User Authentication and Security
- Secure login with JWT ensures user data privacy and personalized access to highscore.
Mobile and Desktop Responsiveness
- Designed for both mobile and desktop for a seamless user experience across devices.
Explanation of answers
- Users recieve an explanation of the answer regardless of whether they got the question right or wrong.

## Technologies Used
Frontend
- React: For building the interactive and responsive user interface.
Backend
- GraphQl and MongoDB for apis and DB managment.
- JWT (JSON Web Tokens): For secure user authentication.
- Apollo server
APIs
- Quizmania API: provides the questions, answers, and explanation.

## Installation

- git clone the repository
- npm/yarn i in the root directoty


## Usage
To use run
- npm/yarn run build in the root directoty
- npm/yarn run start:dev in the root directoty to launch in developer mode

# Github Link

https://github.com/kyand38/Trivia-Titans.git

##  screenshot

<p align="center">
  <img src="./assets/Start.png" alt="login" width="600"/>
</p>

<p align="center">
  <img src="./assets/Logged.png" alt="Book Save" width="600"/>
</p>

## 3 Game modes

As a user, I want to play a trivia game.

21 questions standard
- When the user is taken to the game page they see a button to gereate their first question.
- After answering a question the score is edited acording to if they got the question right.
- The game ends when 21 questions have been answered.

Streak mode
- The same rules as 21 question except the game ends when the user gets a question wrong.

21 questions by catagory
- the same rules as 21 questions standard but the user must interact with a modal to select a category for their trivia.

## User Authentication and Data Security
As a user, I want my personal information and highscore to be secure, so I can feel confident my data is protected.

JWT Authentication for Access Control
- Users are required to log in to access and modify their aurora log. The app uses JWT to verify authenticated sessions, ensuring only authorized users can access protected data.

Secure Environment Variable Management
- All API keys, JWT secrets, and sensitive information are stored securely in environment variables, keeping the app secure and safeguarding external API keys and user information.

Data Privacy Assurance
- User data is protected per best practices in data security, including the encryption of passwords and restriction of access to personal logs to authenticated sessions only.

## Contributing and Credits
[Trinigch](https://github.com/Trinigch)

[MrBalld](https://github.com/MrBalld)

[kyand38](https://github.com/kyand38)

[JoshAskew](https://github,com/JoshAskew)

Contributions are welcome! Feel free to open issues or submit pull requests to improve this project Feedback can also be given on the contribute page.

## License
This project is licensed under the MIT License.  
Copyright (c) 2024 Kyle Anderson and partners

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Questions?
 If you have any questions, feel free to contact us:

- GitHub: Trinigch
- GitHub: JoshAskew
- GitHub: MrBalld
- GitHub: kyand38