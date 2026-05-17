import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicinesModule } from './medicines/medicines.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sqliteConfig } from './database/sqlite.config';

@Module({
  imports: [TypeOrmModule.forRoot(sqliteConfig), MedicinesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
