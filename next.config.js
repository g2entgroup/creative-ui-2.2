module.exports = {
 
    trailingSlash: true,
    exportPathMap: function() {
      return {
        '/': { page: '/' },
        '/all': { page: '/all' },
        '/create-campaign': { page: '/createcampaign' },
        '/discover': { page: '/discover'},
        '/upload': { page: '/upload'},
        '/message': { page: '/message'},
        '/inbox': { page: '/inbox'}
      };
    },
    webpack5: true,
    images: {
      deviceSizes: [320, 420, 768, 1024, 1200],
      loader: 'cloudinary',
      path: "cloudinary://417721411368189:QiVZ8fJOoGbCEOeW1X8yukfrqs0@dyangxc7h",
      domains: ['dweb.link', 'ipfs.io'],
    }
};