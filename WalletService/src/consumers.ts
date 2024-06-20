import amqp from "amqplib"

const rabbitMQ = {
  url: 'amqp://localhost',
  exchangeName: 'cardEvents',
  routingKey: 'userCard'
};

async function startConsumer() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const { queue } = await channel.assertQueue('create_entities');
  console.log(`Waiting for messages in queue ${queue}`);

  channel.consume('create_entities', async (msg) => {
    if (msg !== null) {
      const { type, userId } = JSON.parse(msg.content.toString());
      if (type === 'create_wallet') {
        // await createWallet(userId);
      }
      channel.ack(msg);
    }
  });
}