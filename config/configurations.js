class Configurations {
    JWT_SECRET='bloody-flows-punch-lines'
    JWT_EXPIRES_IN='90d'
    JWT_COOKIE_EXPIRES_IN=90

    DATABASE_HOST=''
    DATABASE_USER=''
    DATABASE_PASSWORD=''
    DATABASE_DB_NAME=''
}

class DevConfig extends Configurations{
    DATABASE_HOST='localhost'
    DATABASE_USER='root'
    DATABASE_PASSWORD=''
    DATABASE_DB_NAME='talky'
}

class StagingConfig extends Configurations{
    DATABASE_HOST=''
    DATABASE_USER=''
    DATABASE_PASSWORD=''
    DATABASE_DB_NAME=''
}

class ProductionConfig extends Configurations{
    DATABASE_HOST=''
    DATABASE_USER=''
    DATABASE_PASSWORD=''
    DATABASE_DB_NAME=''
}

const config_object = {
    'development': DevConfig,
    'staging': StagingConfig,
    'production': ProductionConfig
}

module.exports = {DevConfig, StagingConfig, ProductionConfig, config_object}