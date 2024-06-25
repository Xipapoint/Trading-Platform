import amqp from "amqplib";


const rabbitMQ = {
  url: "amqp://localhost",
  queueName:'create_entities'
};


class Producer {
  protected channel: amqp.Channel | undefined;
  protected connection: amqp.Connection | undefined;

  public async publishMessage(type: string, message: string) {
    try {
      if (!this.connection) {
        this.connection = await amqp.connect(rabbitMQ.url);
      }
      if (!this.channel) {
        this.channel = await this.connection.createChannel();
      }

      // await this.channel?.assertExchange(rabbitMQ.exchangeName, 'topic', {durable: true});
      await this.channel.assertQueue(rabbitMQ.queueName, { durable: true });

      this.channel.sendToQueue(rabbitMQ.queueName, Buffer.from(message));

      console.log(`A new ${type} event has been detected and sent to ${rabbitMQ.queueName}`);
    } catch (error) {
      console.error('Error publishing message', error);
    }
  }
}


// class InventoryProducer extends BaseProducer {
//   private exchangeName = 'exchangeInventory';

//   async publishCreateInventory(message: string) {
//     await this.publishMessage(this.exchangeName, 'createInventory', message);
//   }
// }

export default new Producer();
// export const inventoryProducer = new InventoryProducer();
// export const balanceProducer = new BalanceProducer();
