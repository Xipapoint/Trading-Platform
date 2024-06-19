import amqp from "amqplib";

class BaseProducer {
  protected channel: amqp.Channel | undefined;
  protected connection: amqp.Connection | undefined;

  protected async createChannel() {
    if (!this.connection) {
      this.connection = await amqp.connect('amqp://localhost');
    }
    if (!this.channel) {
      this.channel = await this.connection.createChannel();
    }
  }

  protected async publishMessage(exchangeName: string, routingKey: string, message: string) {
    try {
      await this.createChannel();

      await this.channel?.assertExchange(exchangeName, 'direct');

      const logDetails = {
        action: routingKey,
        message: message,
        dateTime: new Date(),
      };
      this.channel?.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(logDetails)));

      console.log(`A new ${routingKey} event has been detected and sent to ${exchangeName}`);
    } catch (error) {
      console.error('Error publishing message', error);
    }
  }
}

class CardProducer extends BaseProducer {
  private exchangeName = 'exchangeCard';

  async publishCreateCard(message: string) {
    await this.publishMessage(this.exchangeName, 'createCard', message);
  }
}

class InventoryProducer extends BaseProducer {
  private exchangeName = 'exchangeInventory';

  async publishCreateInventory(message: string) {
    await this.publishMessage(this.exchangeName, 'createInventory', message);
  }
}

class BalanceProducer extends BaseProducer {
  private exchangeName = 'exchangeBalance';

  async publishCreateBalance(message: string) {
    await this.publishMessage(this.exchangeName, 'createBalance', message);
  }
}

export const cardProducer = new CardProducer();
export const inventoryProducer = new InventoryProducer();
export const balanceProducer = new BalanceProducer();
