# car-dealership
A management application for a car dealership company.

# Setup
Walkthrough video explaining the application: [youtube](https://www.youtube.com)

### inside `/server`
Run `npm install` to install all dependencies.<br>
Create and edit a `.env` file accordingly to the `.env.example` one.<br>
Run `npx prisma migrate reset` to setup the database.<br>
Addionally you can run `npx prisma studio` to open an overview of the database on your browser.<br>
Finally, run `npm run dev` to make the server go live.

### inside `/web`
Run `npm install` to install all dependencies.<br>
Run `npm run dev` to make your website go live.
