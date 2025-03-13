"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(req, res, next) {
    if (req.currentUser) {
        next();
    }
    else {
        return res.status(403).json({ message: 'Token not found' });
    }
}
