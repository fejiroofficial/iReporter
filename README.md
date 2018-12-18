# iReporter

[![Build Status](https://travis-ci.com/fejiroofficial/Fast-Food-Fast.svg?branch=build-version-one)](https://travis-ci.com/fejiroofficial/iReporter)
[![Coverage Status](https://coveralls.io/repos/github/fejiroofficial/iReporter/badge.svg?branch=build-version-two)](https://coveralls.io/github/fejiroofficial/iReporter?branch=build-version-two)
[![Maintainability](https://api.codeclimate.com/v1/badges/3f81c01ebd0c36cbb3a7/maintainability)](https://codeclimate.com/github/fejiroofficial/iReporter/maintainability)

Corruption is a huge bane to Africa’s development. African countries must develop novel and localised solutions that will curb this menace, hence the birth of iReporter. iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention.


## Features
1. Users can create an account and log in.
2. Users can create a red-flag record (An incident linked to corruption).
3. Users can create intervention record (a call for a government agency to intervene e.g
repair bad road sections, collapsed bridges, flooding e.t.c).
4. Users can edit their red-flag or intervention records.
5. Users can delete their red-flag or intervention records.
6. Users can add geolocation (Lat Long Coordinates) to their red-flag or intervention
records .
7. Users can change the geolocation (Lat Long Coordinates) attached to their red-flag or
intervention records .
8. Admin can change the status of a record to either under investigation, rejected (in the
event of a false claim) or resolved (in the event that the claim has been investigated and
resolved) .   

## Technologies Used

* [NodeJS](https://nodejs.org/en/)
* [ExpressJs](https://expressjs.com/)


## Installation

Install [`node`](https://nodejs.org/en/download/), version 8 or greater

Clone the repo:
```sh
git clone https://github.com/fejroofficial/iReporter.git
```

Start server:
```sh
npm start
```

### Testing tools

- [Mocha](https://mochajs.org/) - A Javascript test framework.
- [Chai](http://chaijs.com) - A BDD / TDD Assertion library.
- [Istanbul](https://istanbul.js.org) - Javascript code coverage tool.
- [nyc](https://github.com/istanbuljs/nyc) - The Istanbul command line interface.

## :star: Documentation :star:

List of endpoints exposed by the service.
For full api documentation, visit [`docs`](https://ireporter-app.herokuapp.com/api-docs) 

## Endpoints
**Routes**
- POST `/api/v1/auth/signup` Use this route to create a new user account. The following fields are required:
    - `firstname` The firstname of the user
    - `lastname` The lastname of the user
    - `othernames` Any other name. _not compulsory_
    - `username` The username of the user
    - `email` The email of the user
    - `telephone` The telephone number of the user
    - `password` The user's password
  
- POST `/api/v1/auth/login` Use this route to create a new user account. The following fields are required:
    - `email` The email or username of the user
    - `password` The user's password 

- POST `/api/v1/red-flags` Use this route to create a new red-flag record. The following fields are required:
    - `type` The type of incident record
    - `latitude` The latitude coordinate
    - `longitude` The longitude coordinate.
    - `imageUrl` The image uploaded as evidence 
    - `comment` The comment to describe an incident

- POST `/api/v1/interventions` Use this route to create a new intervention record. The following fields are required:
    - `type` The type of incident record
    - `latitude` The latitude coordinate
    - `longitude` The longitude coordinate.
    - `imageUrl` The image uploaded as evidence 
    - `comment` The comment to describe an incident

- GET `api/v1/red-flags` Use this route to get a list of red-flag records.

- GET `api/v1/interventions` Use this route to get a list of intervention records.

- GET `api/v1/red-flags/<red-flag-id>` Use this route to fetch a specific red-flag record.

- GET `api/v1/interventions/<intervention-id>` Use this route to fetch a specific red-flag record.

- PATCH `/red-flags/<red-flag-id>/location` Edit the location of a specific red-flag record.
    - `location` The location of the red-flag incident
    
- PATCH `/interventions/<intervention-id>/location` Edit the location of a specific intervention record.
    - `location` The location of the intervention incident  
    
- PATCH `/red-flags/<red-flag-id>/comment` Edit the comment of a specific red-flag record.  
    - `comment` The comment of the red-flag incident  
    
- PATCH `/interventions/<intervention-id>/comment` Edit the comment of a specific intervention record.  
    - `comment` The comment of an intervention incident 
    
- DELETE `/red-flags/<red-flag-id>` Delete a specific red-flag record.

- DELETE `/interventions/<intervention-id>` Delete a specific red-flag record.

## API 
ApI for this app is available at [`iReporter`](https://ireporter-app.herokuapp.com/)

## UI Templates
The User interface template is available at [`iReporter`](https://fejiroofficial.github.io/iReporter/UI/index.html)
