module.exports = {
 
    trailingSlash: true,
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    },
    webpack5: true,
    images: {
      domains: ["res.cloudinary.com", "www.creativeplatform.io" , 'picsum.photos' , 'hub.textile.io' , 'ipfs.io'],
    }
};