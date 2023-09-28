export default function ({ req, redirect, next }: any) {
    // Check for the presence of the JWT token in the "Authorization" header
    // const authorizationHeader = req.headers.authorization;

    // // Perform your token validation logic here
    // if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    //     // Token is missing or invalid
    //     redirect('/login'); // Redirect to the login page or another appropriate route
    // }
    // next();
}
