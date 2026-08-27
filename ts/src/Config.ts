
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

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Kmail',
        slug: "kmail",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
          "short": "List of attachments",
          "type": "`$ARRAY`"
        },
        {
          "name": "body",
          "short": "Email body content",
          "type": "`$STRING`"
        },
        {
          "name": "from",
          "short": "Sender email address",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the message",
          "type": "`$STRING`"
        },
        {
          "name": "received_at",
          "short": "Timestamp when the message was received",
          "type": "`$STRING`"
        },
        {
          "name": "subject",
          "short": "Email subject",
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

