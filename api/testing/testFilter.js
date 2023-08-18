module.exports = (testPaths) => {
  const allowedPaths = testPaths
    .filter((item) => )
    .map((test) => ({ test })); // [{ test: "path1.spec.js" }, { test: "path2.spec.js" }, etc]

  return {
    filtered: allowedPaths,
  };
};
