# Buzz Forums

Welcome to [Buzz Forums](https://buzz-forums.vercel.app), the ultimate destination for engaging discussions and vibrant communities. Connect, share, and explore with users from around the world.

## Live Preview

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fbuzz-forums.vercel.app%2F)](https://buzz-forums.vercel.app/)

You can visit our live site at [Buzz Forums](https://buzz-forums.vercel.app/).

## Sample Credentials

```
Admin Email = admin@admin.admin
Admin Password = Admin123
```

## Backend Repo
 - [Backend](https://github.com/zahidtdx61/burr-forums-server)


## Features

### User Features

- **Post Creation:** Users can create new posts on various topics.
- **Commenting:** Engage in discussions by commenting on posts.
- **Upvote/Downvote:** Express your opinion by upvoting or downvoting posts and comments.
- **Reporting:** Report inappropriate comments to keep the community safe.
- **Personal Post List:** View a list of all your posts in one place.
- **Gold Membership:** Purchase a gold membership subscription to unlock special benefits.

### Admin Features

- **User Management:** Admins can manage users, including making users admins and handling reported comments.
- **Delete Comments:** Admins can delete comments that have been reported.
- **Announcements:** Admins can make announcements to the community.
- **Site Statistics:** Admins can view site statistics as graphs.

## Installation

To run the website locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/zahidtdx61/buzz-forums-client.git
   ```
2. Navigate to the project directory:
   ```sh
   cd buzz-forums-client
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Make an .env file and add these credentials:

   ```env
   VITE_apiKey=<get_this_from_firebase>
   VITE_authDomain=<get_this_from_firebase>
   VITE_projectId=<get_this_from_firebase>
   VITE_storageBucket=<get_this_from_firebase>
   VITE_messagingSenderId=<get_this_from_firebase>
   VITE_appId=<get_this_from_firebase>
   VITE_IMGBB_API_KEY=<get_this_from_imgbb>
   VITE_STRIPE_PUBLISHABLE_KEY=<get_this_from_stripe>
   VITE_API_URL=<add_you_backend_api_address>
   ```

5. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

Visit [Buzz Forums](https://buzz-forums.vercel.app) to start exploring. Register for an account or log in to access all features.

### User Guide

- **Creating a Post:** Click on the "New Post" button, fill in the required details, and submit your post.
- **Commenting:** Navigate to a post you’re interested in, and add your comment in the comment section.
- **Upvoting/Downvoting:** Use the upvote and downvote buttons to express your views on posts and comments.
- **Reporting Comments:** Click the report button on any comment you find inappropriate.
- **Gold Membership:** Visit the subscription page to purchase a gold membership and enjoy exclusive benefits.
- **Viewing Your Posts:** Access your profile and view the list of all your posts.

### Admin Guide

- **Managing Users:** Access the admin panel to manage user roles and permissions.
- **Handling Reported Comments:** Review and delete comments that have been reported by users.
- **Making Announcements:** Use the announcement feature to communicate important information to the community.
- **Viewing Site Statistics:** Navigate to the statistics section in the admin panel to view site stats as graphs.

## Technologies Used

#### Frontend

- **React**: Frontend development framework for building user interfaces.
- **React Router**: For declarative routing within the React application.
- **React DOM**: Enables rendering of React components in the DOM.
- **Material-UI (MUI)**: React UI framework for implementing Material Design components.
- **@mui/joy**: MUI's Joy component library.
- **Firebase**: Backend-as-a-Service platform for hosting and managing application data and authentication.
- **Axios**: HTTP client for making API requests.
- **Tankstack Query**: Library for managing state and data fetching in React applications.

#### NPM Packages Used

- **`@mui/material`**: Material-UI's core components.
- **`@mui/joy`**: MUI's Joy component library.
- **`react-router-dom`**: Library for declarative routing within the React application.
- **`react-hook-form`**: Library for building forms in React with easy form validation.
- **`@tanstack/react-query`**: Library for managing state and data fetching in React applications.
- **`axios`**: HTTP client for making API requests.
- **`swiper`**: Modern touch slider library for building interactive carousels and sliders.
- **`react-datepicker`**: Customizable date picker component for React.
- **`useAsyncEffect`**: Custom hook for handling asynchronous effects in React components.
- **`lottie-react`**: Used for rendering Lottie animations in React components.
- **`react-icons`**: Library for popular icon packs as React components.
- **`react-helmet-async`**: Library for managing document head contents in React applications.
- **`react-hot-toast`**: Toast notifications library for React applications.
- **`react-tooltip`**: Library for creating tooltips in React components.
- **`prop-types`**: Runtime type checking for React props and similar objects.
- **`eslint`**: Pluggable JavaScript linter.
- **`tailwindcss`**: Utility-first CSS framework.
- **`postcss`**: Tool for transforming CSS with JavaScript.
- **`autoprefixer`**: PostCSS plugin to parse CSS and add vendor prefixes.
- **`vite`**: Next generation frontend tooling.

## Contribution

We welcome contributions from the community to enhance and improve Buzz Forums.
