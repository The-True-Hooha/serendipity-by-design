---
title: "How Typesense Creates Data Backup"
metaTitle: "How Typesense Creates Data Backup"
metaDesc: "Data Backup process with Typesense "
socialImage: images/typesense.png
date: "19 May 2022"
tags:
  - Typesense
  - Javascript
  - Node.js
  - Backup
  - Data
  - NPM
  - Express.js
  - search engine
---


### Introduction

In software development, creating data backups is an important and safe practice in the software development cycle process. The data is typically stored on the same device or cloud storage. This system approach is used in the software process to restore the system or data in a particular directory at a specific time to any previous state of the system.

Typsense creates data backup by means of snapshots that can be implemented with a single API call. Cluster operations can be utilized for these backup processes. Snapshot backups define where and how your data is stored, or organized. cluster backups can be created from snapshots from a Typesense node state and the data in the specified directory can be really efficient for rapid recovery as a data directory when it is needed.

### Why backup is needed

With a wide variety of methods or programs that offer support for data backup, let’s cover in a few lines why data backup is essential for developer teams.

1. Protect important data from loss in the occurrence of a data breach, or physical disaster.

2. Improve software development cycle as data can be recovered from different individual team members when needed.

3. Increase software team security from loss of data due to data breach.

4. Quickly backup and restore data/system in different cycle states.

5. But before we execute any backup operations, let's first create our Typesense server step by step and then demonstrate how to perform a backup using javascript.


**Starting up Typesense Server**

Let's get started by starting our Typesense server indexing dummy content/data for demo purposes only. We must first set up and start our Typesense server before we can begin creating our Typesense index. Let's make a script/ command to configure our docker image and run the docker container that will basically bind and connect to where we'll be keeping the data.

Let's start by making a new script. So create an empty project directory and a scripts folder inside it, because we'll have a few scripts loaded in here that will allow us to index the data and start the typesense server, or the docker container, but first we need to set up and initialized our npm and install a few dependencies.


**Initializing npm**

```npm init -y```

