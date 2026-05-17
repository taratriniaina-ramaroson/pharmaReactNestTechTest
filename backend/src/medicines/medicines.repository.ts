import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Medicine } from './medicine.entity';

@Injectable()
export class MedicinesRepository extends Repository<Medicine> {
    constructor(private dataSource: DataSource) {
        super(Medicine, dataSource.createEntityManager());
    }
}