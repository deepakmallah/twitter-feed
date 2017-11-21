/**
 * Created by deepak on 21/11/17.
 */
import request from 'superagent';

export function getTweets() {
  return new Promise((resolve, reject) => {
    request
      .get( `http://local.meaww.com:3000/tweets/985997336` )
      .set( 'Accept', 'application/json' )
      .then(response => {
        resolve(response);
      })
      .catch(error => reject(error));
  });
}
