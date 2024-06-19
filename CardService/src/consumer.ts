import amqp from "amqplib"

const rabbitMQ = {
  url: 'amqp://localhost',
  exchangeName: 'cardEvents',
  routingKey: 'userCard'
};

async function startConsumer() {
  const connection = await amqp.connect(rabbitMQ.url);
  const channel = await connection.createChannel();

  await channel.assertExchange(rabbitMQ.exchangeName, 'direct');

  const { queue } = await channel.assertQueue('', { exclusive: true });
  console.log(`Waiting for messages in queue ${queue}`);

  channel.bindQueue(queue, rabbitMQ.exchangeName, rabbitMQ.routingKey);

  channel.consume(queue, (msg) => {
    if (msg) {
      const messageContent = msg.content.toString();
      console.log(`Received message: ${messageContent}`);
      channel.ack(msg);
    }
  });
}