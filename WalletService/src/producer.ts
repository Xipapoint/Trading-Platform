import amqp from "amqplib"

const rabbitMQ = {
  url: 'amqp://localhost',
};


class Producer {
    protected channel: amqp.Channel | undefined;
    protected connection: amqp.Connection | undefined;
  
    public async publishMessage(queueName: string, type: string, dataMessage: string) {
      try {
        if (!this.connection) {
          this.connection = await amqp.connect(rabbitMQ.url);
        }
        if (!this.channel) {
          this.channel = await this.connection.createChannel();
        }

        const message = {
            typeMessage: type,
            data: dataMessage
        }
  
        // await this.channel?.assertExchange(rabbitMQ.exchangeName, 'topic', {durable: true});
        await this.channel.assertQueue(queueName, { durable: true });
  
        this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  
        console.log(`A new ${queueName} event has been detected and sent to ${queueName}`);
      } catch (error) {
        console.error('Error publishing message', error);
      }
    }
}

export default new Producer();