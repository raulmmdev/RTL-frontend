This project is a test made for RTL where is done with all requirements, is responsive on small devices and it's done with the required technology.

# Technologies

- React (Required)
- Create React App (Required)
- React router (Required)
- Redux (Required)
- Sass (Required)
- Prettier (Extra)
- Typescript (Extra)
- Cypress (Extra)
- memoize-one (Extra)

# Design Pattern

For all my React projects I always follow the `Presentational and Container Components` pattern, you can read more [here](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

Is just create a container where all the logic is set like redux or own functions and then a component o presentational where import the view or sections

In this case I omitted the presentational and created partial views where there are imported inside container.

```
src
│   README.md
│
└───API
│      APIRequest.ts -> Object where contains all the API request
│
└───Components -> partial views
│       Bannercomponent
│       EpisodeDetail
│       ...
│
└───Pages -> where i load all containers components
│       │   HomePageContainer
│       │
│   	└───Types -> all the types that is used by the container
│          Homepage.types.ts
│          TVShow.types.ts
│
│
└───Redux -> all related with Redux
│       │
│   	└───Actions
│       │  	APIAction.ts
│       │
│   	└───reducers
│       │   APIReducer.ts
│       │   rootReducer.ts
│       │
│   	└───store
│          	Store.ts
│
└───router
│       Router.tsx
│
└───styles -> all sass files
```

# As the assignment says 3-4h the following list would be more improvements

- [ ] Function to validate errors on request and display error view
- [ ] Refactor code with react hooks
- [ ] Create a model for API request and safe only the necessary information on redux
- [ ] React Router (improve all the navegation as is the first time that I use it, my projects are on [nextjs](https://nextjs.org/))
- [ ] More unit test
