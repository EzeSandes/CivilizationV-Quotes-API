# Sid Meier's Civilization V - Quotes API

A REST API for quotes of Sid Meier’s Civilization V game.

I originally build this as a project to practice with MongoDB and NodeJS. I hope you will like it!

Please be free to comment or add any new feature. I thank you a lot if you help me to complete the database with the Great Works Quotes. Thanks for your time!

**Main Technologies implemented**

- NodeJS
- Express
- MongoDB
- Mongoose

## API Reference

- [Model](#model)
- [All Quotes](#all-quotes)
- [Technologies Quotes](#technologies-quotes)
- [Wonders Quotes](#wonders-quotes)
- [Great Works Quotes](#great-works-quotes)
- [Eras Quotes](#era-quotes)

## Model

Technologies, Wonders, and Great Works share the same next structure.

```
{
   _id: <String>

   // The quotation text
   quote: <String>

   // The name of the author
   author: <String>

   // Type of category quote and its name
   category: {
      type: <String>, // values: technology, wonder, great work
      name: <String>, // name of the wonder, technology or great work
   }

   // Expansion pack in which was added
   expansionAdded: <String> // values: Vanilla, Gods&Kings, Brave New World
}
```

**Example**

```
 {
    "quote": "Education is the best provision for old age.",

    "author": "Aristotle",

    "category": {
       "type": "technology",
       "name": "Education"
      },

    "expansionAdded": "Vanilla"
  },
```

---

## Query Structure

Important

- All authors name starts with Uppercase
- Expansions: Vanilla, Gods&Kings, Brave New World (All with Uppercase)
- Category.type: technology, wonder, great work (All with Lowercase)
- Category.name: Starts with Lowercase

<br>
<br>

**Special characters in queries**
| Character | Representation | Example |
| :---------- | :------------: | :----------------------------------------------: |
| Space (' ') | %20 | '/api/v1/all-quotes?author=Albert%20Einstein' |
| '&' | &26 | '/api/v1/all-quotes?expansionAdded=Gods%26Kings' |

<br>
<br>

**Query parameters**
| Param | Type | Description | Example | Returns |
| :---- | :--: | :---------: | :-----: | --- |
|fields | `String` | Returns quotes with only one or more specific fields plus the Id | `/api/v1/all-quotes?fields=quote,author` | `{ _id: <string>, quote: <string>, author: <string> }`|
|sort| `String` | Sort the results by the specific fields | `/api/v1/all-quotes?sort=category.name` | Returns an array of quotes sorted by the name of its category in DESC order by default(`sort=-category.name` == ASC order).|
|limit| `Int` | Sets the number of results per page. | `/api/v1/all-quotes?limit=5` | Returns the first 5 results |
|page | `Int` | The page of results to return | `/api/v1/all-quotes?page=2&limit=5` | Returns the 5 results from page 2|

<br>
<br>

**Two or more params**

FIELDS and SORT accepts more than one param, separated by comma:

fields: `?fields=quote,author`<br>
sort: `?sort=author,category.name`

<br>
<br>

---

## **All Quotes**

This route **only accept get, post, patch and delete with the three main categories: Technologies, Wonders, Great Works.** Era quotes has different model and most of them have more than one quote for each era.
If you want era quotes too, you must make another fetch.

### **Get All Quotes**

```HTML
GET /api/v1/all-quotes
```

Returns an array of all quotes in the three main categories (Technologies, Wonders, Great Works)

Response

```
"status": "success",
"results": <Int>, // Number of results in "quotes"
"data": {
   "quotes": [
      {
         "_id":  <string>,

         "author": <string>

         "quote": <string>,

         "category": {
               "type":  <string>
               "name":  <string>
            },

         "expansionAdded":  <string>,
      },
   ]
}
```

<br>
<br>

### **Get Quote**

```HTML
GET /api/v1/all-quotes/{quoteId}
```

Gets a specified quote from an Id.

Response

```
{
    "status": "success",
    "data": {
        "quote": {
            "_id": <string>,

            "quote": <string>,

            "author": <string>,

            "category": {
                "type": <string>,
                "name": <string>
            },

            "expansionAdded": <string>,
        }
    }
}
```

<br>
<br>

### **Create Quote**

```HTML
POST /api/v1/all-quotes
```

Creates a new quote from the body request

```
{
    "quote": <string>, // Required
    "author": <string>, // Required
    "category": {
        "type": <string>, // Required
        "name": <string> // Required
    },
    expansionAdded: <string> // Default: Vanilla
}
```

<br>
<br>

### **Update Quote**

```HTML
PATCH /api/v1/all-quotes/{quoteId}
```

Updates a specific quote from an Id

<br>
<br>

### **Delete Quote**

```HTML
DELETE /api/v1/all-quotes/{quoteId}
```

Deletes a specific quote from an Id
<br>
<br>

---

## **Technologies Quotes**

These routes allow working with only technologies quotes.

### **Get All Technologies Quotes**

```HTML
GET /api/v1/technologies
```

Response

```
"status": "success",
"results": <Int>, // Number of results in "quotes"
"data": {
   "quotes": [
      {
         "_id":  <string>,

         "author": <string>

         "quote": <string>,

         "category": {
               "type":  'technology'
               "name":  <string>
            },

         "expansionAdded":  <string>,
      },
   ]
}
```

<br>
<br>

### **Get Technology Quote**

```HTML
GET /api/v1/technologies/{technologyQuoteId}
```

Gets a specified technology quote from an Id.

Response

```
{
    "status": "success",
    "data": {
        "quote": {
            "_id": <string>,

            "quote": <string>,

            "author": <string>,

            "category": {
                "type": 'technology',
                "name": <string>
            },

            "expansionAdded": <string>,
        }
    }
}
```

<br>
<br>

### **Create Technology Quote**

```HTML
POST /api/v1/technologies
```

Creates a new technology quote from the body request

```
{
    "quote": <string>, // Required
    "author": <string>, // Required
    "category": {
        "type": 'technology',
        "name": <string> // Required
    },
    expansionAdded: <string> // Default: Vanilla
}
```

<br>
<br>

### **Update Technology Quote**

```HTML
PATCH /api/v1/technologies/{technologyQuoteId}
```

Updates a specific technology quote from an Id

<br>
<br>

### **Delete Technology Quote**

```HTML
DELETE /api/v1/technologies/{technologyQuoteId}
```

Deletes a specific technology quote from an Id

<br>
<br>

---

## **Wonders Quotes**

These routes allow working with only wonders quotes.

### **Get All Wonders Quotes**

```HTML
GET /api/v1/wonders
```

Response

```
"status": "success",
"results": <Int>, // Number of results in "quotes"
"data": {
   "quotes": [
      {
         "_id":  <string>,

         "author": <string>

         "quote": <string>,

         "category": {
               "type":  'wonder'
               "name":  <string>
            },

         "expansionAdded":  <string>,
      },
   ]
}
```

<br>
<br>

### **Get Wonder Quote**

```HTML
GET /api/v1/wonders/{wonderQuoteId}
```

Gets a specified wonder quote from an Id.

Response

```
{
    "status": "success",
    "data": {
        "quote": {
            "_id": <string>,

            "quote": <string>,

            "author": <string>,

            "category": {
                "type": 'wonder',
                "name": <string>
            },

            "expansionAdded": <string>,
        }
    }
}
```

<br>
<br>

### **Create Wonder Quote**

```HTML
PATCH /api/v1/wonders
```

Creates a new wonder quote from the body request

```
{
    "quote": <string>, // Required
    "author": <string>, // Required
    "category": {
        "type": 'wonder',
        "name": <string> // Required
    },
    expansionAdded: <string> // Default: Vanilla
}
```

<br>
<br>

### **Update Wonder Quote**

```HTML
PATCH /api/v1/wonders/{wonderQuoteId}
```

Updates a specific wonder quote from an Id

<br>
<br>

### **Delete Wonder Quote**

```HTML
DELETE /api/v1/wonders/{wonderQuoteId}
```

Deletes a specific wonder quote from an Id

<br>
<br>

---

## **Great Works Quotes**

These routes allow working with only great works quotes.

### **Get All Great Works Quotes**

```HTML
GET /api/v1/great-works
```

Response

```
"status": "success",
"results": <Int>, // Number of results in "quotes"
"data": {
   "quotes": [
      {
         "_id":  <string>,

         "author": <string>

         "quote": <string>,

         "category": {
               "type":  'great work'
               "name":  <string>
            },

         "expansionAdded":  <string>,
      },
   ]
}
```

<br>
<br>

### **Get Great Work Quote**

```HTML
GET /api/v1/great-works/{greatWorkQuoteId}
```

Gets a specified great work quote from an Id.

Response

```
{
    "status": "success",
    "data": {
        "quote": {
            "_id": <string>,

            "quote": <string>,

            "author": <string>,

            "category": {
                "type": 'great work',
                "name": <string>
            },

            "expansionAdded": <string>,
        }
    }
}
```

<br>
<br>

### **Create Great Work Quote**

```HTML
PATCH /api/v1/great-works
```

Creates a new wonder quote from the body request

```
{
    "quote": <string>, // Required
    "author": <string>, // Required
    "category": {
        "type": 'great works',
        "name": <string> // Required
    },
    expansionAdded: <string> // Default: Vanilla
}
```

<br>
<br>

### **Update Great Work Quote**

```HTML
PATCH /api/v1/great-works/{greatWorkQuoteId}
```

Updates a specific great work quote from an Id
<br>
<br>

### **Delete Great Work Quote**

```HTML
DELETE /api/v1/great-works/{greatWorkQuoteId}
```

Deletes a specific great work quote from an Id
<br>
<br>

---

## **Era Quotes**

Era quotes have a different schema compared with the three other main categories. Most eras have much more than one quote.

## Model

```
{
   _id: <String>

   // Array with quotes from an era.
   quotes: [
         {
            _id: <String>,
            quote: <String>,
            author: <String>
         }
      ],


   // Name of the era
   era: <String>

   // Expansion pack in which was added
   expansionAdded: <String> // values: Vanilla, Gods&Kings, Brave New World

}
```

**'era' values** : Ancient, Classical, Medieval, Renaissance, Industrial, Modern, Future, Atomic, Information

**Example**

```
{
   "_id": "61e88",
   "expansionAdded": "Gods&Kings",
   "quotes": [
      {
         "_id": "911c",
         "quote": "I never think about the future. It comes soon enough.",
         "author": "Albert Einstein"
      }
    ],

    "era": "Information"
},
```

<br>
<br>

### **Get All Era Quotes**

```HTML
GET /api/v1/eras
```

Response

```
"status": "success",
"results": <Int>, // Number of results in "quotes"
"data": {
   "quotes": [
      {
         "_id": <string>,

         "era": <string> // Name of the era

         "expansionAdded": <string>,

         "quotes": [
            {
               "_id": <string>,
               "quote": <string>,
               "author": <string>
            },
            {
               "_id": <string>,
               "quote": <string>,
               "author": <string>
            }
         ],
      }
   ]
}
```

<br>
<br>

### **Get Era Quotes**

```HTML
GET /api/v1/eras/{eraId}
```

Gets quotes from a specified era with an eraId.

<br>
<br>

### **Get A Specific Era Quote**

```HTML
GET /api/v1/eras/{eraId}/{quoteId}
```

It's possible to get a specific quote from all that an era has.

**Example**

```
{
   "_id": "61e88",
   "expansionAdded": "Gods&Kings",
   "quotes": [
      {
         "_id": "911c",
         "quote": "I never think about the future. It comes soon enough.",
         "author": "Albert Einstein"
      }
    ],

    "era": "Information"
},
```

Request

```
GET /api/v1/eras/61e88/911c
```

Response

```
{
    "status": "success",
    "data": {
        "quote": {
            "_id": "911c",
            "quote": "I never think about the future. It comes soon enough.",
            "author": "Albert Einstein"
        }
    }
}
```

<br>
<br>

### **Create Era Quotes**

```HTML
POST /api/v1/eras
```

<br>
<br>

### **Update Era Quotes**

```HTML
PATCH /api/v1/eras
```

<br>
<br>

### **Delete Era Quotes**

```HTML
DELETE /api/v1/eras
```
