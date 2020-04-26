const sonicx = require('sonicx');
const { route } = require('sonicx');
const googleAuth = require('google-oauth-jwt');


// Below are test configuration files (i.e, private key, client email etc) that were used in testing Dialogflow v2 API 
// NOTE: since oAuth requires HTTPS protocol to accept the requests, we've used ngrok tool to map localhost environments to https ports (https://ngrok.com/ )
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDSI72TdCLuZmve\n6b3ZJgCXkE+2qwxMFvF4oWlVZg138l6od+dCHLMbB53vkHuAnqYhaREcPiXY7ngf\n8HChkcCskyB9EDWa7DTz22Ogpts/b8t2o4nw8iF9j+ODKfMr3R3cLIZYbYItJoWx\nlpn6OhLJN9B7l3ePA7GdmfqKpxBql5z6nD7ZAkly6fm3rZF1Apx9Crz2f4pHcVZ9\nTghitcoDolNn8UmsJE5W1nkluD0vS+4nqoGRN8qEniGdj2H/gf1KPl6zrO2rRKRA\npWEDJ1tMVH/qHRlODcuSE+DT0O/2TJnhgKBSJGw9ff1sLtfLzzksKJykghBFBbfz\nCGNUJuvDAgMBAAECggEAAo0eiG4Y3SNvMdX3+8KYr+kM9AnK7MLmjEa2vFZbLtae\nzEAlwElllJwYuxzaSFXPbIkVr8MYEInXTtlLdMVhPSHNe4Hj32KjbfEpmidhyA5i\naP6pS7yU0tfEClv1sNWkFCqSOFFJYE+fFeiJ1rONINZFo1/TusUaYJsgTeijVrfv\nimGVf4nkrfAGy+u6izBxSXemFATGFlKyz3oPA3KoHVB3URW0hOdek9gzR8vfWSvp\nrOQOCzAq2LWGnvyOKLd2+9cXbQyk/r/Jb1YoXwdP83v7+3xFizFwP36p4s26D8lf\nbiCgPDBDuZOoMK9TJXef28R+JdqXU+ttDxgiv8uIiQKBgQDrUr225mX2LH1dl/Rc\nFi504DnDC0Jl80XSjvAq/yF20HJETLaVg68uGmIGAJ6zNDviJ1ASziJUXakMe973\nnWbTSPzNtsVxgPckt47TwNDCTa8Y4TwzoDXZ+xTDZfE5oNv0e3v0CF7wJ/2pEDmO\nj822lkvoxir0XjklDT0DB3/3/QKBgQDkmofOeickCIedUhFuWGX3KmdgVxH+i+aD\nH74fZdSZkE5r6ayDfHfd42dTSx+bBNhvRMG7sAh5MeJQtCHxpGYeid2GpZT/T0Qb\nwWq6WbZ7yBPujT9feFUsmPSW5ctFc4tH7qI11tsRvtRhHnJkHPpTswcXtjTWq3aR\ncXm0MHZevwKBgQDETZtwzbXUq7xQrQftIZvTZ5EHwYa8ITnnsdFrLLUvtib8Drpo\n8xbZcKzAsReyCirCN2U2qro8gn0YquSOzsEOE96/hG4khx6jhHQi9L+wtrkQGiPs\nNQN3OVpSveGC30tdIP1/ztPTpqiVtbEt2YwTekEMhvMiMs+ctvRkaIc5yQKBgBXJ\nfIP7NFvEzFf8CFlB54Xk7rFJ2xctciyxC8emRtrT3AWA4cYuSKZHFAPmNv7pOU9x\neB1RK52RWYZjhJCpIGpsrUY15btnbJBQoMFd53xoly23HIEW0NdNRJJVGEhoOLAE\nWEVVUs+gJlGTO0e7U0hC2bwyy1piQQyfif/YVo+1AoGAW0vJ37yx4cKLdI9z+cd7\nHg8bzk9eUGJemyXX1AMlkD6WfDyNk/DP4CMM7Py980gTUIbC94rpPs4avCxmPvao\nKVjJF1+DbP9SGH+6Xmdkkg42Y1c1QVylNkOqGZ1wKeYjrfnfMF0E1LVvwTAIegYO\nykNgFZC6YafGVDLofYOtSiE=\n-----END PRIVATE KEY-----\n";
const client_email = "dialogflow-hdiejl@restaurantbot-tutorial-lndcel.iam.gserviceaccount.com";

const project_id = "restaurantbot-tutorial-lndcel";
const sessionId = "23";

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

const config= {
    "private_key": private_key,
    "client_email": client_email,
  
}

const getToken = async () => {
    return new Promise((resolve) => {
        console.log('test')
        googleAuth.authenticate(
            {
            email: client_email,
            key: private_key, 
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow'],
            }, 
            (err, token) => {
                console.log('token from error '+ err)
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
        console.log('testing token')
        let token = await getToken();
        console.log('token is' + token)
        res.send({ token });
    }
    },
    
]);



sonicx.listen(4000, () => console.log("Listening on port 40000"));