import express from 'express';

const router = express.Router();



const handle_error = res=> err => res.status(500).send(err)


export default (nats) => {



  router.route('/:tracker_id')
    .get((req, res) => {
      //get the public key of the tracker
      nats.call('covid-tracker.get-public-key', {tracker_id: req.params.tracker_id})
      .then(reply => {
        res.send(reply.clone())
      }).catch(handle_error(res));
    })

    .put((req, res) => {
      //publish the key. and create the form

      const {cyphertext}  = req.body

      nats.call('covid-tracker.register', {tracker_id: req.params.tracker_id, data: cyphertext})
      .then(reply => {
        res.send(reply.clone())
      }).catch(handle_error(res));
    })





  return router;
}
