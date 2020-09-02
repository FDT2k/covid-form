import express from 'express';
import multer from 'multer';
import { ReadableStreamBuffer } from 'stream-buffers';
import { fromCodePoint } from 'core-js/fn/string';

const router = express.Router();
const upload = multer();
const { store } = require('@geekagency/metrics/store')
const averageMetric = require('@geekagency/metrics/averageMetric').default;
let streamMetrics = store();

let csv_mapping = [
  "ID", "IDV4", "SwissFIRID",
  "translation.0.name", "translation.0.synonym",
  "translation.1.name", "translation.1.synonym",
  "translation.2.name", "translation.2.synonym",
  "translation.3.name", "translation.3.synonym",
  "translation.0.category",
  "translation.1.category",
  "translation.2.category",
  "translation.3.category",
  "specific_gravity",
  "components.0.qty", "components.0.unit", "", "", "",
  "components.1.qty", "components.1.unit", "", "", "",
  "components.2.qty", "components.2.unit", "matrix unit", "value type", "source",
  "components.3.qty", "components.3.unit", "matrix unit", "value type", "source",
  "components.4.qty", "components.4.unit", "matrix unit", "value type", "source",
  "components.5.qty", "components.5.unit", "matrix unit", "value type", "source",
  "components.6.qty", "components.6.unit", "matrix unit", "value type", "source",
  "components.7.qty", "components.7.unit", "matrix unit", "value type", "source",
  "components.8.qty", "components.8.unit", "matrix unit", "value type", "source",
  "components.9.qty", "components.9.unit", "matrix unit", "value type", "source",
  "components.10.qty", "components.10.unit", "matrix unit", "value type", "source",
  "components.11.qty", "components.11.unit", "matrix unit", "value type", "source",
  "components.12.qty", "components.12.unit", "matrix unit", "value type", "source",
  "components.13.qty", "components.13.unit", "matrix unit", "value type", "source",
  "components.14.qty", "components.14.unit", "matrix unit", "value type", "source",
  "components.15.qty", "components.15.unit", "matrix unit", "value type", "source",
  "components.16.qty", "components.16.unit", "matrix unit", "value type", "source",
  "components.17.qty", "components.17.unit", "matrix unit", "value type", "source",
  "components.18.qty", "components.18.unit", "matrix unit", "value type", "source",
  "components.19.qty", "components.19.unit", "matrix unit", "value type", "source",
  "components.20.qty", "components.20.unit", "matrix unit", "value type", "source",
  "components.21.qty", "components.21.unit", "matrix unit", "value type", "source",
  "components.22.qty", "components.22.unit", "matrix unit", "value type", "source",
  "components.23.qty", "components.23.unit", "matrix unit", "value type", "source",
  "components.24.qty", "components.24.unit", "matrix unit", "value type", "source",
  "components.25.qty", "components.25.unit", "matrix unit", "value type", "source",
  "components.26.qty", "components.26.unit", "matrix unit", "value type", "source",
  "components.27.qty", "components.27.unit", "matrix unit", "value type", "source",
  "components.28.qty", "components.28.unit", "matrix unit", "value type", "source",
  "components.29.qty", "components.29.unit", "matrix unit", "value type", "source",
  "components.30.qty", "components.30.unit", "matrix unit", "value type", "source",
  "components.31.qty", "components.31.unit", "matrix unit", "value type", "source",
  "components.32.qty", "components.32.unit", "matrix unit", "value type", "source",
  "components.33.qty", "components.33.unit", "matrix unit", "value type", "source",
  "components.34.qty", "components.34.unit", "matrix unit", "value type", "source",
  "components.35.qty", "components.35.unit", "matrix unit", "value type", "source",
  "components.36.qty", "components.36.unit", "matrix unit", "value type", "source",
  "record has changed"];


let languages = ["german","french","italian","english"];

let components = [
  "energykjoule",
  "energykcal",
  "protein",
  "alcohol",
  "water",
  "carbohydrate",
  "starch",
  "sugar",
  "dietary_fibers",
  "fats_total",
  "cholesterol",
  "fatty_acids_monounsaturated",
  "fatty_acids_saturated",
  "fatty acids, polyunsaturated",
  "vitamin A activity",
  "all-trans retinol equivalents",
  "beta-carotene activity",
  "beta-carotene",
  "vitamin B1 (thiamine)",
  "vitamin B2 (riboflavin)",
  "vitamin B6 (pyridoxine)",
  "vitamin B12 (cobalamin)",
  "niacin",
  "folate",
  "pantothenic acid",
  "vitamin C (ascorbic acid)",
  "vitamin D (calciferol)",
  "vitamin E activity",
  "sodium",
  "potassium",
  "chloride",
  "calcium",
  "magnesium",
  "phosphorus",
  "iron",
  "iodide",
  "zinc",
	{
		"name":"pral_index",
		"source_unit":"mEq",
		"compute":" 0.49 * ((protein)) + 0.037 * ((phosphorus)) - 0.021 * ((potassium)) - 0.026 * ((magnesium)) - 0.013 * ((calcium))"
	}
];

