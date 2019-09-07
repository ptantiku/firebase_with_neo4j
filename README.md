# C-Goodies

1. Create a project on [Firebase console](https://console.firebase.google.com), allows hosting, function, firestore
2. Setup region of firestore at https://console.firebase.google.com/u/0/project/---PROJECT-NAME---/database/
3. Since the cloud function requires external requests, the project's billing must be enable at [Billing Page](https://console.cloud.google.com/billing/projects)

# setup project

```sh
npm install -g firebase-tools
add ~/.npm/bin to the PATH
mkdir c-goodies; cd c-goodies
firebase login
```

## first time setup

```sh
firebase init functions
firebase init hosting
firebase init firestore
```

## after clone

select the correct Google Firebase's project to bind with this code, and select alias (e.g. 'default', or 'production')

```sh
firebase use --add
```

# setup functions

```sh
cd functions
npm install
cd ..
```

# setup env variables:

```sh
firebase functions:config:set neo4j.uri='bolt://XXX.XXX.XXX.XXX:7687'
firebase functions:config:set neo4j.username=neo4j
firebase functions:config:set neo4j.password=XXXXXXXXXXXX
```

# test functions

1. `firebase serve --only hosting,functions`
2. open browser to http://localhost:5000

# deploy

- `firebase deploy`
- Or `firebase deploy --only functions`
