import express from 'express';

const router = express.Router();



const handle_error = res=> err => res.status(500).send(err)

export default (nats) => {


  router.route('/:tracker_id')
    .get((req, res) => {
      //get the published data
      nats.call('covid-store.get', {tracker_id: req.params.tracker_id})
      .then(reply => {
        res.send(reply.clone())
      }).catch(handle_error(res));
    })

    .put((req, res) => {
      //publish the key. and create the form
      nats.call('covid-tracker.create', {
        tracker_id: req.params.tracker_id,
        pub_key:req.body.pub_key
      },{$timeout:2000})
      .then(reply => {
        res.send(reply.clone())
      }).catch(handle_error(res));
    })





  return router;
}