![image](https://aviyel.com/cdn-cgi/image/format=auto/assets/uploads/files/1652958590738-image.png)


Once you've initialized npm, it's time to install and update some packages. For now, we'll add the Typesense package only.

```npm i typesense```


![response image](https://aviyel.com/cdn-cgi/image/format=auto/assets/uploads/files/1652959232039-image.png)


Your package file should look like this once you install the typesense package.

```json
{
  "name": "typesense-databackup",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "typesense": "^1.2.2"
  }
}
```


**Setting up Server run script**

Inside the scripts folder, make a new file called `runServer.js`. Despite the fact that this script would just run the docker command, we must first configure it. The folder structure should look like this.

![runServer.js](https://aviyel.com/cdn-cgi/image/format=auto/assets/uploads/files/1652959629623-image.png)


The very first step is to use the node.js child process library to run and import exec commands.

```js
//scripts/runServer.js
const { exec } = require("child_process");
```

Let's use our own script command to start our typesense server. To start the docker in the background, we'll use the "docker -run" and "docker detach" commands, and then provide the port we want it to utilize. The volume section is the most crucial part of this command; we're binding the volume, which is essentially a mechanism of saving the typesense's data, which is usually saved inside the container. As a result, typesense will save the data in the container's `/data` folder, then expose and connect that folder to the system location we designate.

Following that, we'll specify the image we want to run inside our docker container, then the data directory and the api key, which you can fill with whatever you want, and then configure listen port, and finally enable cors to avoid any CORS related issues.


```js
const command = `docker run -d -p 8108:8108 -v/tmp/typesense-server-data/:/data \ typesense/typesense:0.22.2 --data-dir /data --api-key=typesenseDatabackup --listen-port 8108 --enable-cors`;
```

Finally, run the program and include an error handler in case anything goes wrong. Hence, your `runServer.js` code should look like this:


```js
// scripts/runServer.js
const { exec } = require("child_process");
const command = `docker run -d -p 8108:8108 -v/tmp/typesense-server-data/:/data \ typesense/typesense:0.22.2 --data-dir /data --api-key=typesenseDatabackup --listen-port 8108 --enable-cors`;
exec(command, (err) => {
  if (!err) console.log("Typesense Server is running...");
  if (err) {
    console.log("Error running server: ", err);
  }
});
```

Now that we have our `runServer.js` script ready to go, we can simply update the script tag in our `package.json` file. So that whenever you want to start the server, you simply open a command prompt and run the npm command to fire up  the entire script.

```js
"start": "node scripts/runServer.js"
```

Your ``package.json`` file should look like this after you've configured the script tag.

```js
  {
  "name": "typesense-databackup",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node scripts/runServer.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "typesense": "^1.2.2"
  }
}
```

Finally, type `npm run start` to start the server, which will start your docker, allowing you to move on to the next stage of indexing the data/collection.


**Note: Before you even run this script make sure your docker desktop is up and running.**


The next step is to actually populate or index the data inside the typesense server, so now that we have the server up and running, we'll be populating a simple dummy dataset inside the typesense server so that we can query it and conduct a backup later on. So let's get to work on the data-import script. We'll begin by creating an dataIndexer.js file in the scripts folder we previously built. Once you do that your folder structure should resemble something like this.

![folder structure](https://aviyel.com/cdn-cgi/image/format=auto/assets/uploads/files/1652962030305-image.png)


Indexing data on typesense: a step-by-step guide

We must first add and import the Typesense library to our project.

```js
// dataIndexer.js
const Typesense = require("typesense");
```

Let's construct a self-executing function that will execute every time the script is invoked, and make it asynchronous so we can leverage the async await functionality. Simply create `module.export` and export the self-executing function inside it as asynchronous so that we can write a script that reads the data and collects it, manages the typesense server, and indexes it. So, first and foremost, we must set up the typesense client in order to connect to the server and begin managing, indexing, and retrieving data. Create a typesense config variable and pass the properties of the node to it.

so this specific nodes is actually an array that holds the actual configuration for each server that you  want to connect into and that you want the client to access, so currently, we only have one server running so we are going to utilize only one nodes. Next, inside the nodes array, supply the host, typesense port, and protocol it uses, as well as the API key.


```js
// dataIndexer.js
const Typesense = require("typesense");

module.exports = (async () => {
 const TYPESENSE_CONFIG = {
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
    apiKey: "typesenseDatabackup",
  };
})();
```

Let’s utilize the typesense configuration to make a Typesense client.

```js
// dataIndexer.js
const Typesense = require("typesense");
module.exports = (async () => {
  const TYPESENSE_CONFIG = {
    nodes: [
     {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
    apiKey: "typesenseDatabackup",
  };
  console.log("Config: ", TYPESENSE_CONFIG);
  const typesense = new Typesense.Client(TYPESENSE_CONFIG);
})();
```

This is an important stage because it is here that we offer the schema that will be used to index our data into the actual typesense database, therefore schema is very important. It has a simple syntax and is easy to work with. Schema is essentially a description of how your data will be saved. We have a title, synopsis, genre, and popularity for our schema. So you only want to put the fields you want to index in schema. Begin by naming the schema and ensuring that the number of documents is zero.

Next, supply the name, type, and facet for the fields, which will be an array of objects containing every single field that we want to index and save in our database. If you're wondering what a facet is, it's a feature that allows you to create categories based on a subset of qualities so that users may refine their search results. This is the way your schema should appear.

```js
// dataIndexer.js
const Typesense = require("typesense");

module.exports = (async () => {
  const TYPESENSE_CONFIG = {
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
    apiKey: "typesenseDatabackup",
  };

  console.log("Config: ", TYPESENSE_CONFIG);

  const typesense = new Typesense.Client(TYPESENSE_CONFIG);

  const schema = {
    name: "dummyData",
    num_documents: 0,
    fields: [
      {
        name: "title",
        type: "string",
        facet: false,
      },
      {
        name: "synopsis",
        type: "string",
        facet: false,
      },
      {
        name: "genre",
        type: "auto",
        facet: true,
      },
      {
        name: "popularity",
        type: "float",
        facet: true,
      },
    ],
    default_sorting_field: "popularity",
  };
})();
```

So, if you want to index all of the data in the array of genres, for example, you’ll need to store each level of the array in their specific/own field.

Now let's read the movies from the JSON files and import the dataset. It's time to launch the Typesense client and connect to a schema within it.

```js
// dataIndexer.js
const Typesense = require("typesense");

module.exports = (async () => {
  const TYPESENSE_CONFIG = {
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
    apiKey: "typesenseDatabackup",
  };

  console.log("Config: ", TYPESENSE_CONFIG);

  const typesense = new Typesense.Client(TYPESENSE_CONFIG);

  const schema = {
    name: "dummyData",
    num_documents: 0,
    fields: [
      {
        name: "title",
        type: "string",
        facet: false,
      },
      {
        name: "synopsis",
        type: "string",
        facet: false,
      },
      {
        name: "genre",
        type: "auto",
        facet: true,
      },
      {
        name: "popularity",
        type: "float",
        facet: true,
      },
    ],
    default_sorting_field: "popularity",
  };

  const dummyDataSet = require("../dataset/dummyData.json");

  try {
    const collection = await typesense.collections("dummyData").retrieve();
    console.log("Found existing collection of dummy Data");
    console.log(JSON.stringify(collection, null, 2));
  } catch (err) {
    console.error(err);
  }
})();
```

If a data duplication issue arises during loading the data, simply add the following bit of code to the dataIndexer.js file before constructing the schema since it will simply remove the existing data and replace it with the new ones.

```js
 if (collection.num_documents !== dummyDataSet.length) {
      console.log("Collection has diff number of docs than data");
      console.log("Deleting collection");
      await typesense.collections("dummyData").delete();
  }
```

The final step is to create a dummyData collection. A Collection in Typesense is a group of connected Documents that works like a table in a relational database. When we establish a collection, we give it a name and explain the fields that will be indexed when a document is added to it.

Your final code inside dataIndexer.js the file should look like this.


```js
// dataIndexer.js
const Typesense = require("typesense");

module.exports = (async () => {
  const TYPESENSE_CONFIG = {
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
    apiKey: "typesenseDatabackup",
  };

  console.log("Config: ", TYPESENSE_CONFIG);

  const typesense = new Typesense.Client(TYPESENSE_CONFIG);

  const schema = {
    name: "dummyData",
    num_documents: 0,
    fields: [
      {
        name: "title",
        type: "string",
        facet: false,
      },
      {
        name: "synopsis",
        type: "string",
        facet: false,
      },
      {
        name: "genre",
        type: "auto",
        facet: true,
      },
      {
        name: "popularity",
        type: "float",
        facet: true,
      },
    ],
    default_sorting_field: "popularity",
  };

  const dummyDataSet = require("../dataset/dummyData.json");

  try {
    const collection = await typesense.collections("dummyData").retrieve();
    console.log("Found existing collection of dummy Data");
    console.log(JSON.stringify(collection, null, 2));

    if (collection.num_documents !== dummyDataSet.length) {
      console.log("Collection has diff number of docs than data");
      console.log("Deleting collection");
      await typesense.collections("dummyData").delete();
    }
  } catch (err) {
    console.error(err);
  }

  console.log("Creating schema...");
  console.log(JSON.stringify(schema, null, 2));

  await typesense.collections().create(schema);

  console.log("Populating collection data...");

  try {
    const returnData = await typesense
      .collections("dummyData")
      .documents()
      .import(dummyDataSet);

    console.log("Return data: ", returnData);
  } catch (err) {
    console.error(err);
  }
})();
```


We can simply update the script tag in our `package.json` file now that our `dataIndexer.js` script is ready to use.

Finally, your `package.json` file should look like this once you’ve updated the script.


```js
//package.json
{
  "name": "typesense-databackup",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node scripts/runServer.js",
    "indexer": "node scripts/dataIndexer.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "typesense": "^1.2.2"
  }
}
```

Finally, start indexing the data in typesense server by entering the following command, and your data will begin to populate within the typesense server; however, make sure your dataset is ready before you do so. your folder structure should look something like this.

![folder structure](https://aviyel.com/cdn-cgi/image/format=auto/assets/uploads/files/1652967312217-image.png)


```
npm run indexer
```

![image results](https://aviyel.com/cdn-cgi/image/format=auto/assets/uploads/files/1652967561798-image-resized.png)


Now that we've loaded our Typesense server with data, we can use it to execute data backup.


### How Typesnse backups works

When performing multiple snapshot backups, logs are registered thereby allowing in real-time, the data saved to be recalled and backed for recovery. This process offers simple and quick access to your data with real-time responses affirming your backed-up data.

Faster transfers of snapshot data can be transferred or copied into multi-regional clusters.

### How to create a snapshot for backup

Create and back up a snapshot file, that can be restored as a data directory.

Now that our Typesense server is up and running and we've indexed our data, it's time to create a data backup. To do so, all you have to do is perform a snapshot operation with Typesense, which is only one line of code, so let's get started with an example. For this example, we'll use javascript, but note that you can perform this operation in a variety of programming stacks, as shown in the documentation.

To begin, go to your script directory and create a file called `databackup.js`. Once you've done that, your folder structure should resemble like this.

![folder structure](https://aviyel.com/cdn-cgi/image/format=auto/assets/uploads/files/1652968120480-image.png)


We'll write practically identical code within it, so first we'll create a typesense connection to the server, then we'll use the typesense settings to construct a Typesense client, and finally we'll produce a snapshot and save it in the temporary directory path.

This is how your javascript code should look to perform a snapshot in Typesense.


```js
Client.operations.perform('snapshot', {'snapshot_path': '/tmp/typesense-data-snapshot'})
```

Your final code should look somewhat like this once you've configured your snapshot to your `dataBackup.js` file.


```js
const Typesense = require("typesense");

module.exports = (async () => {
  const TYPESENSE_CONFIG = {
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
    apiKey: "typesenseDatabackup",
  };

  const typesense = new Typesense.Client(TYPESENSE_CONFIG);

  const backupData = await typesense.operations.perform('snapshot', {'snapshot_path': '/tmp/typesense-data-snapshot'})

  console.log(JSON.stringify(backupData, null, 2));

})();
```


Once you've finished with the code, make a separate script to run our command. When you're finished, your package.js file should look like this.

```js
{
  "name": "typesense-databackup",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node scripts/runServer.js",
    "indexer": "node scripts/dataIndexer.js",
    "backup": "node scripts/dataBackup.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "typesense": "^1.2.2"
  }
}
```

Finally, start your data backup snapshot operation in typesense by entering the following command in your terminal.
```
npm run backup
```

You should receive the following response after running the command above.

```json
{
  "success": true
}
```

Boom! Our data backup was successful, as you can see in the screenshot below.

![image screenshot](https://aviyel.com/cdn-cgi/image/format=auto/assets/uploads/files/1652968028545-image.png)


This was a JavaScript example, but below is a list of backup operations you can try out with various programming language stacks, so give it a shot and see how easy it is to do data backup snapshot operations in Typesense.


```java
HashMap<String, String> query = new HashMap<>();
query.put("snapshot_path","/tmp/typesense-data-snapshot");

client.operations.perform("snapshot",query);
```

```python
client.operations.perform('snapshot', {'snapshot_path': '/tmp/typesense-data-snapshot'})
```

```php
$client->operations->perform("snapshot", ["snapshot_path" => "/tmp/typesense-data-snapshot"]);
```


**A JSON response is returned upon successful creation**


PS: `snapshot_path` indicates the working directory on the Typesense server where the snapshot should be saved and is required for every data backup operation.

To restore your previous backups, start Typesense on a single node cluster, using the data directory backed up to set the lead node. Subsequently, you can add follower nodes by updating the nodes file.


### Conclusion

One cool feature about snapshots is that they can be created in a matter of seconds and as often as is needed, as a consistent process during the software development cycle. In this post, we have talked about why data backups are important, how Typesense backups works, and how to create your own snapshot backup.

On a good note, Typsense has a robust list of [API resources](https://typesense.org/docs/0.22.2/api/#what-s-new) for your support, plus other [official documentation](https://typesense.org/docs/guide/) that you will find useful.

Interested in contributing to open-source, find other open-source projects [here](https://aviyel.com/projects), or [register](https://t.co/yhC2gYQ1r7) to start your first contributor journey.

Find out more about [Aviyel](https://aviyel.com/about), a community-driven monetization platform for your open source projects.


### TL;DR

1. [Cluster operations](https://typesense.org/docs/0.22.2/api/cluster-operations.html#create-snapshot-for-backups)

2. [Typesense GitHub](https://github.com/typesense/typesense)

3. [Download Typesense](https://typesense.org/downloads/)

4. [Typesense guide](https://typesense.org/docs/guide/)