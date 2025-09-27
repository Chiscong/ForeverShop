import jwt from "jsonwebtoken";
const adminAuth = async (req, res, next) => {
    try {
       
        const authHeader = req.headers.authorization || req.headers.token;
        if (!authHeader) {
            return res.json({ success: false, message: "Not Authorized. Login Again" })
        }

        let token = authHeader;
        if (authHeader.startsWith && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.json({ success: false, message: 'Invalid token' })
        }

      
        const expected = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
        if (typeof decoded === 'object') {
            
            const check = decoded.email ? decoded.email + (decoded.password || '') : JSON.stringify(decoded);
            if (check !== expected) return res.json({ success: false, message: 'Not Authorized. Login Again' });
        } else if (decoded !== expected) {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }

        next();
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export default adminAuth;