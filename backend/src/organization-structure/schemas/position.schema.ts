import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PositionDocument = Position & Document;

@Schema({ _id: false })
class PositionChangeRequest {
  @Prop({ required: true, enum: ['Reporting Line Change', 'Position Update', 'Position Creation'] })
  requestType: string;

  @Prop({ type: Object })
  requestedChanges: Record<string, any>;

  @Prop({ required: true })
  reason: string;

  @Prop({ type: Types.ObjectId, ref: 'EmployeeProfile', required: true })
  requestedBy: Types.ObjectId;

  @Prop({ default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] })
  status: string;

  @Prop({ default: Date.now })
  requestDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  reviewedBy?: Types.ObjectId;

  @Prop()
  reviewDate?: Date;

  @Prop()
  reviewComments?: string;
}

@Schema({ timestamps: true })
export class Position {
  @Prop({ required: true, unique: true })
  positionCode: string;

  @Prop({ required: true })
  positionTitle: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'Department', required: true })
  departmentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Position' })
  reportsToPositionId?: Types.ObjectId;

  @Prop({ required: true })
  level: number;

  @Prop({ required: true })
  payGrade: string;

  @Prop({ enum: ['Entry', 'Junior', 'Mid', 'Senior', 'Lead', 'Manager', 'Director', 'Executive'] })
  seniorityLevel: string;

  @Prop({ default: 1 })
  numberOfOpenings: number;

  @Prop({ type: [String], default: [] })
  requiredSkills: string[];

  @Prop({ type: [String], default: [] })
  responsibilities: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Date })
  deactivationDate?: Date;

  @Prop()
  deactivationReason?: string;

  @Prop({ type: [PositionChangeRequest], default: [] })
  changeRequests: PositionChangeRequest[];
}

export const PositionSchema = SchemaFactory.createForClass(Position);

PositionSchema.index({ positionCode: 1 });
PositionSchema.index({ departmentId: 1 });
PositionSchema.index({ isActive: 1 });