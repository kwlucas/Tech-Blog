# Tech-Blog
> Create, manage and share posts about any tech related topic.

[Deployed Application](https://sheltered-escarpment-82934.herokuapp.com/)
> Note: On November 28th, 2022, the Heroku free plans will be discontinued and the deployed application may no longer be available.

<div id="top"></div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#technologies-used">Technologies Used</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The blog site is a full-stack web application that allows users to create, share, and comment on posts.

<p align="right">(<a href="#top">back to top</a>)</p>

### Technologies Used

* [Node.js](https://nodejs.org/en/)
* [mySQL](https://mysql.com/)
* [Express.js](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)
* [Handlebars](https://handlebarsjs.com/)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)


<p align="right">(<a href="#top">back to top</a>)</p>

## Installation

0. Properly install and configure mySQL.
    See the [mySQL Installation Guide](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/) for installation help.
1. Clone the repo
   ```sh
   git clone https://github.com/kwlucas/Tech-Blog.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Create and configure a ".env" file as follows.
   ```js
   DB_NAME='blog_db'
   DB_USER='yourUserHere' //your SQL user (use 'root' if you are not sure of another user you can use)
   DB_PASSWORD='yourPasswordHere' //The password for your SQL user
   ```
3. Run NPM start in the console
    ```sh
    npm start
    ```
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Click on any of the posts to view its contents in full.

Login using the proper credentials for an account or sign up with a valid username and password to create a new account.

![Demo Gif](./public/images/TechBlogDemo1.gif)

Click on the "Create New Post" link at the bottom of any dashboard page to be brought to the post creation page.
Fill out the form with the title and contents of your post before hitting submit to share the post.

![Demo Gif](./public/images/TechBlogDemo2.gif)

While signed in and viewing a post in full you can create a comment by filling in the comment form and clicking the post button.

While on your dashboard page you will see a list of all the posts you have created.

Hovering over one of your posts will reveal the "Edit" and "Delete" buttons for that post.

Clicking the delete button will remove the post from the site.

Clicking on the edit button will bring you to a page where you can modify the title and contents of that post. After making whatever adjustments you see fit click the "Save" button to finalize the changes and update your post.

![Demo Gif](./public/images/TechBlogDemo3.gif)

While signed in, any comment you have made will have a delete button on the bottom right. Clicking on the delete button will remove the comment from the post. Note, this cannot be undone.


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contributors

* [Kyle Lucas](https://github.com/kwlucas)

Project link: [Repository](https://github.com/kwlucas/Tech-Blog)

Deployed Application: [Tech Blog](https://sheltered-escarpment-82934.herokuapp.com/)

> Note: On November 28th, 2022, the Heroku free plans will be discontinued and the deployed application may no longer be available.

<p align="right">(<a href="#top">back to top</a>)</p>
