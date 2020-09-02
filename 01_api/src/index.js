import express from 'express';
import { bootstrap } from '@geekagency/microservice-common-libs';

import RouteImport from 'route-food';
import bodyParser from 'body-parser';



bootstrap.natsFactory(nats => {
    const app = express();
    console.log('started')
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use((req,res,next)=>{
        console.log(req.url,req.method)
        next();
    });
    app.use(RouteImport(nats))



    app.listen(process.env.PORT||3000)


});





