const sanityClient = require('@sanity/client')
export default sanityClient({
    // Find your project ID and dataset in `sanity.json` in your studio project
    projectId: process.env.NODE_ENV === "production" ? 'ip1hz003' : '4nwujqdw' , // different id based off of envi
    dataset: process.env.NODE_ENV === "production" ? 'production' : 'development', // different data sets based off of envi
    useCdn: true
    // useCdn == true gives fast, cheap responses using a globally distributed cache.
    // Set this to false if your application require the freshest possible
    // data always (potentially slightly slower and a bit more expensive).
}) 