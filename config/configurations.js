class Configurations {
    JWT_SECRET='bloody-flows-punch-lines'
    JWT_EXPIRES_IN='90d'
    JWT_COOKIE_EXPIRES_IN=90

    constructor(db_name, db_user, db_host, db_password) {
        this.db_host = db_host
        this.db_name = db_name
        this.db_user = db_user
        this.db_password = db_password
    }
}

class DevConfig extends Configurations{
    constructor() {
        super();
        this.db_host = 'localhost';
        this.db_user = 'root';
        this.db_name = 'talky';
        this.db_password = '';
    }
}

class StagingConfig extends Configurations{
    constructor() {
        super();
        this.db_host = 'staging';
        this.db_user = 'stage';
        this.db_name = 'talky_staging';
        this.db_password = '%78393034848';
    }
}

class ProductionConfig extends Configurations{
    constructor() {
        super();
        this.db_host = 'production';
        this.db_user = 'prod';
        this.db_name = 'talky_production';
        this.db_password = '%78393034848';
    }
}

const config_object = {
    'development': DevConfig,
    'staging': StagingConfig,
    'production': ProductionConfig
}

module.exports = {Configurations, DevConfig, StagingConfig, ProductionConfig, config_object}