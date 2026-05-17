import {Module} from '@nestjs/common';
import { MedicinesController } from './medicines.controller';
import { MedicinesService } from './medicines.service';
import {MedicineSeedService} from "../database/medicine.seed.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Medicine} from "./medicine.entity";
import { MedicinesRepository } from './medicines.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine])],
  controllers: [MedicinesController],
  providers: [MedicinesService, MedicineSeedService, MedicinesRepository]
})

export class MedicinesModule {}
