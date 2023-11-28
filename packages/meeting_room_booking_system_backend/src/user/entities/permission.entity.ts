import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({
    length: 20,
    comment: '权限代码',
  })
  @ApiProperty({
    maxLength: 20,
  })
  code: string;

  @Column({
    length: 100,
    comment: '权限描述',
  })
  @ApiProperty({
    maxLength: 100,
  })
  description: string;
}
