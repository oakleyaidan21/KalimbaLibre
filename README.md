# Kalimba Libre

A WIP React Web App for creating Kalimba tablatures for free (see: _Libre_)

Link for what I've created so far: http://kalimba-libre.herokuapp.com/.
If it takes a long time to load, it's because heroku has put it on low priority. It will take around ~30 seconds. **If you notice any bugs while using it, report them here!** Also, heroku seems to be building the development version of the app, so songs could play pretty slowly. If you really want smooth playing, you can download the code yourself and run it as a production build, which is detailed down below.

## Development

### Setup

1. Clone the repository with
   `git clone https://github.com/oakleyaidan21/KalimbaLibre.git`

2. Run `npm install`

3. Run `npm start`

And you're done! The app will be running on `localhost:3000`. If by any chance npm yelled at you to install certain dependencies, do so.

#### Production Build

If you want to run the app as a production build, use these commands:

1. `npm run build`
2. `serve -s build`

If it yells at you to install a dependency, do so.

## Current Look

Here's how the app looks at this stage in development:

![alt_text](./public/wipS2.png)

![alt_text](./public/wipS.PNG)

## TO-DO

- [ ] Add rest functionality (along with corresponding export handling)
- [ ] Add a savable description
- [ ] Add tied note functionality (along with corresponding export handling)

## CURRENT ISSUES

- Sometimes, units of rhythm different from a quarter note will seem longer or shorter than they should be, even though they are getting the correct amount of delay time
