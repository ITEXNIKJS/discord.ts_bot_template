import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  discord: string;
}

@Table({
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
  deletedAt: false
})
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    unique: true,
    primaryKey: true
  })
  declare discord: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  declare scrap: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    defaultValue: 0
  })
  declare scrapInDay: number;
}
