
import {bootstrap} from '@geekagency/microservice-common-libs';

import service from './service'

bootstrap.natsMongoEntityFactory( (nats,plugin,mongo) => {


    service(nats,plugin,mongo);


});