const async = require('async');
const queryDB = require('../dbconnector.js').query;

class GraphCtrl {


  getNodes (req, res) {
    queryDB(
      "MATCH (n:Person) RETURN n", { },
      function(data) {
        console.log(data);
        const _data = data.map(x => x._fields[0].labels[0] + ' - ' + x._fields[0].properties.name);
        res.send(_data);
          // commentCount = res[0].get("count").toString(); // fetch current rant count
      },
      function(err) {
          //onError(err);
          console.error(err.message);
          res.send(err.message);
      });
  };

  addEntities(req, res) {
    console.log('recueved add entities call');
    const s = req.body.source;
    const l = req.body.link;
    const t = req.body.target;
    console.log(s, l, t);
    res.send({s,l,t});
  }

  addNewLink (req, res) {
    queryDB(
      "MATCH (n:Person) RETURN n", { },
      function(data) {
        console.log(data);
        const _data = data.map(x => x._fields[0].labels[0] + ' - ' + x._fields[0].properties.name);
        res.send(_data);
          // commentCount = res[0].get("count").toString(); // fetch current rant count
      },
      function(err) {
          //onError(err);
          console.error(err.message);
          res.send(err.message);
      });
  };

}

module.exports = new GraphCtrl();
