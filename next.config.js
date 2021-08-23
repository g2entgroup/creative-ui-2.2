module.exports = {
 
    trailingSlash: true,
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    },
    
      webpack5: true,
 
    webpack: function (config, options) {
      config.experiments = {};
      return config;
    },
    images: {
      domains: ["res.cloudinary.com", "www.creativeplatform.io" , 'picsum.photos' , 'hub.textile.io' , 'ipfs.io'],
    }
};