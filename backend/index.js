import Sequelize from 'sequelize'

const config = {
  database: 'js',
  username: 'czantany',
  password: '211182'
}

let sequelize

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    underscored: true
  })
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: 'postgres',
    define: {
      underscored: true
    }
  })
}

const db = {
  Post: sequelize.import('./Post'),
  Tag: sequelize.import('./Tag'),
  User: sequelize.import('./User')
}

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize

export default db
