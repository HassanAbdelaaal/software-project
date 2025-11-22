import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema({ timestamps: true })
export class Department {
  @Prop({ required: true, unique: true })
  departmentCode: string;

  @Prop({ required: true })
  departmentName: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'Department' })
  parentDepartmentId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'EmployeeProfile' })
  headOfDepartment?: Types.ObjectId;

  @Prop({ type: Date })
  establishedDate: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Date })
  deactivationDate?: Date;

  @Prop()
  deactivationReason?: string;

  @Prop()
  location?: string;

  @Prop()
  costCenter?: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);

DepartmentSchema.index({ departmentCode: 1 });
DepartmentSchema.index({ isActive: 1 });