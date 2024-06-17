import amqp from "amqplib"

const rabbitMQ = {
  url: 'amqp://localhost',
  exchangeName: 'authEvents',
};

class Producer {
  private channel: amqp.Channel | undefined;

  private async createChannel() {
    const connection = await amqp.connect(rabbitMQ.url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey: string, message: string) {
    if (!this.channel) {
      await this.createChannel();
    }

    const exchangeName = rabbitMQ.exchangeName;
    await this.channel?.assertExchange(exchangeName, 'direct');

    const logDetails = {
      createCard: routingKey,
      message: message,
      dateTime: new Date(),
    };
    await this.channel?.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(logDetails)));

    console.log(`A new ${routingKey} fee have been detected and sent to ${exchangeName}`);
  }
}

export default new Producer();