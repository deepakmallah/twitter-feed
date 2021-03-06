/**
 * Created by deepak on 21/11/17.
 */
import request from 'superagent';
const API_SEVER = window.location.origin;

export function getTweets(options) {
  return new Promise((resolve, reject) => {
    var query = "";
    if(options && options.max_id) query = `max_id=${options.max_id}`;
    if(options && options.count) query += `&count=${options.count}`;

    request
      .get( `${API_SEVER}/api/tweets/${options.uid}?${query}` )
      .set( 'Accept', 'application/json' )
      .then(response => {
        resolve(response);
      })
      .catch(error => reject(error));
  });
}

export function vote(options) {
  return new Promise((resolve, reject) => {

    if(!options.tid || !options.type) return reject("parameters missing.");

    request
      .get( `${API_SEVER}/api/vote/${options.tid}/${options.type}` )
      .set( 'Accept', 'application/json' )
      .then(response => {
        resolve(response);
      })
      .catch(error => reject(error));
  });
}
