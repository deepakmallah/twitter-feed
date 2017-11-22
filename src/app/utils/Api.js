/**
 * Created by deepak on 21/11/17.
 */
import request from 'superagent';

export function getTweets(options) {
  return new Promise((resolve, reject) => {
    var query = "";
    if(options && options.max_id) query = `max_id=${options.max_id}`;
    request
      .get( `http://local.meaww.com:3000/tweets/985997336?${query}` )
      .set( 'Accept', 'application/json' )
      .then(response => {
        resolve(response);
      })
      .catch(error => reject(error));
  });
}
