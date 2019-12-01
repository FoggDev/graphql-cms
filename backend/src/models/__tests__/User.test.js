import Sequelize from 'sequelize-mock'
import { isFunction } from 'fogg-utils'
import User from '../User'

const sequelize = new Sequelize()
const DataTypes = sequelize.Sequelize
const model = User(sequelize, DataTypes)
const schema = model._defaults

describe('#User', () => {
  it('should have correct model name', () => {
    expect(model.name).toBe('User')
  })

  it('should match the schema', () => {
    expect(schema).toEqual({
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4()
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'The user just accepts alphanumeric characters'
          },
          len: {
            args: [4, 20],
            msg: 'The username must be from 4 to 20 characters'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email'
          }
        }
      },
      privilege: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    })
  })

  it('should have beforeCreate hook', () => {
    expect(isFunction(model.options.hooks.beforeCreate)).toBe(true)
  })

  it('should have associate method', () => {
    expect(isFunction(model.associate)).toBe(true)
  })
})
