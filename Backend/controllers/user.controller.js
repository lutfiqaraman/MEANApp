exports.register = async (req, res, next) => {
    await res.send("REGISTER");
};

exports.auth = async (req, res, next) => {
    await res.send("PROFILE");
};

exports.profile = async (req, res, next) => {
    await res.send("PROFILE");
};