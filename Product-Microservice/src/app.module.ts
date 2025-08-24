import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './services/config/config.service';
import { MongoConfigService } from './services/config/mongo-config.service';
import { ProductSchema } from './schemas/product.schema';
import { UserLinkSchema } from './schemas/user-link.schema';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { PurchaseProductSchema } from './schemas/product-purchase.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule loads environment variables and configuration settings
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Load environment variables from the .env file
    }),
    
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_URL],
          queue: 'main_queue', // The queue name for the User microservice
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      autoCreate: true
    }),
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
        collection: 'products',
      },
      {
        name: 'ProductPurchase',
        schema: PurchaseProductSchema,
        collection: 'product_purchase',
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService,
    ConfigService,
  ],
})
export class AppModule { }
