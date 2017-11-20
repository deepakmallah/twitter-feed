'use strict';

const Promise = require("bluebird");
const request = require("request");
const token = "KFIMKJ3IIGGSXHEVAULZ";

module.exports = (req, res) => {
  var params = req.params;
  var venues = null;
  var eventsVenue = null;

  console.log("params", params);
  //
  // function getEvents() {
  //   return new Promise((resolve, reject) => {
  //
  //     var url = `https://www.eventbriteapi.com/v3/events/search?token=${token}&location.latitude=${params.lat}&location.longitude=${params.lon}`;
  //
  //     if(params.radius && params.radius !== "null"){
  //       url += `&location.within=${params.radius}km`;
  //     }
  //
  //     if(params.category && params.category !== "null"){
  //       url += `&categories=${params.category}`;
  //     }
  //
  //     request(url, function (error, response, body) {
  //       if(error) reject(error);
  //
  //       if (!error && response.statusCode == 200) {
  //         resolve(JSON.parse(body));
  //       }
  //     });
  //   })
  // }
  //
  // function getVenues(venue_id) {
  //   return new Promise((resolve, reject) => {
  //
  //     var url = `https://www.eventbriteapi.com/v3/venues/${venue_id}?token=${token}`;
  //     request(url, function (error, response, body) {
  //       if(error) reject(error);
  //
  //       if (!error && response.statusCode == 200) {
  //         venues[venue_id]["venue"] = JSON.parse(body);
  //
  //         resolve(venues[venue_id]);
  //       }
  //     });
  //   });
  // }
  //
  // getEvents()
  //   .then((resData) => {
  //     eventsVenue = resData;
  //     if(!resData.events.length) res.send({});
  //
  //     var tmp = {};
  //     var len = resData.events.length;
  //     for(var i = 0; i < len; i++){
  //       var event = resData.events[i];
  //       if(Object.keys(tmp).indexOf(event["venue_id"]) > -1){
  //         tmp[event["venue_id"]]["events"].push(event);
  //       }else{
  //         tmp[event["venue_id"]] = {events: []};
  //         tmp[event["venue_id"]]["events"].push(event);
  //       }
  //     }
  //     venues = tmp;
  //     return Promise.map(Object.keys(tmp), getVenues)
  //   })
  //   .then((data) => {
  //     eventsVenue.events = data;
  //     res.send(eventsVenue)
  //   })
  //   .catch((err) => {
  //     console.log("Error occured", err)
  //   });
};
