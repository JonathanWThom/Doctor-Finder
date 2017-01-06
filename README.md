# _Dr. Nick's Doctor Finder_

#### _Web application that allows users to search for doctors in the Portland area. 1.6.16_

#### By _**Jonathan Thom**_

## Description

_Users can enter search parameters such as doctor specialty, name, and ailment and be returned a list of doctors in the Portland area. Makes use of the [Better Doctor API](https://developer.betterdoctor.com/)._

## Setup/Installation Requirements

* _In the command line, run:_
```
git clone https://github.com/JonathanWThom/Doctor-Finder
cd Doctor-Finder
npm install
bower install
touch .env
```
### _Create API Key_
* Create an account at: https://developer.betterdoctor.com/
* Copy your API KEY into the .env file in the following format:
```
exports.apiKey = "YOUR-API-KEY";
```

* _Then, in the command line:_
```
gulp serve
```

* Navigate to localhost:3000 if not immediately taken there.

## Specifications
1. User can enter name, ailment, and specialty parameters and be returned a list of doctors.

2. The application will show an error message if no parameters are filled in, or there are no doctors that meet the search criteria.

## Support and Contact Details

_Contact Jonathan at: jonathan.thom1990@gmail.com_

## Technologies Used

_JavaScript (NodeJS, Gulp, Bower), SASS, HTML_

### License

*MIT*

Copyright (c) 2016 **_Jonathan Thom_**
