
import {bootstrap} from '@geekagency/microservice-common-libs';

import service from './service'

bootstrap.natsFactory( (nats) => {


    service(nats);


});