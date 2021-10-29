import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { account } from './account';

interface accountSettingAttributes {
  id: string;
  accountId?: string;
  langCode?: string;
  property?: object;
  createTime?: Date;
  modifyTime?: Date;
  webTimeout?: number;
  isTotp?: boolean;
}

@Table({ tableName: 'account_setting', timestamps: false })
export class accountSetting
  extends Model<accountSettingAttributes, accountSettingAttributes>
  implements accountSettingAttributes
{
  @Column({ primaryKey: true, type: DataType.UUID })
  @Index({ name: 'account_config_pkey', using: 'btree', unique: true })
  id!: string;

  @ForeignKey(() => account)
  @Column({ field: 'account_id', allowNull: true, type: DataType.UUID })
  @Index({ name: 'account_setting_id_idx', using: 'btree', unique: true })
  accountId?: string;

  @Column({ field: 'lang_code', allowNull: true, type: DataType.STRING(255) })
  langCode?: string;

  @Column({ allowNull: true, type: DataType.JSON })
  property?: object;

  @Column({ field: 'create_time', allowNull: true, type: DataType.DATE })
  createTime?: Date;

  @Column({ field: 'modify_time', allowNull: true, type: DataType.DATE })
  modifyTime?: Date;

  @Column({
    field: 'web_timeout',
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('60'),
  })
  webTimeout?: number;

  @Column({
    field: 'is_totp',
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: Sequelize.literal('false'),
  })
  isTotp?: boolean;

  @BelongsTo(() => account)
  account?: account;
}