export default (nats) => {
  let metricStore = store();
  let average = averageMetric().average;

  router.route('/test')

    .get((req, res) => {

      nats.call('food-store.list', { catalog: "branded_swiss" }, { limit: 200,$timeout:1000 })
        .then(reply => {
          console.log('hey');
          res.send(reply.clone())
        }).catch(err => res.status(500).send(err));
    })

    .post((req, res) => {

      nats.call('food-store.insert', { catalog: "branded_swiss" })
        .then(reply => {
          console.log('hey');
          res.send(reply.clone())
        }).catch(err => {
          res.status(500).send(err);
        });
    })
    .patch((req, res) => {

      nats.call('food-store.upsert', { filter: { ID: "555" }, data: { $set: { catalog: "branded_swiss" } } },{$timeout:1000})
        .then(reply => {
          console.log('hey');
          res.send(reply.clone())
        }).catch(err => {
          res.status(500).send(err);
        });
    })
    .put((req, res) => {

      nats.call('food-store.update', {
        filter: {
          ID: "6159"
        },
        data: { $set: { "PROUT": "9999" } }

      }, { $timeout: 1000 })
        .then(reply => {
          res.send(reply.clone())
        }).catch(err => {
          res.status(500).send(err.clone());
        });
    })
    .delete((req, res) => {

      nats.call('food-store.delete', {
        ID: "6159"

      }, { $timeout: 1000 })
        .then(reply => {
          res.send(reply.clone())
        }).catch(err => {
          res.status(500).send(err.clone());
        });
    })

  router.route('/test/:id').get((req, res) => {
    nats.call('food-store.get', { ID: "6158" })
      .then(reply => {
        console.log('hey');
        res.send(reply.clone())
      }).catch(err => res.status(500).send(err));
  })


  router.route('/search/:id').get((req, res) => {
    nats.call('food-store.search', { term: req.params.id })
      .then(reply => {
        console.log('hey');
        res.send(reply.clone())
      }).catch(err => res.status(500).send(err));
  })

  router.route('/insert').post((req, res) => {

    nats.call('food-store.insert', req.body)
      .then(reply => {
        res.send(reply.clone())
      }).catch(err => res.status(500).send(err));
  })

  router.route('/redux').post((req, res) => {

    nats.call('food.v5.test', req.body,{$timeout:1000})
      .then(reply => {
        res.send(reply.clone())
      }).catch(err => res.status(500).send(err));
  })


  router.route('/import')


    .post(upload.array('data'), function (req, res, next) {

      console.log(req.files);

      let stream = new ReadableStreamBuffer({
        frequency: 10,   // in milliseconds.
        chunkSize: 2048  // in bytes.
      });
      stream.put(req.files[0].buffer);
      stream.stop();


      nats.call('csv.parse', stream, { map: csv_mapping }).then(reply => {
        reply.payload.on('data', _ => {
          let o = JSON.parse(_.toString());
          console.log(Object.keys(o).length)
        })
        reply.payload.on('finish', data => {
          //let o = JSON.parse(data.toString());
          res.send('finish')
          // console.log(Object.keys(data).length)
        })

        //        res.send(reply)
      })

    });


  router.route('/import2')


    .post(upload.array('data'), function (req, res, next) {

      console.log(req.files);

      let stream = new ReadableStreamBuffer({
        frequency: 10,   // in milliseconds.
        chunkSize: 2048  // in bytes.
      });
      stream.put(req.files[0].buffer);
      stream.stop();

      //let str = nats.pipe(nats.pipe(stream, 'csv.parse', { map: csv_mapping }), 'csv.transform', {}, { objectMode: true });
      let str = nats.pipe('csv.parse', stream, { map: csv_mapping });
      str.on('data', data => {
        let o = JSON.parse(data.toString());
        console.log(Object.keys(o).length)
      })
      str.on('finish', data => {
        //let o = JSON.parse(data.toString());
        res.send('finish')
        // console.log(Object.keys(data).length)
      })

    });

  router.route('/import3')
    .post(upload.array('data'), function (req, res, next) {

      console.log(req.body);

      let stream = new ReadableStreamBuffer({
        frequency: 10,   // in milliseconds.
        chunkSize: 64 * 1024  // in bytes.
      });


      stream.put(req.files[0].buffer);
      stream.stop();

      //error on nats.pipe will be emitted on the source stream.
      stream.on('error', error => {
        res.status(500).send(error.clone())
      })

      const parse_csv_stream =  nats.pipe('csv.parse', stream, { map: csv_mapping, $timeout: 1000 });
      
      //switching from non-object-mode to object-mode is usually not safe but this is ok.
      const transform_csv_stream = nats.pipe('csv.transform', parse_csv_stream , {}, { objectMode: true });

      const str = nats.pipe('food.v5.transform', transform_csv_stream , {$timeout:1000,swiss_food_import:{languages,components}}, { objectMode: true });


      str.on('data', data => {
        average(metricStore);
        nats.call('food-store.upsert',{filter:{ID:data.ID},data:{$set:data}},{}).catch(console.error)
      })

      str.on('finish', data => {
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        res.send(`The script uses approximately ${Math.round(used * 100) / 100} MB`)
      })
     
    });


  return router;
}
