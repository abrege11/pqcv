export const doFoo = async (req, res) => {
  try {
    res.status(200).send("foo");
  } catch (err) {
    res.status(500).send({ error: 'Internal Server Error', details: err.message });
  }
};