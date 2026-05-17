import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicinesRepository } from './medicines.repository';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Injectable()
export class MedicinesService {
    constructor(private readonly repository: MedicinesRepository) { }

    findAll() {
        return this.repository.find();
    }

    async findOne(id: number) {
        const medicine = await this.repository.findOneBy({ id });
        if (!medicine) throw new NotFoundException(`Medicine #${id} not found`);
        return medicine;
    }

    create(dto: CreateMedicineDto) {
        const medicine = this.repository.create(dto);
        return this.repository.save(medicine);
    }

    async update(id: number, dto: UpdateMedicineDto) {
        const medicine = await this.findOne(id);
        Object.assign(medicine, dto);
        return this.repository.save(medicine);
    }

    async remove(id: number): Promise<void> {
        const medicine = await this.findOne(id);
        await this.repository.remove(medicine);
    }
}