// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"
import constants from "../../../constants"

export default async (req, res) => {
  const { param } = req.query
  await axios
    .get(`${constants}` + `&s=` + `${param}`)
    .then(function (response) {
      if (response.data.Response === "True") {
        res.status(200).json(response.data)
      } else {
        res.status(400).send(Error)
      }
    })
    .catch(function (err) {
      res.status(400).send(err)
    })
}
