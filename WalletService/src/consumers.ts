import amqp from "amqplib"

const rabbitMQ = {
  url: 'amqp://localhost',
  queueName: 'create_wallet',
};

class Producer {
  protected channel: amqp.Channel | undefined;
  protected connection: amqp.Connection | undefined;

  async startConsumer() {

    try {
      if (!this.connection) {
        this.connection = await amqp.connect(rabbitMQ.url);
      }
      if (!this.channel) {
        this.channel = await this.connection.createChannel();
      }

      await this.channel.assertQueue('test');
      // TODO: CREATE CONSUMER!!!
      
      // console.log(`Waiting for messages in queue ${queue}`);
      // this.channel.consume('create_wallet', async (msg) => {
      //   if (msg !== null) {
      //     const { type, userId } = JSON.parse(msg.content.toString());
      //     if (type === 'create_wallet') {
      //       // await createWallet(userId);
      //     }
      //     if(this.channel) this.channel.ack(msg);
      //   }
      // });

    } catch (error) {
      console.error('Error publishing message', error);
    }

  }
}