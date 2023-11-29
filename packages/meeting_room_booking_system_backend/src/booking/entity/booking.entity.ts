import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MeetingRoom } from 'src/meeting-room/entities/meeting-room.entity';
import { User } from 'src/user/entities/user.entity';

export enum BOOKING_STATUE {
  APPLYING = '申请中',
  APPROVED = '审批通过',
  APPROVED_REJECTED = '审批驳回',
  DISMISSED = '已解除',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '会议开始时间',
  })
  startTime: Date;

  @Column({
    comment: '会议结束时间',
  })
  endTime: Date;

  @Column({
    length: 20,
    comment: '状态(申请中、审批通过、审批驳回、已解除)',
    default: '申请中',
  })
  status: BOOKING_STATUE;

  @Column({
    length: 100,
    comment: '备注',
    default: '',
  })
  notes: string;

  // 预定列表多对一。 一个用户申请多个预约
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => MeetingRoom)
  room: MeetingRoom;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}
