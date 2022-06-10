import { Kafka, logLevel } from 'kafkajs';

export async function run(groupId: string) {
  try {
    const kafka = new Kafka({
      logLevel: logLevel.INFO,
      brokers: [`localhost:9092`],
      clientId: 'my-app',
    });

    const topic = 'test-topic';
    const consumer = kafka.consumer({ groupId });

    await consumer.connect();

    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
        console.log(`- ${prefix} ${message.key}#${message.value}`)
      },
    });
  } catch (error: any) {
    console.error(`[example/consumer] ${error.message}`, error);
  }
};
