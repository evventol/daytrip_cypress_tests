// // TODO load it from config env vars

// let environment = process.env.ENV

// if (!environment) {
//     environment = 'sandbox'
//     console.log('You can set config environment by setting up ENV variable.')
// }

// export type Config = {
//     env: string
//     oldSiteUrl: string
//     newSiteUrl: string
//     managUrl: string
// }

// const config: Config[] = [
//     {
//         env: 'sandbox',
//         oldSiteUrl: `https://sandbox.mydaytrip.com`,
//         newSiteUrl: `https://newsite.sandbox.mydaytrip.com/`,
//         managUrl: `https://management.sandbox.mydaytrip.com/`
//     },
//     {
//         env: 'local',
//         oldSiteUrl: 'http://localhost:11111',
//         newSiteUrl: 'http://localhost:11111',
//         managUrl: 'http://localhost:11111'
//     }
// ]

// const selectedConfig = config.find(
//     c => c.env.toLocaleLowerCase() === environment
// )
// if (selectedConfig.oldSiteUrl.length < 4) {
//     throw 'Config not loaded'
// } else {
//     console.log('Loaded config for', selectedConfig.env)
// }

// // export default selectedConfig as Config; // why this does not work?
// export const oldSiteUrl = selectedConfig.oldSiteUrl
// export const newSiteUrl = selectedConfig.newSiteUrl
// export const managUrl = selectedConfig.managUrl
