const redis=require('redis');
export function createClient() {
  return(  redis.createClient({
        socket: {
          host: process.env.host,
          port: process.env.port
      },
      }))
}