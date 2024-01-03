const Sequelize = require('sequelize')


//db configurations
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host : process.env.DATABASE_HOST,
    port : process.env.DATABASE_PORT,
    dialect : process.env.DB_dialect,
    logging: false,
    define : {
        timestamps: false,
        freezeTableName: true,
        operatorsAliases: false
    }
})

//db authentication

sequelize.authenticate()
.then(()=>{
    
    console.log('db connected success')
}).catch(err=>{
    console.log(err)
})





//creating model
sequelize.sync({ force : true })
.then(result=>{
    console.log('Table created Successfully...');
})
.catch(err=>{
    console.log(err);
})








module.exports = sequelize