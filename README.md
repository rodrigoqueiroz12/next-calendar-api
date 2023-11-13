<h3 align="center">Next.js Calendar API</h3>
<p align="center">The objective of this project is to provide a backend for the next-calendar</p>

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/rodrigoqueiroz12/nextjs-calendar-api.git
   ```
2. Install the packages
   ```sh
   npm install
   // or
   pnpm install
   ```
3. Run the knex migrations
   ```sh
   npm run knex migrate:latest
   // or
   pnpm run knex migrate:latest
   ````
4. Copy the `.env.example` content and paste in a `.env` file
5. Run the project
   ```sh
   npm run dev
   // or
   pnpm run dev
   ```

### The frontend for this project

[Click here](https://github.com/rodrigoqueiroz12/next-calendar) to visit the frontend repository

## The API

### `/events`

#### `GET /events`

Return a list of all events

#### `POST /events`

Create an event

```json
{
  "title": "New event test",
  "description": "a new description",
  "start": "2023-11-12T17:43:34.704Z",
  "end": "2023-11-12T17:43:34.704Z"
}
```

#### `PUT /events/:id`

Update an event

```json
{
  "title": "New event test updated",
  "description": "a new description updated",
  "start": "2023-11-12T17:43:34.704Z",
  "end": "2023-12-12T17:43:34.704Z"
}
```

#### `DELETE /events/:id`

Delete an event

## Contact

Rodrigo Queiroz - rodrigo.queiroz0629@gmail.com
