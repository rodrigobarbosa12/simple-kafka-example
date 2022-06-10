import { Kafka } from 'kafkajs';

(async () => {
  const kafkajs = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
  });

  const producer = kafkajs.producer();

  await producer.connect();

  await producer.send({
    topic: 'test-topic',
    messages: [
      {
        key: 'Cristiano Ronaldo',
        value: "In my head I'm the best"
      },
    ],
  });

  await producer.disconnect();
})();
