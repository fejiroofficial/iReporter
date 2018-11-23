# iReporter

[![Build Status](https://travis-ci.com/fejiroofficial/Fast-Food-Fast.svg?branch=build-version-one)](https://travis-ci.com/fejiroofficial/iReporter)
[![Coverage Status](https://coveralls.io/repos/github/fejiroofficial/iReporter/badge.svg?branch=build-version-one)](https://coveralls.io/github/fejiroofficial/iReporter?branch=build-version-one)
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


## Routes
* GET `api/v1/red-flags` Use this route to get a list of red-flag records.  
    Response spec:
    ```
    {
      "status" : Integer ,
      "data" : [ { ... }, {...}, {...} ]
    }
    ```
* GET `api/v1/red-flags/<red-flag-id>` Use this route to fetch a specific red-flag record.  
    Response spec:
    ```
    {
      "status" : Integer ,
      "data" : [ { ... } ]
    }
    ```
* POST `api/v1/red-flags` Create a red-flag record. The following fields are required:  
    Request body:
    ```
    {
      "createdBy": 1,
      "type": "red-flag",
      "location": "6.4828617, 3.1896830",
      "Images": ["www.image.com", "www.image.com"],
      "Videos": ["www.video.com", "www.video.com"],
      "comment": "Thugs are vandalizing crude oil pipes"
    }
    ```
* PATCH `/red-flags/<red-flag-id>/location` Edit the location of a specific red-flag record.  
    Request body:
    ```
    {
      "userId": 1,
      "location": "6.4828617, 3.1896830"
    }
    ```
* PATCH `/red-flags/<red-flag-id>/comment` Edit the comment of a specific red-flag record.  
    Request body:
    ```
    {
      "userId": 1,
      "comment": "Thugs are vandalizing crude oil pipes"
    }
    ```    
* DELETE `/red-flags/<red-flag-id>` Edit the comment of a specific red-flag record.  
    Request body:
    ```
    {
      "userId": 1,
    }
    ```    


Api is hosted [`here`]('not hosted yet')


## UI Templates

UI is hosted [`here`](not hosted yet)
