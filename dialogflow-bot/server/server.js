const sonicx = require('sonicx');
const { route } = require('sonicx');
const googleAuth = require('google-oauth-jwt');


// Below are test configuration files (i.e, private key, client email etc) that were used in testing Dialogflow v2 API 
// NOTE: since oAuth requires HTTPS protocol to accept the requests, we've used ngrok tool to map localhost environments to https ports (https://ngrok.com/ )
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC2tb3UwC5y21UR\nuYIy5dv1sChVDbjzBMQbjMrkV/XxwZ1UV9mCZ6rXropHR82lYy+5On95lTBGaja4\nn85E8t0pL5i2qxOs6vhiPEz2V9Hu/zUGECnSPxPurQkbxCA6T5SE24qybWdvNup+\np7B6AWGKB5l69/zBMHr2VWwoZIYj6dunIqvilR3wzRyJD4UUwQRVZG3M8YmKkEsQ\nz7IKvchRwb+rKeOKuA5DvGtbNfEkzFiss1XgpNrYCLVqelMxG/ieqA39EaAw794+\nbtMQGnhOSUCkAtaGYMh5TNpCMjvVwjSoB8TWs86qWP46gjnNhhoQ2n1ZZKAyTI1b\n8/NnPA5XAgMBAAECggEAK7Sr1UGnmsgGwHeswnojtNDPxRDERjXEp4Z1XkwARDV5\nahydpkkgH/nbkBOICOECIH/y0GW0p5NuxZlMoUerSdfd4wxnZ3zJr84W5vK5AD/C\nMlIZfvah0P1JaX/v6aLxtxpBQk9TZ9IuI9//IiBEcd1BhJ3fs2LidxyWA8+QGvTF\nae1qmopEXwIseW7SlBhr9R4jVwGErrbx477W0T2ciiKJrYQAFevrVScURK3Z8peM\nnPF/oidjihiGC+fBgdWvNH7XgLetQnb4VsjwVkucFHgfDnO7RCycxavWv/dpvDLU\nV6BC1tgq5EzR0dapJcFYj6P/QzKfm3NgBtohQYtvGQKBgQDm9LfY03ma6IEhS3K2\nCBsyOJbLhlV7VBe0lDZZro3q4tNSYZaAQopo6dbVOBfuv+tWelJ41VSgWSvUtRiT\nXHGxh3uI1ALun/RRAHTtjOhRKlIwHgFLJV1YyZR11/1jFapKaBM5NinrLxgERlBE\nQ58t2J0KpHCLargBgRt0sDoXowKBgQDKhbnNZLF8HtbTF6yEid0QKAlYDiCsedpx\nDEFiavmB0/6MHe6L5SOMzneuV3fYSfnTiPCnKXlRpKHcLZ7Ml0M0SsqK0VCyzhnM\nJd56H/YiodjcyCDWL8gQAZ6ut81jCUYR9MN/90xH923hh8ImdJ3PSKRoezaxaZZJ\nKS0txiqpvQKBgQDktgsqCaIvKXhXBGRAp55nCWsreYhFbW1cQjngbd/Ub3Nd7Y4g\nzcRLSOaal8X7hMsFBHWPe5Mmh6fEKOKBa9abO9O2GF4e+P/1B0LDy/p0BjkFtXEK\nfaIHPvhqCs6+xMGylYYT7fNtF2HtOcRbFawYtp4t39Ij/jbiJnyN/cZJiQKBgQC5\nHLgzTAmKuSmE80umLdlZDi9URD2LSSnoUNpm2f7Ls3kkm6tSRZRT/NiaC6sokJ2A\nw9esA5W3kXK9LRnMSaqM3pv5fM91UDt2RVrwZ8xz5VmynF6fSDdmogRoEOrzziM1\nAHO9wM4BreDK12sX+VnRgMV+FrlsOmW6458/CrYuRQKBgQDZnRLW12Iu9KdWP+e6\nhg4uXEx8r/0/ZlMiC8XvFwfoN6l9J+539vTzHNOzikSdMWsvmpIEDNk7NAwnYxnB\nNemYyS+sYRrtOqL3d6/3qrBhHPOb9l2ATqcFYQedbMnfdfAm8ssVPMZHWexbW8Xq\nlN+2p+V8IATDBvA+ILOoKUAuQQ==\n-----END PRIVATE KEY-----\n";
const client_email = "food-delivery-adcjmq@appspot.gserviceaccount.com";




sonicx.configuration = {
    disableFormdata: false, // if want to use third party form data parser default is true.
    uploadPath: '_uploads', // default upload path default is os.tempDir().
    memoryUpload: true, // if do not want to store in any directory and want to use as buffers.
    requestTimeout: 150000, // milliseconds.
    staticPath: 'public', // Serve static files.
    responseHeaders: {
        "Access-Control-Expose-Headers": "*",
        "Access-Control-Allow-Origin": "*",
    }, // can use to configure cors or other header settings.
};

const config = {
    "private_key": private_key,
    "client_email": client_email,

}

const getToken = async () => {
    return new Promise((resolve) => {
        googleAuth.authenticate(
            {
                email: client_email,
                key: private_key,
                scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow'],
            },
            (err, token) => {
                resolve(token);
            },
        );
    });
}

route('/token', [
    {
        configuration: {
            responseHeaders: {
                "Access-Control-Expose-Headers": "*",
                "Access-Control-Allow-Origin": "*",
            },

        },

        controller: async (req, res) => {
            let token = await getToken();
            res.send({ token });
        }
    },

]);



sonicx.listen(4000, () => console.log("Listening on port 40000"));