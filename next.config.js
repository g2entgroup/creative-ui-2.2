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
      deviceSizes: [320, 420, 768, 1024, 1200],
      loader: "imgix",
      path: "https://creative-platform.imgix.net/",
      domains: ['hub.textile.io' , 'ipfs.io'],
    }
};