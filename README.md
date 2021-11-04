# My Awesome Movie Theater Discover!

This is a practical activity proposed by [Rockstar Coders](https://www.rockstarcoders.com) as a challenge in they selection process.

The challenge is create a simple page to browser through movies using themoviedb public api.

The tech stack premisses of this challenge are:

  * create-react-app
  * react 16.8

Any framework/libs of this techs are permitted.

I choose:

  * ChakraUI for react components;
  * axios for handling api requests;
  * typescript;

## How this works?
### App usage
1. User can see the most popular movies;
2. User can search for a particular movie;
3. User can filter results by rating;
4. User can se details of a movie by clicking on poster;

## TODO list
- [ ] Mobile/Responsive UI Version;

## Getting Started with this project
  To run this project, you need to clone this repo, install the dependencies and create a environment variable named REACT_APP_MOVIE_DB_API_KEY. Create your own API_KEY at: [TheMovieDb](https://developers.themoviedb.org/3/). 

  You can pass this env var using cli or creating a .env file on your project root folder.
  
  Pay attention Environment variables are embedded into the build, meaning anyone can
  view them by inspecting your app's files. This is usefull for dev projects only.

  After above steps, just exec yarn start.

```bash
$ git clone https://github.com/gabrielnogueira/my-awesome-movie-theater-discover
$ cd my-awesome-movie-theater-discover
$ yarn
$ set REACT_APP_MOVIE_DB_API_KEY=<your-api-key> && yarn start
```

Enjoy!