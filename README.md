# python-react
You need to have `docker` and `docker-compose` to launch the app.
There is a `Makefile` to shorten the command.

**Steps**
1) Run: `make up`
2) The web app is at: http://127.0.0.1:3000/

*May need to wait for some time (3 - 5 mins) to get all images, build containers, and compile the js files*

*If you see the file `main.js` is missing, try to `make down` and `make up` again*
1) `make down`
2) `make up`
