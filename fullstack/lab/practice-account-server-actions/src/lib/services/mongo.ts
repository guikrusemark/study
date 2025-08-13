import { MongoClient } from "mongodb";

const {
	MONGODB_USERNAME: user,
	MONGODB_PASSWORD: pwd,
	MONGODB_HOST: host = "localhost",
	MONGODB_PORT: port = "27017",
	MONGODB_DATABASE: dbName,
	MONGODB_AUTH_SOURCE: authSource = "admin",
} = process.env;

if (!user || !pwd || !dbName) {
	throw new Error(
		"Missing one of MONGODB_USERNAME, MONGODB_PASSWORD or MONGODB_DATABASE",
	);
}

const uri = `mongodb://${user}:${pwd}@${host}:${port}/${dbName}?authSource=${authSource}`;
const options = {};

declare global {
	// ensure we only ever create one client
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
if (!global._mongoClientPromise) {
	client = new MongoClient(uri, options);
	global._mongoClientPromise = client.connect();
}

// now safe to use
const clientPromise: Promise<MongoClient> = global._mongoClientPromise;

export default clientPromise;
