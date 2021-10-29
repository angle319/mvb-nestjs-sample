import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { accountSetting } from './accountSetting';

interface accountAttributes {
  index?: number;
  id?: string;
  name?: string;
  password?: string;
  email?: string;
  isUse?: boolean;
  isLock?: boolean;
  createTime?: Date;
  modifyTime?: Date;
  lastName?: string;
  firstName?: string;
  thirdId?: string;
  key?: string;
  usage?: number;
  picUrl?: string;
  sysRemark?: string;
  showTour?: boolean;
  isAgreement?: boolean;
  defaultEntity?: string;
}

@Table({ tableName: 'account', timestamps: false })
export class account
  extends Model<accountAttributes, accountAttributes>
  implements accountAttributes
{
  @Column({
    autoIncrement: true,
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('account_index_seq'::regclass)"),
  })
  index?: number;

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
  })
  @Index({ name: 'account_pk', using: 'btree', unique: true })
  id?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  @Index({ name: 'account_search_name_idx', using: 'gin', unique: false })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  password?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  @Index({ name: 'account_email_map_idx', using: 'btree', unique: true })
  @Index({ name: 'account_search_email_idx', using: 'gin', unique: false })
  email?: string;

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: Sequelize.literal('false'),
  })
  isUse?: boolean;

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: Sequelize.literal('false'),
  })
  isLock?: boolean;

  @Column({ field: 'create_time', allowNull: true, type: DataType.DATE })
  @Index({
    name: 'account_create_time_desc_idx',
    using: 'btree',
    unique: false,
  })
  @Index({ name: 'account_create_time_asc_idx', using: 'btree', unique: false })
  createTime?: Date;

  @Column({ field: 'modify_time', allowNull: true, type: DataType.DATE })
  modifyTime?: Date;

  @Column({ field: 'last_name', allowNull: true, type: DataType.STRING(64) })
  lastName?: string;

  @Column({ field: 'first_name', allowNull: true, type: DataType.STRING(64) })
  firstName?: string;

  @Column({ field: 'third_id', allowNull: true, type: DataType.STRING(64) })
  @Index({ name: 'account_third_id_idx', using: 'btree', unique: false })
  thirdId?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  key?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    comment: '0----education\n1----corporation',
    defaultValue: Sequelize.literal('0'),
  })
  usage?: number;

  @Column({ field: 'pic_url', allowNull: true, type: DataType.STRING(256) })
  picUrl?: string;

  @Column({ field: 'sys_remark', allowNull: true, type: DataType.STRING(16) })
  sysRemark?: string;

  @Column({
    field: 'show_tour',
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: Sequelize.literal('false'),
  })
  showTour?: boolean;

  @Column({
    field: 'is_agreement',
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: Sequelize.literal('false'),
  })
  isAgreement?: boolean;

  @Column({ field: 'default_entity', allowNull: true, type: DataType.UUID })
  defaultEntity?: string;

  @HasOne(() => accountSetting, { sourceKey: 'id' })
  accountSetting?: accountSetting;
}
