import express from 'express';

const router = express.Router();



const handle_error = err => res.status(500).send(err)

export default (nats) => {


  router.route('/test/:id').get((req, res) => {
    nats.call('food-store.get', { ID: "6158" })
      .then(reply => {
        console.log('hey');
        res.send(reply.clone())
      }).catch(err => res.status(500).send(err));
  })


  router.route('/:tracker_id')
    .get((req, res) => {
      //get the published data
      nats.call('covid-store.get', {tracker_id: req.params.tracker_id})
      .then(reply => {
        res.send(reply.clone())
      }).catch(handle_error);
    })

    .put((req, res) => {
      //publish the key. and create the form
      nats.call('covid-tracker.create', {tracker_id: req.params.tracker_id,pubKey:req.body.pubKey})
      .then(reply => {
        res.send(reply.clone())
      }).catch(handle_error);
    })





  return router;
}
