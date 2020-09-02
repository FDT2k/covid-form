import express from 'express';
import { bootstrap } from '@geekagency/microservice-common-libs';

import RouteAdmin from 'route-covid-admin';
import RouteUser from 'route-covid-user';
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


    app.use('/admin',RouteAdmin(nats))
    app.use('/event',RouteUser(nats))



    app.listen(process.env.PORT||3000)


});





