module.exports = {
 
    trailingSlash: true,
    exportPathMap: function() {
      return {
        '/': { page: '/' },
        '/all': { page: '/all' },
        '/create-campaign': { page: '/createcampaign' },
        '/discover': { page: '/discover'},
        '/upload': { page: '/upload'}
      };
    },
    webpack5: true,
    images: {
      loader: "imgix",
      path: "",
      domains: ["res.cloudinary.com", "www.creativeplatform.io" , 'picsum.photos' , 'hub.textile.io' , 'ipfs.io', 'images.unsplash.com'],
    }
};