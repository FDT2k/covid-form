


const DATABASE = process.env.MONGO_DATABASE;

const COLLECTION = process.env.COLLECTION;

const TOPIC = process.env.TOPIC || 'covid-store'


export default (broker, entity_plugin, mongo) => {

    console.log('ready',DATABASE,COLLECTION)
    let db = mongo.db(DATABASE);
    let collection = db.collection(COLLECTION);
    console.log('ready')

    let fns = entity_plugin(TOPIC, collection);
    console.log(fns)
    broker.subscribeAll(fns)
  
}