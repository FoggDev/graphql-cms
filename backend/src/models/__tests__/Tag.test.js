import Sequelize from 'sequelize-mock'
import Tag from '../Tag'

const sequelize = new Sequelize()
const DataTypes = sequelize.Sequelize
const model = Tag(sequelize, DataTypes)
const schema = model._defaults

describe('#Tag', () => {
  it('should have correct model name', () => {
    expect(model.name).toBe('Tag')
  })

  it('should match the schema', () => {
    expect(schema).toEqual({
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4()
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
  })
})
