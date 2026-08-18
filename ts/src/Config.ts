
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Kmail',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://kmail.pw",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      get_email: {
      },

    }
  }


  entity = {
    "get_email": {
      "fields": [
        {
          "name": "attachments",
          "type": "`$ARRAY`"
        },
        {
          "name": "body",
          "type": "`$STRING`"
        },
        {
          "name": "from",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "received_at",
          "type": "`$STRING`"
        },
        {
          "name": "subject",
          "type": "`$STRING`"
        }
      ],
      "name": "get_email",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/get_email",
              "parts": [
                "get_email"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.messages`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

