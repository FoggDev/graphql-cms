import Sequelize from 'sequelize-mock'
import { isFunction } from 'fogg-utils'
import Post from '../Post'

const sequelize = new Sequelize()
const DataTypes = sequelize.Sequelize
const model = Post(sequelize, DataTypes)
const schema = model._defaults

describe('#Post', () => {
  it('should have correct model name', () => {
    expect(model.name).toBe('Post')
  })

  it('should match the schema', () => {
    expect(schema).toEqual({
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4()
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      readingTime: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '3 min'
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'es'
      },
      image: {
        type: DataTypes.STRING
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    })
  })

  it('should have associate method', () => {
    expect(isFunction(model.associate)).toBe(true)
  })
})
