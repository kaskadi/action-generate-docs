const lambda = new RegExp(/arn:[a-zA-Z0-9-]+:lambda:[a-zA-Z0-9-]+:\d{12}:function:([a-zA-Z0-9-_]+)/)
const layer = new RegExp(/arn:[a-zA-Z0-9-]+:lambda:[a-zA-Z0-9-]+:\d{12}:layer:([a-zA-Z0-9-_]+)/)
const SQS = new RegExp(/arn:[a-zA-Z0-9-]+:sqs:[a-zA-Z0-9-]+:\d{12}:([a-zA-Z0-9-_]+)/)
const SNS = new RegExp(/arn:[a-zA-Z0-9-]+:sns:[a-zA-Z0-9-]+:\d{12}:([a-zA-Z0-9-_]+)/)
const eventBridge = new RegExp(/arn:[a-zA-Z0-9-]+:events:[a-zA-Z0-9-]+:\d{12}:event-bus\/([a-zA-Z0-9-_]+)/)

module.exports = {
  destinations: {
    lambda,
    SQS,
    SNS,
    eventBridge
  },
  layer,
  lambda
}
