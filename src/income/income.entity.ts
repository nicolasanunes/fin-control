import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'incomes' })
export class IncomeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'value', nullable: false })
  value: number;

  @Column({ name: 'date', length: 100, nullable: false })
  date: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
