---
title: "Laravel Scout and Typesense Integration in Laradock"
metaTitle: "Setting up laravel scout with typesense"
metaDesc: "Developing your search application with Laravel Scout and Typesense"
socialImage: images/typesense.png
date: "26 Jun 2022"
tags:
  - PHP
  - Laravel
  - Typesense
  - Laradock
---

[Typesense](https://typesense.org/) offers a number of options to integrate with different tech stacks, and you may have noticed that both internal and external communities are working around the clock to make that a reality. Numerous use cases can also be found in your preferred language or framework of your choice. The integration of Typesense with Laradock and Laravel Scout will be covered in this particular article.

If you are reading this and still unfamiliar with Typesense, here’s a short intro:

> A modern, privacy-friendly and open source search engine built from the ground up using cutting-edge search algorithms, that take advantage of the latest advances in hardware capabilities.

You can find additional documentation and a proper guide on how to get started [here](https://typesense.org/docs/). Still unsure about Typesense against other search engines, find a detailed comparison [here](https://typesense.org/typesense-vs-algolia-vs-elasticsearch-vs-meilisearch/).

<br>

### Laradocks vs Laravel Scout

For the non-PHP devs, I’ll briefly explain what Laradock and Laravel scout is before I dive deeper.

> [Laradock](https://laradock.io/) is a PHP development environment for docker that comes with a pre-configured service for common services. You can find a long list of services that it supports, and you can have them turned on/off, or as many instances as you want.

[Laravel Scout](https://laravel.com/docs/9.x/scout) is a PHP library offering driver-based solutions to handle manipulation with the index data model by adding a full-text search for that model.

Laravel Scout supports MySQL and PostgreSQL databases and comes with Algolia or MeiliSearch. During development, a collection driver serves locally and does not require third-party integration or dependencies.

<br>

### Setting Up Typesense with Laravel Scout

Create a new PHP application by running one of the code commands mentioned below:

1. Using Composer create-project

`composer create-project laravel/laravel typesense-demo`

2. Using the Laravel Installer

`laravel new typesense-demo`

The above command creates a new Laravel project in your specified directory

To begin a new Laravel project, I'll use the command
`composer create-project`

![cli bootstrapping new project](https://aviyel.com/cdn-cgi/image/format=auto/assets/uploads/files/1658437990429-annotation-2022-07-21-213858-resized.png "command line interface installing new laravel project")

<br>

Installing Laravel scout with the composer command

`composer require laravel/scout`

![install laravel scout](https://aviyel.com/cdn-cgi/image/format=auto/assets/uploads/files/1658438101625-annotation-2022-07-21-214124-resized.png "composer command for laravel-scout")

Before installing the Typesense driver, install the correct HTTP plug adapter based on the `guzzlehttp/guzzle` version you have available on your system.

i.e if you are running on Laravel 8, the `guzzlehttp/guzzle` version will be version 7.

![install plug adapter](https://aviyel.com/cdn-cgi/image/format=auto/assets/uploads/files/1658438146599-annotation-2022-07-21-214253-resized.png "setup guzzlehttp/guzzle")

<br>

Typesense uses this HTTP plug to communicate with various PHP HTTP libraries through a single API.

Here’s the command

`composer require php-http/guzzle7-adapter`

Install the Typesense driver

`composer require typesense/laravel-scout-typesense-driver`

![typesense driver command](https://aviyel.com/cdn-cgi/image/format=auto/assets/uploads/files/1658438225848-annotation-2022-07-21-214400-resized.png "install typesense driver")

<br>

**Initiate the service provider**

```php
// config/app.php
'providers' => [
    // ...
    Typesense\LaravelTypesense\TypesenseServiceProvider::class,
],
```

<br>

Add Laravel scout as a provider to avoid the “unresolvable dependency error”.

```php
// config/app.php
'providers' => [
    // ...
    Laravel\Scout\ScoutServiceProvider::class,
],
```

Configure your environmental variables inside the .env file.

Add `SCOUT_DRIVER=typesense` to the .env file.

Publish your configuration for Laravel scout with the command

`php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"`

This command enables us to modify the created config/scout.php file and copy the configuration file in the application from the vendor package file in our case, the typesense-driver and all tags are published. Thus, any changes made to the code base will not be lost. The publish command also provides a few options that specifically assist in choosing which file should be published.

Add the following code within config/scout.php

```php
// add to config/scout.php

'typesense' => [
    'api_key'         => 'abcd',
    'nodes'           => [
      [
        'host'     => 'localhost',
        'port'     => '8108',
        'path'     => '',
        'protocol' => 'http',
      ],
    ],
    'nearest_node'    => [
        'host'     => 'localhost',
        'port'     => '8108',
        'path'     => '',
        'protocol' => 'http',
    ],
    'connection_timeout_seconds'   => 2,
    'healthcheck_interval_seconds' => 30,    
    'num_retries'                  => 3,
    'retry_interval_seconds'       => 1,
  ],
```

<br>

Now we have completely configured our Typesense integration with Laravel scout.

For the primary usage, see the following code below or you can consider checking the Laravel Scout documentation first.

Let’s add a searchable trait to the models you want to perform a search on. toSearchableArray method, in this case, defines the fields that the model should make a search on and implements `TypesenseSearch`.

```php
<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Typesense\LaravelTypesense\Interfaces\TypesenseDocument;
use Laravel\Scout\Searchable;

class Todo extends Model implements TypesenseDocument
{
    use Searchable;
      /**
     * Get the indexable data array for the model.
     * @return array
     */
    public function toSearchableArray()
    {
        return array_merge(
            $this->toArray(), 
            [
 // Cast id to string and turn created_at into an int32 timestamp
 // in order to maintain compatibility with the Typesense index definition below
                'id' => (string) $this->id,
                'created_at' => $this->created_at->timestamp,
            ]
        );
    }
     /**
     * The Typesense schema to be created.
     * @return array
     */
    public function getCollectionSchema(): array {
        return [
            'name' => $this->searchableAs(),
            'fields' => [
                [
                    'name' => 'id',
                    'type' => 'string',
                ],
                [
                    'name' => 'name',
                    'type' => 'string',
                ],
                [
                    'name' => 'created_at',
                    'type' => 'int64',
                ],
            ],
            'default_sorting_field' => 'created_at',
        ];
    }
     /**
     * The fields to be queried against. See https://typesense.org/docs/0.21.0/api/documents.html#search.
     * @return array
     */
    public function typesenseQueryBy(): array {
        return [
            'name',
        ];
    }    
}
```

<br>

**You can now sync your data with search services:**

``php artisan scout:import App\\Models\\Todo``

This command now allows you to get your model data synced with the search services, it also comes with automatic data syncing for any changes you make.

<br>

**Perform a search on your models with**

`Todo::search('Test')->get();`

<br>

**Add records via query**

```php
$todo = Todo::find(1);
$todo->searchable();
$todos = Todo::where('created_at', '<', now())->get();
$todos->searchable();
```

<br>

Again the `searchable()` method here groups the result of your query and then proceeds to add the records to your search index.

<br>

## Conclusion

Since Typesense offers out-of-box features with several language options for an open-source search engine compared to its competitors, it is worth looking into and stands out from the rest.

This proves a massive and active community behind it, continually building tools and integrations for software development.

**TL;DR**

1. [Typesense API reference](https://typesense.org/docs/): A helpful section that includes all the documentation details on all API endpoints available on Typesense and how you can use them.

2. [PHP - Typesense Search Application](https://aviyel.com/post/1325/getting-started-with-php-api-clients-on-typesense): Create a book search application with the typesense client

3. [Typesense](https://typesense.org/): Setup Typesense locally or with cloud

4. [Typesense Github](https://github.com/typesense/typesense): Source repo for Typesense on Github.

5. [Laradock installation](https://laradock.io/): Setting up Laradock with docker plus official documentation.

6. [Laravel scout](https://laravel.com/docs/9.x/scout): Official documentation for Laravel scout.

7. [Laravel-scout-typesense-driver](https://github.com/typesense/laravel-scout-typesense-driver): Github repo for Laravel scout Typesense driver.

8. [Laravel](https://laravel.com/docs/9.x): Getting started with Laravel.
