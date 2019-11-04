# Kalimba Libre

A WIP React Web App for creating Kalimba tablatures for free (see: _Libre_)
You can currently find the WIP app at https://kalimbalibre.now.sh/. At this time, it's not a completely finished site; don't be surprised if you suddenly find songs you've saved to be gone, as I'm semi-frequently resetting the database for testing.

You can still play around and save songs, just don't get too attached to what you make.
If you _really_ want to keep those songs, you can `Export to Txt` them and I'll have a function later to convert those text files back into editable tablatures. However, once I publish the site, that won't be a worry.

**If you find a bug, report it here!** There are probably a lot right now that I never encounter, so please let me know! That goes for suggestions, too.

## Development

### Setup

1. Clone the repository with
   `git clone https://github.com/oakleyaidan21/KalimbaLibre.git`

2. Run `npm install`

3. Run `npm start`

4. Uncomment the Nav.Link element in `LandingPage.js` that is titled "Dev". This will take you to a NewTab that cannot do anything related to the database, as your local copy of this repo will not be able to connect to it.

And you're done! The app will be running on `localhost:3000`. If by any chance npm yelled at you to install certain dependencies, do so.

#### Production Build

If you want to run the app as a production build (loading note sounds takes no time at all), use these commands:

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
- [ ] Move database to higher priority server
- [ ] Add functionality for copying a selection of notes
