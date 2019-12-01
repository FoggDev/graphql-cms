import { encrypt } from 'fogg-utils'

export default (sequelize, { BOOLEAN, STRING, UUID, UUIDV4 }) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: UUID,
      defaultValue: UUIDV4()
    },
    username: {
      type: STRING,
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
      type: STRING,
      allowNull: false
    },
    email: {
      type: STRING,
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
      type: STRING,
      allowNull: false,
      defaultValue: 'user'
    },
    active: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    hooks: {
      beforeCreate: user => {
        user.password = encrypt(user.password)
      }
    }
  })

  User.associate = models => {
    User.hasMany(models.Post, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      },
      as: 'posts'
    })
  }

  return User
}
